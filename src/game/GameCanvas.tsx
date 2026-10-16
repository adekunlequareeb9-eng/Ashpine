import { useEffect, useRef } from "react";
import { floorY } from "@/game/layout";
import { unlockAudio } from "@/game/audio";
import { poseRig } from "@/game/characters";
import { installProbe, runtime } from "@/game/runtime";
import { stepGame } from "@/game/simulate";
import { useGame } from "@/game/store";
import { collectVisuals } from "@/game/view";
import { applyMood, createWorld, type World } from "@/game/world";

export function GameCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    installProbe();
    useGame.getState().boot();

    let world: World;
    try {
      world = createWorld(canvas, wrap);
    } catch (error) {
      console.error(error);
      return;
    }

    let raf = 0;
    let acc = 0;
    let last = performance.now();
    let lookKey = "";
    let profileKey = "";

    const resize = () => {
      const w = wrap.clientWidth || 1;
      const h = wrap.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, w < 800 ? 1.25 : 1.6);
      world.renderer.setPixelRatio(dpr);
      world.renderer.setSize(w, h, false);
      world.labels.setSize(w, h);
      world.camera.aspect = w / h;
      world.camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      runtime.keys.add(event.code);
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(event.code)) {
        event.preventDefault();
      }
      if (event.code === "KeyJ") runtime.edge.light = true;
      if (event.code === "KeyK") runtime.edge.heavy = true;
      if (event.code === "Space") runtime.edge.dodge = true;
      if (event.code === "KeyE" || event.code === "Enter") runtime.edge.interact = true;
      if (event.code === "Escape") runtime.edge.pause = true;
      if (event.code === "Tab") runtime.edge.ledger = true;
      if (event.code === "KeyC") runtime.edge.cult = true;
      if (event.code === "KeyF") runtime.hold.guard = true;
      unlockAudio();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      runtime.keys.delete(event.code);
      if (event.code === "KeyF") runtime.hold.guard = false;
    };
    const clearKeys = () => {
      runtime.keys.clear();
      runtime.hold.guard = false;
      runtime.dragging = false;
    };
    const onHide = () => {
      clearKeys();
      if (document.hidden) useGame.getState().persist();
    };

    let dragX = 0;
    let dragY = 0;
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      runtime.dragging = true;
      dragX = event.clientX;
      dragY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      unlockAudio();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!runtime.dragging) return;
      const dx = event.clientX - dragX;
      const dy = event.clientY - dragY;
      dragX = event.clientX;
      dragY = event.clientY;
      runtime.camYaw -= dx * 0.005;
      runtime.camPitch = Math.max(0.16, Math.min(0.72, runtime.camPitch - dy * 0.003));
      runtime.orbit = 1.5;
    };
    const onPointerUp = () => {
      runtime.dragging = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearKeys);
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", () => useGame.getState().persist());
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());

    const frame = (now: number) => {
      if (document.hidden) {
        last = now;
        raf = requestAnimationFrame(frame);
        return;
      }
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      acc += delta;
      let steps = 0;
      while (acc >= 1 / 60 && steps < 5) {
        stepGame(1 / 60);
        acc -= 1 / 60;
        steps += 1;
      }

      const snap = useGame.getState();
      const nextEra = snap.save?.era ?? "present";
      const night = nextEra === "present" && !!snap.save?.flags.evening;
      const nextLook = `${nextEra}:${night ? "night" : "day"}`;
      if (nextLook !== lookKey) {
        lookKey = nextLook;
        applyMood(world, nextEra, night);
        if (snap.save) runtime.fade = Math.max(runtime.fade, 0.85);
      }
      const key = snap.save ? `${snap.save.profile.name}|${snap.save.profile.presentation}|${snap.save.profile.complexion}` : "";
      if (key && key !== profileKey) {
        profileKey = key;
        world.rebuildPlayer(snap.save!.profile);
      }

      const phase = snap.phase;
      placeCamera(world, phase);
      const hideLabels = phase === "title" || phase === "create" || phase === "handover";
      for (const visual of collectVisuals()) {
        const rig = world.rigs.get(visual.id);
        if (!rig) continue;
        rig.group.visible = visual.visible;
        const near = Math.hypot(visual.x - runtime.player.x, visual.z - runtime.player.z) < 13;
        rig.label.element.style.display = visual.visible && !hideLabels && visual.id !== "player" && near ? "block" : "none";
        rig.label.element.textContent = visual.label;
        if (!visual.visible) continue;
        rig.group.position.set(visual.x, visual.y, visual.z);
        rig.group.rotation.y = visual.yaw + Math.PI;
        poseRig(rig, visual.action, visual.stateT, visual.moving, runtime.elapsed);
      }

      const fade = document.getElementById("world-fade");
      if (fade) fade.style.opacity = String(Math.min(1, runtime.fade));
      const flash = document.getElementById("hit-flash");
      if (flash) flash.style.opacity = String(Math.min(0.7, runtime.flash));

      for (const light of world.lanterns) {
        light.intensity = 9 + Math.sin(runtime.elapsed * 3 + light.position.x) * 0.8;
      }

      world.renderer.render(world.scene, world.camera);
      world.labels.render(world.scene, world.camera);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearKeys);
      document.removeEventListener("visibilitychange", onHide);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      world.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="h-full w-full touch-none" />
    </div>
  );
}

function placeCamera(world: World, phase: string) {
  const shake = runtime.shake;
  const sx = (Math.random() - 0.5) * shake;
  const sy = (Math.random() - 0.5) * shake * 0.5;
  const spar = phase === "spar" && runtime.spar && !runtime.override;

  if (spar && runtime.spar) {
    const p = runtime.spar.player;
    const r = runtime.spar.ren;
    const dx = r.x - p.x;
    const dz = r.z - p.z;
    const dist = Math.hypot(dx, dz) || 1;
    const fwx = dx / dist;
    const fwz = dz / dist;
    const y = floorY(p.x, p.z);
    world.camera.position.set(p.x - fwx * 4.8 + sx, y + 1.9 + sy, p.z - fwz * 4.8);
    world.camera.lookAt(p.x + fwx, y + 1.25, p.z + fwz);
    return;
  }

  const cinematic = (phase === "title" || phase === "create") && !runtime.override;
  if (cinematic) {
    const ang = 0.5 + Math.sin(runtime.elapsed * 0.12) * 0.2;
    world.camera.position.set(Math.sin(ang) * 12.5, 4.6, 9 + Math.cos(ang) * 1.6);
    world.camera.lookAt(0, 1.4, 0.4);
    return;
  }

  const yaw = runtime.camYaw;
  const pitch = runtime.camPitch;
  const dist = phase === "handover" ? 8.2 : 6.4;
  const fx = -Math.sin(yaw);
  const fz = -Math.cos(yaw);
  const px = phase === "spar" && runtime.spar ? runtime.spar.player.x : runtime.player.x;
  const pz = phase === "spar" && runtime.spar ? runtime.spar.player.z : runtime.player.z;
  const py = floorY(px, pz);
  const cx = px - fx * dist * Math.cos(pitch);
  const cz = pz - fz * dist * Math.cos(pitch);
  const cy = py + 1.15 + Math.sin(pitch) * dist;
  const pulled = pullCamera(px, pz, cx, cz);
  world.camera.position.set(pulled.x + sx, cy + sy, pulled.z);
  world.camera.lookAt(px, py + 1.28, pz);
}

function pullCamera(px: number, pz: number, cx: number, cz: number) {
  let lastX = px;
  let lastZ = pz;
  const steps = 12;
  for (let i = 1; i <= steps; i++) {
    const x = px + ((cx - px) * i) / steps;
    const z = pz + ((cz - pz) * i) / steps;
    const hit = runtime.colliders.some((b) => x > b.minX - 0.2 && x < b.maxX + 0.2 && z > b.minZ - 0.2 && z < b.maxZ + 0.2);
    if (hit) return { x: lastX, z: lastZ };
    lastX = x;
    lastZ = z;
  }
  return { x: cx, z: cz };
}
