import { stepSound, thud } from "@/game/audio";
import {
  ADLER_WAIT,
  BLOCKS,
  NAMES,
  PLAYER_RADIUS,
  QUAY_ADLER,
  SPOTS,
  actorPose,
  placeAt,
} from "@/game/layout";
import { held, runtime, type Fighter, type FighterState, type Spar } from "@/game/runtime";
import { useGame } from "@/game/store";
import type { Save } from "@/game/types";

const LIGHT = { wind: 0.12, active: 0.13, rec: 0.24, range: 1.75 };
const HEAVY = { wind: 0.3, active: 0.16, rec: 0.46, range: 1.98 };

let solidsReady = false;

function ensureSolids() {
  if (solidsReady) return;
  runtime.colliders = BLOCKS.filter((b) => b.h >= 0.8).map((b) => ({
    minX: b.x - b.w / 2,
    maxX: b.x + b.w / 2,
    minZ: b.z - b.d / 2,
    maxZ: b.z + b.d / 2,
  }));
  solidsReady = true;
}

export function dampAngle(current: number, target: number, speed: number, dt: number) {
  const d = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  const max = speed * dt;
  return current + Math.max(-max, Math.min(max, d));
}

function blocked(x: number, z: number) {
  const r = PLAYER_RADIUS;
  return runtime.colliders.some((b) => x + r > b.minX && x - r < b.maxX && z + r > b.minZ && z - r < b.maxZ);
}

function slide(x: number, z: number, dx: number, dz: number) {
  let nx = x + dx;
  if (blocked(nx, z)) nx = x;
  let nz = z + dz;
  if (blocked(nx, nz)) nz = z;
  if (blocked(nx, nz)) return { x, z };
  return { x: nx, z: nz };
}

function approach(v: number, target: number, max: number) {
  if (v < target) return Math.min(target, v + max);
  return Math.max(target, v - max);
}

let persistAcc = 0;

export function stepGame(dt: number) {
  ensureSolids();
  const store = useGame.getState();

  if (runtime.edge.pause) {
    runtime.edge.pause = false;
    const phase = useGame.getState().phase;
    if (phase !== "train" && phase !== "modal" && phase !== "handover") store.togglePause();
  }
  if (runtime.edge.ledger) {
    runtime.edge.ledger = false;
    const phase = useGame.getState().phase;
    if (phase === "play") store.openLedger();
    else if (phase === "ledger") store.closePanel();
  }
  if (runtime.edge.cult) {
    runtime.edge.cult = false;
    const phase = useGame.getState().phase;
    if (phase === "play" || phase === "flashback") {
      store.togglePause();
      useGame.getState().setPausePage("cult");
    }
  }
  if (runtime.edge.interact) {
    runtime.edge.interact = false;
    const phase = useGame.getState().phase;
    if (phase === "talk") store.advance();
    else if (phase === "inspect") store.closeInspect();
    else if (phase === "handover") store.beginPresent();
    else if (phase === "modal") store.dismissModal();
    else if (phase === "play" || phase === "flashback") store.interact();
  }

  const phase = useGame.getState().phase;
  const save = useGame.getState().save;
  const synthetic = runtime.override != null;
  const exploring =
    phase === "play" ||
    phase === "flashback" ||
    (synthetic && phase !== "spar" && phase !== "train");

  if (phase === "spar" && save && !synthetic) stepSpar(dt, save);
  else if (exploring) stepExplore(dt);

  if (save && (phase === "play" || phase === "flashback")) {
    separateFromPeople(save);
    updatePrompt(save);
    runtime.clockAcc += dt * 0.2;
    if (runtime.clockAcc >= 0.2) {
      const add = runtime.clockAcc;
      runtime.clockAcc = 0;
      useGame.getState().addMinute(add);
    }
    runtime.saveAcc += dt;
    if (runtime.saveAcc > 0.5) {
      runtime.saveAcc = 0;
      useGame.getState().notePos(runtime.player.x, runtime.player.z, runtime.player.yaw);
    }
    persistAcc += dt;
    if (persistAcc > 4) {
      persistAcc = 0;
      useGame.getState().notePos(runtime.player.x, runtime.player.z, runtime.player.yaw);
      useGame.getState().persist();
    }
  } else if (phase !== "play" && phase !== "flashback") {
    runtime.promptId = "";
    runtime.promptLabel = "";
  }

  if (save && phase === "play" && save.visitor === "walking") {
    runtime.adlerZ -= dt * 1.65;
    if (runtime.adlerZ <= ADLER_WAIT.z) {
      runtime.adlerZ = ADLER_WAIT.z;
      useGame.getState().visitorArrived();
    }
  }

  if (
    !synthetic &&
    !runtime.dragging &&
    runtime.orbit <= 0 &&
    phase !== "spar" &&
    phase !== "title" &&
    phase !== "create"
  ) {
    runtime.camYaw = dampAngle(runtime.camYaw, runtime.player.yaw, 3.2, dt);
  }
  if (runtime.orbit > 0 && !runtime.dragging) runtime.orbit = Math.max(0, runtime.orbit - dt);

  runtime.shake = Math.max(0, runtime.shake - dt * 1.5);
  runtime.flash = Math.max(0, runtime.flash - dt * 2.3);
  runtime.fade = Math.max(0, runtime.fade - dt * 0.8);

  runtime.hudAcc += dt;
  if (runtime.hudAcc > 0.12) {
    runtime.hudAcc = 0;
    pushHud(useGame.getState().save);
  }

  runtime.edge.light = false;
  runtime.edge.heavy = false;
  runtime.edge.dodge = false;
  runtime.elapsed += dt;
}

function stepExplore(dt: number) {
  if (runtime.override) {
    if (!runtime.overrideSnapped) {
      runtime.camYaw = runtime.player.yaw;
      runtime.overrideSnapped = true;
    }
  } else if (runtime.overrideSnapped) {
    runtime.overrideSnapped = false;
  }

  if (runtime.steer) runtime.player.yaw += runtime.steer * 1.8 * dt;

  let f = 0;
  let r = 0;
  if (held("KeyW") || held("ArrowUp")) f += 1;
  if (held("KeyS") || held("ArrowDown")) f -= 1;
  if (held("KeyD") || held("ArrowRight")) r += 1;
  if (held("KeyA") || held("ArrowLeft")) r -= 1;
  if (!runtime.override && runtime.move.active) {
    f += runtime.move.y;
    r += runtime.move.x;
  }
  f = Math.max(-1, Math.min(1, f));
  r = Math.max(-1, Math.min(1, r));

  const fx = -Math.sin(runtime.camYaw);
  const fz = -Math.cos(runtime.camYaw);
  const rx = Math.cos(runtime.camYaw);
  const rz = -Math.sin(runtime.camYaw);
  let ix = fx * f + rx * r;
  let iz = fz * f + rz * r;
  const len = Math.hypot(ix, iz);
  const moving = len > 0.08;
  runtime.player.speed = approach(runtime.player.speed, moving ? 3.85 : 0, (moving ? 18 : 24) * dt);
  if (moving) {
    ix /= len;
    iz /= len;
    const targetYaw = Math.atan2(-ix, -iz);
    runtime.player.yaw = dampAngle(runtime.player.yaw, targetYaw, 11, dt);
  } else {
    ix = 0;
    iz = 0;
  }
  const next = slide(runtime.player.x, runtime.player.z, ix * runtime.player.speed * dt, iz * runtime.player.speed * dt);
  runtime.player.x = next.x;
  runtime.player.z = next.z;

  if (runtime.player.speed > 1.2 && !runtime.override) {
    runtime.foot += dt;
    if (runtime.foot > 0.46) {
      runtime.foot = 0;
      stepSound();
    }
  }
}

function separateFromPeople(save: Save) {
  const people = peoplePoints(save);
  for (const p of people) {
    const dx = runtime.player.x - p.x;
    const dz = runtime.player.z - p.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.72 && d > 0.0001) {
      const push = 0.72 - d;
      const slid = slide(runtime.player.x, runtime.player.z, (dx / d) * push, (dz / d) * push);
      runtime.player.x = slid.x;
      runtime.player.z = slid.z;
    }
  }
}

function peoplePoints(save: Save) {
  const list: { id: string; x: number; z: number; label: string }[] = [];
  for (const id of Object.keys(NAMES)) {
    if (id === "adler") continue;
    const pose = actorPose(id, save, false);
    if (!pose) continue;
    list.push({ id, x: pose.x, z: pose.z, label: labelFor(id, save) });
  }
  if (save.era === "present") {
    list.push(
      { ...SPOTS.train },
      { ...SPOTS.study },
      {
        ...SPOTS.board,
        label:
          save.flags.dawn && save.flags.branch && !save.exhibit
            ? "Decide the winter exhibition"
            : SPOTS.board.label,
      },
      { ...SPOTS.ledger },
    );
    if (save.flags.evening && !save.flags.dawn) list.push({ ...SPOTS.rest });
    if (save.flags.dawn && save.posture === "refuse" && !save.flags.branch) list.push({ ...SPOTS.letter });
    const quay = save.flags.dawn && save.posture === "stairs" && !save.flags.branch;
    if (quay) {
      list.push({ id: "adler", x: QUAY_ADLER.x, z: QUAY_ADLER.z, label: "Speak with Ms Adler" });
    } else if (save.visitor === "walking" || save.visitor === "waiting") {
      list.push({
        id: "adler",
        x: ADLER_WAIT.x,
        z: runtime.adlerZ,
        label: "Speak with the woman at the gate",
      });
    }
  }
  return list;
}

function labelFor(id: string, save: Save) {
  const waiting = save.era === "present" && save.flags.chapter && !save.flags.council && !save.flags.evening && (id === "lin" || id === "ren" || id === "sable" || id === "jonah");
  if (waiting) return "The four are waiting";
  if (save.flags.council && !save.flags.evening && id === "hana") return "Close the hall with Hana";
  if (save.flags.dawn && save.flags.branch && save.exhibit && !save.flags.second && id === "hana") return "Ask Hana about the ninth";
  if (id === "hale") return "Receive Mr Hale";
  return `Speak with ${NAMES[id]}`;
}

function updatePrompt(save: Save) {
  let best: { id: string; label: string } | null = null;
  let bestD = 2.25;
  for (const p of peoplePoints(save)) {
    const d = Math.hypot(p.x - runtime.player.x, p.z - runtime.player.z);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  runtime.promptId = best?.id ?? "";
  runtime.promptLabel = best?.label ?? "";
}

function pushHud(save: Save | null) {
  const spar = runtime.spar;
  useGame.getState().setHud({
    prompt: runtime.promptLabel,
    promptId: runtime.promptId,
    place: placeAt(runtime.player.x, runtime.player.z),
    x: runtime.player.x,
    z: runtime.player.z,
    yaw: runtime.player.yaw,
    spar:
      spar && useGame.getState().phase === "spar"
        ? {
            php: spar.player.hp,
            pmax: spar.player.hpMax,
            pstam: spar.player.stam,
            pstamMax: spar.player.stamMax,
            rhp: spar.ren.hp,
            rmax: spar.ren.hpMax,
            time: spar.time,
            text: spar.text,
          }
        : null,
  });
  void save;
}

function power(level: number) {
  return { light: 8 + level, heavy: 15 + level * 2 };
}

function ensureSpar(level: number) {
  if (runtime.spar) return runtime.spar;
  const hp = 96 + level * 6;
  const renHp = 96 + 3 * 6;
  runtime.spar = {
    player: fighter("player", level, 0, -12.15, 0, hp),
    ren: fighter("ren", 3, 0.15, -17.05, Math.PI, renHp),
    time: 0,
    endLag: 0,
    resolved: false,
    reported: false,
    result: "draw",
    sawHeavy: false,
    punished: false,
    blocks: 0,
    dodges: 0,
    text: "Ren is Martial 3. You are Martial " + level + ". Rank is a fact. It is not a verdict.",
    renStep: 0,
    renWait: 0.35,
    open: false,
    openTimer: 0,
    bufferLight: 0,
    bufferHeavy: 0,
    bufferDodge: 0,
  };
  return runtime.spar;
}

function fighter(id: "player" | "ren", level: number, x: number, z: number, yaw: number, hp: number): Fighter {
  return {
    id,
    x,
    z,
    yaw,
    hp,
    hpMax: hp,
    stam: 100,
    stamMax: 100,
    state: "idle",
    stateT: 0,
    didHit: false,
    dodgeX: 0,
    dodgeZ: 0,
    level,
  };
}

function enter(f: Fighter, state: FighterState) {
  f.state = state;
  f.stateT = 0;
  f.didHit = false;
}

function faceToward(f: Fighter, x: number, z: number) {
  f.yaw = Math.atan2(-(x - f.x), -(z - f.z));
}

function stepSpar(dt: number, save: Save) {
  const spar = ensureSpar(save.martialLevel);
  if (runtime.hitStop > 0) {
    runtime.hitStop -= dt;
    return;
  }
  if (spar.resolved) {
    spar.endLag += dt;
    if (spar.endLag > 1.05 && !spar.reported) {
      spar.reported = true;
      useGame.getState().finishSpar(spar.result, {
        punished: spar.punished,
        sawHeavy: spar.sawHeavy,
        blocks: spar.blocks,
        dodges: spar.dodges,
      });
    }
    return;
  }

  spar.time += dt;
  spar.bufferLight = runtime.edge.light ? 0.16 : Math.max(0, spar.bufferLight - dt);
  spar.bufferHeavy = runtime.edge.heavy ? 0.16 : Math.max(0, spar.bufferHeavy - dt);
  spar.bufferDodge = runtime.edge.dodge ? 0.14 : Math.max(0, spar.bufferDodge - dt);

  const prevRen = spar.ren.state;
  stepRen(spar, dt);
  if ((prevRen === "light" || prevRen === "heavy") && spar.ren.state === "idle") {
    spar.renWait = prevRen === "heavy" ? 0.48 : 0.16;
    spar.renStep = ((spar.renStep + 1) % 3) as 0 | 1 | 2;
    if (prevRen === "heavy") spar.openTimer = 0.36;
  }
  if (prevRen !== "heavy" && spar.ren.state === "heavy") {
    spar.text = spar.sawHeavy
      ? "The long windup. The opening is after his heel lands — if you are free to take it."
      : "Watch his weight. This strike is not the same as the jabs.";
    spar.sawHeavy = true;
  }

  stepHuman(spar.player, spar, dt, {
    moveF: axisForward(),
    moveR: axisRight(),
    light: spar.bufferLight > 0,
    heavy: spar.bufferHeavy > 0,
    dodge: spar.bufferDodge > 0,
    guard: runtime.hold.guard,
  }, spar.ren);

  if (spar.player.state === "light" || spar.player.state === "heavy") {
    spar.bufferLight = 0;
    spar.bufferHeavy = 0;
  }
  if (spar.player.state === "dodge") spar.bufferDodge = 0;

  const specP = spar.player.state === "heavy" ? HEAVY : LIGHT;
  if (spar.player.state === "light" || spar.player.state === "heavy") {
    tryHit(spar.player, spar.ren, specP, spar.player.state === "heavy" ? power(spar.player.level).heavy : power(spar.player.level).light, spar);
  }
  const specR = spar.ren.state === "heavy" ? HEAVY : LIGHT;
  if (spar.ren.state === "light" || spar.ren.state === "heavy") {
    tryHit(spar.ren, spar.player, specR, spar.ren.state === "heavy" ? power(3).heavy : power(3).light, spar);
  }

  spar.open = spar.openTimer > 0 || (spar.ren.state === "heavy" && spar.ren.stateT > HEAVY.wind + HEAVY.active);
  if (spar.openTimer > 0) spar.openTimer -= dt;

  separateFighters(spar);
  clampArena(spar.player);
  clampArena(spar.ren);

  if (spar.player.hp <= 0 || spar.ren.hp <= 0 || spar.time > 70) {
    spar.resolved = true;
    spar.result = judge(spar);
    if (spar.player.hp <= 0) enter(spar.player, "down");
    if (spar.ren.hp <= 0) enter(spar.ren, "down");
  }
}

function judge(spar: Spar): "win" | "loss" | "draw" {
  if (spar.player.hp <= 0 && spar.ren.hp <= 0) return "draw";
  if (spar.player.hp <= 0) return "loss";
  if (spar.ren.hp <= 0) return "win";
  const pp = spar.player.hp / spar.player.hpMax;
  const rp = spar.ren.hp / spar.ren.hpMax;
  if (Math.abs(pp - rp) < 0.08) return "draw";
  return pp > rp ? "win" : "loss";
}

function axisForward() {
  let f = 0;
  if (held("KeyW") || held("ArrowUp")) f += 1;
  if (held("KeyS") || held("ArrowDown")) f -= 1;
  if (runtime.move.active) f += runtime.move.y;
  return Math.max(-1, Math.min(1, f));
}

function axisRight() {
  let r = 0;
  if (held("KeyD") || held("ArrowRight")) r += 1;
  if (held("KeyA") || held("ArrowLeft")) r -= 1;
  if (runtime.move.active) r += runtime.move.x;
  return Math.max(-1, Math.min(1, r));
}

function stepRen(spar: Spar, dt: number) {
  const r = spar.ren;
  const p = spar.player;
  if (r.state === "down") return;
  if (r.state !== "idle" && r.state !== "block") {
    stepHuman(r, spar, dt, emptyWant(), p);
    return;
  }
  const dist = Math.hypot(p.x - r.x, p.z - r.z);
  if (p.state === "heavy" && p.stateT < 0.28 && dist < 2.35) {
    stepHuman(r, spar, dt, { ...emptyWant(), guard: true }, p);
    return;
  }
  if (r.state === "block") {
    stepHuman(r, spar, dt, emptyWant(), p);
    return;
  }
  if (spar.renWait > 0) {
    spar.renWait -= dt;
    stepHuman(r, spar, dt, { ...emptyWant(), moveF: dist > 1.7 ? 1 : 0 }, p);
    return;
  }
  if (dist > 1.58) {
    stepHuman(r, spar, dt, { ...emptyWant(), moveF: 1 }, p);
    return;
  }
  const heavy = spar.renStep === 2;
  stepHuman(r, spar, dt, { ...emptyWant(), heavy, light: !heavy }, p);
}

function emptyWant() {
  return { moveF: 0, moveR: 0, light: false, heavy: false, dodge: false, guard: false };
}

type Want = ReturnType<typeof emptyWant>;

function stepHuman(f: Fighter, spar: Spar, dt: number, want: Want, other: Fighter) {
  f.stateT += dt;
  const regen = f.state === "idle" ? 17 : f.state === "block" ? 4 : 7;
  f.stam = Math.min(f.stamMax, f.stam + regen * dt);

  if (f.state === "down" || f.state === "stun") {
    if (f.state === "stun" && f.stateT > 0.4) enter(f, "idle");
    return;
  }

  if (f.state === "light" || f.state === "heavy") {
    const spec = f.state === "light" ? LIGHT : HEAVY;
    if (f.stateT > spec.wind + spec.active + spec.rec) enter(f, "idle");
    const drive = f.stateT > spec.wind && f.stateT < spec.wind + spec.active ? 1.1 : 0;
    const fx = -Math.sin(f.yaw);
    const fz = -Math.cos(f.yaw);
    f.x += fx * drive * dt;
    f.z += fz * drive * dt;
    return;
  }

  if (f.state === "dodge") {
    if (f.stateT < 0.34) {
      f.x += f.dodgeX * dt;
      f.z += f.dodgeZ * dt;
    } else enter(f, "idle");
    return;
  }

  if (f.state === "block") {
    faceToward(f, other.x, other.z);
    if (!want.guard && f.stateT > 0.08) enter(f, "idle");
    return;
  }

  faceToward(f, other.x, other.z);
  const free = f.id === "ren";
  if (want.dodge && (free || f.stam >= 16)) {
    if (!free) f.stam -= 16;
    const fx = -Math.sin(f.yaw);
    const fz = -Math.cos(f.yaw);
    const rx = Math.cos(f.yaw);
    const rz = -Math.sin(f.yaw);
    const mf = want.moveF || -0.3;
    const mr = want.moveR;
    const len = Math.hypot(mf, mr) || 1;
    f.dodgeX = ((fx * mf + rx * mr) / len) * 6.2;
    f.dodgeZ = ((fz * mf + rz * mr) / len) * 6.2;
    enter(f, "dodge");
    if (f.id === "player") spar.dodges += 1;
    return;
  }
  if (want.light && (free || f.stam >= 12)) {
    if (!free) f.stam -= 12;
    enter(f, "light");
    return;
  }
  if (want.heavy && (free || f.stam >= 22)) {
    if (!free) f.stam -= 22;
    enter(f, "heavy");
    return;
  }
  if ((want.light || want.heavy || want.dodge) && f.id === "player") {
    spar.text = "Not enough breath for that. Drop the guard and wait half a second.";
  }
  if (want.guard) {
    enter(f, "block");
    return;
  }
  const fx = -Math.sin(f.yaw);
  const fz = -Math.cos(f.yaw);
  const rx = Math.cos(f.yaw);
  const rz = -Math.sin(f.yaw);
  const speed = 3.25;
  f.x += (fx * want.moveF + rx * want.moveR) * speed * dt;
  f.z += (fz * want.moveF + rz * want.moveR) * speed * dt;
}

function tryHit(a: Fighter, b: Fighter, spec: typeof LIGHT, dmg: number, spar: Spar) {
  if (a.didHit) return;
  if (a.stateT < spec.wind || a.stateT > spec.wind + spec.active) return;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const dist = Math.hypot(dx, dz);
  if (dist > spec.range + 0.28) return;
  const fx = -Math.sin(a.yaw);
  const fz = -Math.cos(a.yaw);
  if (dist > 0.05 && (dx * fx + dz * fz) / dist < 0.18) return;
  a.didHit = true;

  if (b.state === "dodge" && b.stateT > 0.04 && b.stateT < 0.22) {
    spar.text = b.id === "player" ? "You slipped it." : "He slipped it.";
    return;
  }

  const bfx = -Math.sin(b.yaw);
  const bfz = -Math.cos(b.yaw);
  const facing = dist < 0.05 || ((-dx) * bfx + (-dz) * bfz) / Math.max(dist, 0.05) > 0.1;
  let dealt = dmg;
  if (b.state === "block" && facing && b.stam > 6) {
    b.stam = Math.max(0, b.stam - 18);
    dealt = dmg * 0.16;
    spar.text = b.id === "player" ? "Caught on your guard." : "He takes it on the guard.";
    if (b.id === "player") spar.blocks += 1;
  } else {
    if (b.state !== "down") enter(b, "stun");
    spar.text = b.id === "player" ? "That one landed." : "Clean.";
  }

  const renOpen = spar.open || spar.ren.state === "heavy";
  if (a.id === "player" && renOpen && (spar.open || a.state === "light" || a.state === "heavy")) {
    if (spar.open || b.id === "ren") {
      spar.punished = spar.open || spar.punished;
      if (spar.open) {
        spar.text = "You took the opening. Seeing a counter and having the body for it are different. That was both.";
      }
    }
  }

  b.hp = Math.max(0, b.hp - dealt);
  runtime.hitStop = 0.055;
  runtime.shake = b.id === "player" ? 0.2 : 0.12;
  runtime.flash = b.id === "player" ? 0.62 : 0.28;
  thud();
}

function separateFighters(spar: Spar) {
  const dx = spar.player.x - spar.ren.x;
  const dz = spar.player.z - spar.ren.z;
  const d = Math.hypot(dx, dz) || 0.001;
  if (d < 0.78) {
    const push = (0.78 - d) / 2;
    spar.player.x += (dx / d) * push;
    spar.player.z += (dz / d) * push;
    spar.ren.x -= (dx / d) * push;
    spar.ren.z -= (dz / d) * push;
  }
}

function clampArena(f: Fighter) {
  f.x = Math.max(-11.6, Math.min(11.6, f.x));
  f.z = Math.max(-20.15, Math.min(-10.4, f.z));
}
