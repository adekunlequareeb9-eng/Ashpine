import type { HudSnap } from "@/game/types";

export type FighterState = "idle" | "light" | "heavy" | "block" | "dodge" | "stun" | "down";

export type Fighter = {
  id: "player" | "ren";
  x: number;
  z: number;
  yaw: number;
  hp: number;
  hpMax: number;
  stam: number;
  stamMax: number;
  state: FighterState;
  stateT: number;
  didHit: boolean;
  dodgeX: number;
  dodgeZ: number;
  level: number;
};

export type Spar = {
  player: Fighter;
  ren: Fighter;
  time: number;
  endLag: number;
  resolved: boolean;
  reported: boolean;
  result: "win" | "loss" | "draw";
  sawHeavy: boolean;
  punished: boolean;
  blocks: number;
  dodges: number;
  text: string;
  renStep: 0 | 1 | 2;
  renWait: number;
  open: boolean;
  openTimer: number;
  bufferLight: number;
  bufferHeavy: number;
  bufferDodge: number;
};

export const runtime = {
  keys: new Set<string>(),
  override: null as Set<string> | null,
  overrideSnapped: false,
  steer: 0,
  move: { active: false, x: 0, y: 0 },
  hold: { guard: false },
  edge: { light: false, heavy: false, dodge: false, interact: false, pause: false, ledger: false, cult: false },
  player: { x: 0.2, z: 4.1, yaw: 0, speed: 0 },
  camYaw: 0.2,
  camPitch: 0.34,
  orbit: 0,
  dragging: false,
  colliders: [] as { minX: number; maxX: number; minZ: number; maxZ: number }[],
  shake: 0,
  flash: 0,
  fade: 0,
  hitStop: 0,
  spar: null as Spar | null,
  adlerZ: 25.5,
  stepAcc: 0,
  clockAcc: 0,
  hudAcc: 0,
  saveAcc: 0,
  foot: 0,
  elapsed: 0,
  returnPos: { x: 0, z: 4, yaw: 0 },
  promptId: "",
  promptLabel: "",
};

export function held(code: string) {
  if (runtime.override) return runtime.override.has(code);
  return runtime.keys.has(code);
}

export function emptyHud(): HudSnap {
  return { prompt: "", promptId: "", place: "Courtyard", x: 0, z: 4, yaw: 0, spar: null };
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setSteer?: (v: number) => void;
      setKeys?: (codes: string[]) => void;
    };
  }
}

export function installProbe() {
  window.__controlsTest = {
    getYaw: () => runtime.player.yaw,
    getSpeed: () => runtime.player.speed,
    setSteer: (v: number) => {
      runtime.steer = Math.max(-1, Math.min(1, v));
    },
    setKeys: (codes: string[]) => {
      runtime.override = new Set(codes);
    },
  };
}
