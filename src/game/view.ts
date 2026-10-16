import { ADLER_WAIT, NAMES, QUAY_ADLER, actorPose, floorY } from "@/game/layout";
import { held, runtime } from "@/game/runtime";
import { useGame } from "@/game/store";

export type Visual = {
  id: string;
  x: number;
  y: number;
  z: number;
  yaw: number;
  visible: boolean;
  action: string;
  stateT: number;
  moving: boolean;
  label: string;
};

export function collectVisuals(): Visual[] {
  const state = useGame.getState();
  const save = state.save;
  const phase = state.phase;
  const sparring = phase === "spar" && runtime.spar != null;
  const list: Visual[] = [];

  if (save) {
    const spar = runtime.spar;
    const fight = sparring && spar ? spar.player : null;
    const x = fight ? fight.x : runtime.player.x;
    const z = fight ? fight.z : runtime.player.z;
    const moving = fight
      ? fight.state === "idle" && (held("KeyW") || held("KeyA") || held("KeyS") || held("KeyD") || runtime.move.active)
      : runtime.player.speed > 0.35;
    list.push({
      id: "player",
      x,
      y: floorY(x, z),
      z,
      yaw: fight ? fight.yaw : runtime.player.yaw,
      visible: phase !== "title" && phase !== "create",
      action: fight ? (fight.state === "idle" ? (moving ? "walk" : "idle") : fight.state) : moving ? "walk" : "idle",
      stateT: fight ? fight.stateT : 0,
      moving,
      label: save.profile.name,
    });
  }

  for (const id of Object.keys(NAMES)) {
    if (id === "ren" && sparring && runtime.spar) {
      const f = runtime.spar.ren;
      const dist = Math.hypot(f.x - runtime.spar.player.x, f.z - runtime.spar.player.z);
      const moving = f.state === "idle" && dist > 1.65;
      list.push({
        id,
        x: f.x,
        y: floorY(f.x, f.z),
        z: f.z,
        yaw: f.yaw,
        visible: true,
        action: f.state === "idle" ? (moving ? "walk" : "idle") : f.state,
        stateT: f.stateT,
        moving,
        label: NAMES[id] ?? id,
      });
      continue;
    }
    if (id === "adler") {
      const talking = phase === "talk" && state.talk?.id === "adler";
      const quay = !!save && save.flags.dawn && save.posture === "stairs" && !save.flags.branch;
      if (quay || (talking && save?.posture === "stairs" && save.flags.dawn)) {
        list.push({
          id,
          x: QUAY_ADLER.x,
          y: floorY(QUAY_ADLER.x, QUAY_ADLER.z),
          z: QUAY_ADLER.z,
          yaw: QUAY_ADLER.yaw,
          visible: true,
          action: "idle",
          stateT: 0,
          moving: false,
          label: "Ms Adler",
        });
        continue;
      }
      const visible = !!save && save.era === "present" && (save.visitor === "walking" || save.visitor === "waiting" || (save.visitor === "met" && talking));
      const z = save?.visitor === "walking" ? runtime.adlerZ : ADLER_WAIT.z;
      list.push({
        id,
        x: ADLER_WAIT.x,
        y: floorY(ADLER_WAIT.x, z),
        z,
        yaw: 0,
        visible,
        action: save?.visitor === "walking" ? "walk" : "idle",
        stateT: 0,
        moving: save?.visitor === "walking",
        label: "Ms Adler",
      });
      continue;
    }
    const talking = phase === "talk" && state.talk?.id === id;
    const pose = save ? actorPose(id, save, sparring, talking) : null;
    if (!pose) {
      list.push({
        id,
        x: 0,
        y: 0,
        z: 0,
        yaw: 0,
        visible: false,
        action: "idle",
        stateT: 0,
        moving: false,
        label: NAMES[id] ?? id,
      });
      continue;
    }
    list.push({
      id,
      x: pose.x,
      y: floorY(pose.x, pose.z),
      z: pose.z,
      yaw: pose.yaw,
      visible: true,
      action: "idle",
      stateT: 0,
      moving: false,
      label: NAMES[id] ?? id,
    });
  }

  return list;
}
