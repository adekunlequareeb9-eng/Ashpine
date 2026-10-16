import type { Decision, Era, Save } from "@/game/types";

export const PLAYER_RADIUS = 0.34;

export type Block = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  mat: "plaster" | "timber" | "stone" | "dark" | "counter";
};

/** Axis-aligned solids. Centers are x/z; height grows up from the ground. */
export const BLOCKS: Block[] = [
  { x: 0, z: -21.35, w: 30.4, d: 0.5, h: 4.5, mat: "timber" },
  { x: -14.9, z: -15.05, w: 0.5, d: 12.6, h: 4.5, mat: "timber" },
  { x: 14.9, z: -15.05, w: 0.5, d: 12.6, h: 4.5, mat: "timber" },

  { x: -22.1, z: 3, w: 0.48, d: 18.4, h: 3.75, mat: "plaster" },
  { x: -16.2, z: -6.1, w: 12.3, d: 0.48, h: 3.75, mat: "plaster" },
  { x: -16.2, z: 12.1, w: 12.3, d: 0.48, h: 3.75, mat: "plaster" },
  { x: -10.15, z: -0.4, w: 0.46, d: 11.3, h: 3.75, mat: "plaster" },
  { x: -10.15, z: 9.45, w: 0.46, d: 5.2, h: 3.75, mat: "plaster" },
  { x: -16.25, z: -0.55, w: 11.4, d: 0.36, h: 3.55, mat: "plaster" },

  { x: 22.1, z: 3, w: 0.48, d: 18.4, h: 3.75, mat: "plaster" },
  { x: 16.2, z: -6.1, w: 12.3, d: 0.48, h: 3.75, mat: "plaster" },
  { x: 16.2, z: 12.1, w: 12.3, d: 0.48, h: 3.75, mat: "plaster" },
  { x: 10.15, z: -0.4, w: 0.46, d: 11.3, h: 3.75, mat: "plaster" },
  { x: 10.15, z: 9.45, w: 0.46, d: 5.2, h: 3.75, mat: "plaster" },
  { x: 12.65, z: 1.55, w: 4.6, d: 0.32, h: 3.55, mat: "plaster" },
  { x: 19.25, z: 1.55, w: 5.2, d: 0.32, h: 3.55, mat: "plaster" },

  { x: -6.35, z: 12.15, w: 8.1, d: 0.5, h: 2.7, mat: "stone" },
  { x: 6.35, z: 12.15, w: 8.1, d: 0.5, h: 2.7, mat: "stone" },

  { x: -12.2, z: 28.45, w: 20.2, d: 0.45, h: 1.2, mat: "stone" },
  { x: 12.2, z: 28.45, w: 20.2, d: 0.45, h: 1.2, mat: "stone" },

  { x: -8.35, z: 34.4, w: 0.4, d: 11.4, h: 1.25, mat: "stone" },
  { x: 8.35, z: 34.4, w: 0.4, d: 11.4, h: 1.25, mat: "stone" },
  { x: 0, z: 40.35, w: 16.4, d: 0.45, h: 1.15, mat: "stone" },
  { x: 6.55, z: 33.7, w: 3.15, d: 4.4, h: 4.1, mat: "plaster" },
  { x: -22.45, z: 20.3, w: 0.45, d: 16.6, h: 1.2, mat: "stone" },
  { x: 22.45, z: 20.3, w: 0.45, d: 16.6, h: 1.2, mat: "stone" },

  { x: 15.3, z: 21.3, w: 8.4, d: 5.5, h: 4.3, mat: "plaster" },

  { x: -5.5, z: 3.7, w: 1.35, d: 1.35, h: 0.85, mat: "stone" },
  { x: -3.55, z: -1.15, w: 0.55, d: 0.55, h: 1.4, mat: "dark" },
  { x: 4.15, z: 0.45, w: 0.5, d: 0.5, h: 1.4, mat: "dark" },
  { x: 16.7, z: 8.15, w: 3.3, d: 0.95, h: 1.05, mat: "counter" },
  { x: 8.4, z: -17.6, w: 0.4, d: 0.4, h: 1.5, mat: "dark" },
  { x: 10.2, z: -17.2, w: 0.4, d: 0.4, h: 1.5, mat: "dark" },
];

export type Pose = { x: number; z: number; yaw: number };

export const POSTS: Record<string, Record<string, Pose>> = {
  present: {
    lin: { x: 14.7, z: -2.6, yaw: 2.5 },
    ren: { x: -2.2, z: -16.4, yaw: 0.6 },
    sable: { x: -8.45, z: -3.25, yaw: Math.PI / 2 },
    jonah: { x: 1.7, z: 5.15, yaw: Math.PI },
    hana: { x: 2.8, z: -15.2, yaw: Math.PI },
    tomas: { x: 14.15, z: 6.35, yaw: 0.4 },
    iris: { x: 18.6, z: -4.15, yaw: Math.PI / 2 },
    pia: { x: 6.4, z: -16.8, yaw: 0.2 },
    ellis: { x: 7.8, z: -15.5, yaw: -0.8 },
  },
  flashback: {
    shen: { x: 0.1, z: -2.15, yaw: Math.PI },
    lin: { x: -2.45, z: 2.55, yaw: 0.2 },
    ren: { x: 2.55, z: 2.45, yaw: -0.25 },
    sable: { x: -1.45, z: 3.65, yaw: 0.05 },
    jonah: { x: 1.55, z: 3.7, yaw: -0.08 },
  },
  spar: {
    lin: { x: -6.2, z: -10.35, yaw: 0.35 },
    jonah: { x: -4.4, z: -10.2, yaw: 0.1 },
    sable: { x: 4.5, z: -10.2, yaw: -0.15 },
    hana: { x: 6.4, z: -10.4, yaw: -0.45 },
  },
};

export const SPOTS = {
  train: { id: "train", x: -0.5, z: -16.5, label: "Practice the Ash Breath" },
  study: { id: "study", x: -8.35, z: -3.35, label: "Look through the study window" },
  board: { id: "board", x: 5.6, z: 14.35, label: "Read the circuit notice" },
  ledger: { id: "ledger", x: 16.4, z: -1.35, label: "Open the house ledger" },
  rest: { id: "rest", x: -16.5, z: 6.4, label: "Sleep until the house opens" },
  letter: { id: "letter", x: 0.85, z: 14.35, label: "Take the envelope under the stone" },
};

export const QUAY_ADLER: Pose = { x: 4.15, z: 33.55, yaw: Math.PI / 2 };
export const QUAY_SABLE: Pose = { x: 1.55, z: 32.35, yaw: 0.35 };
export const HALE_WAIT: Pose = { x: 13.2, z: 0.2, yaw: Math.PI };
export const JONAH_ROOM: Pose = { x: 15.55, z: -1.45, yaw: -0.7 };

export const ADLER_WAIT = { x: 0.35, z: 14.55, yaw: 0 };
export const ADLER_SPAWN_Z = 25.5;

/** Where the four stand once the morning's work is done, until the hall is locked. */
export const GATHER: Record<string, Pose> = {
  lin: { x: -1.55, z: 1.15, yaw: 0.5 },
  ren: { x: 1.7, z: 1.05, yaw: -0.55 },
  sable: { x: -0.85, z: 2.65, yaw: 0.18 },
  jonah: { x: 1.0, z: 2.7, yaw: -0.12 },
};

export const FLASH_SPAWN = { x: 0, z: 7.35, yaw: 0 };
export const PRESENT_SPAWN = { x: 0.2, z: 4.1, yaw: 0 };

export function floorY(x: number, z: number) {
  if (x > -14.55 && x < 14.55 && z < -8.75 && z > -21.15) return 0.045;
  if (x < -10.35 && x > -21.85 && z > -5.85 && z < 11.85) return 0.04;
  if (x > 10.35 && x < 21.85 && z > -5.85 && z < 11.85) return 0.04;
  if (x > -10.2 && x < 10.2 && z > -8.9 && z < 12.3) return 0.02;
  return 0;
}

export function placeAt(x: number, z: number) {
  if (z > 29.2) {
    if (x > 4.6 && z < 36.2) return "14 Quay Stairs";
    if (z > 37.2) return "The water stairs";
    return "Quay lane";
  }
  if (z < -8.8 && x > -15 && x < 15) return "Training hall";
  if (x < -10.2 && z < -0.4) return "Outside the study";
  if (x < -10.2) return "Residence";
  if (x > 10.2 && z < 1.45) return "Office";
  if (x > 10.2) return "Trading floor";
  if (z > 12.6) return "Gate street";
  return "Courtyard";
}

export function economy(decision: Decision) {
  const trade = decision === "dock" ? 5400 : 6200;
  const tuition = 2400;
  const wages = 4100;
  const upkeep = 1800;
  const supply = decision === "pay" ? 2860 : decision === "dock" ? 1400 : 2200;
  const income = trade + tuition;
  const costs = wages + upkeep + supply;
  return { trade, tuition, wages, upkeep, supply, income, costs, net: income - costs };
}

export function visiblePost(id: string, era: Era, sparring: boolean): Pose | null {
  if (sparring) {
    const watch = POSTS.spar[id];
    if (watch) return watch;
    if (id === "ren" || id === "player") return null;
    return null;
  }
  if (era === "flashback") return POSTS.flashback[id] ?? null;
  if (id === "shen" || id === "hale") return null;
  return POSTS.present[id] ?? null;
}

/** Where someone is standing, including chapter-two errands. */
export function actorPose(id: string, save: Save, sparring: boolean, talking = false): Pose | null {
  if (sparring) return visiblePost(id, save.era, true);
  if (id === "hale") {
    const meeting = save.flags.dawn && save.posture === "receive" && !save.flags.branch;
    if (!meeting && !talking) return null;
    return HALE_WAIT;
  }
  if (save.era === "flashback") return visiblePost(id, "flashback", false);
  if (save.flags.chapter && !save.flags.evening && GATHER[id]) return GATHER[id];
  if (save.flags.dawn && !save.flags.branch) {
    if (save.posture === "stairs" && id === "sable") return QUAY_SABLE;
    if (save.posture === "receive" && id === "jonah") return JONAH_ROOM;
  }
  return visiblePost(id, "present", false);
}

export const NAMES: Record<string, string> = {
  lin: "Lin Mei",
  ren: "Ren Calder",
  sable: "Sable Quinn",
  jonah: "Jonah Vale",
  hana: "Hana Okabe",
  tomas: "Tomas Reid",
  iris: "Iris Chen",
  shen: "Shen Wei",
  adler: "Ms Adler",
  hale: "Mr Hale",
  pia: "Pia",
  ellis: "Ellis",
};
