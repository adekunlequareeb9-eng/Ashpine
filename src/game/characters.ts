import * as THREE from "three";
import { CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import { std } from "@/game/materials";
import type { Profile } from "@/game/types";

export type Hair = "short" | "bun" | "long" | "tied" | "crop" | "white";

export type Look = {
  height: number;
  shoulder: number;
  skin: string;
  cloth: string;
  trim: string;
  hair: string;
  hairStyle: Hair;
  sleeves: boolean;
  legs: string;
};

export type Rig = {
  group: THREE.Group;
  hips: THREE.Group;
  torso: THREE.Group;
  head: THREE.Group;
  armL: THREE.Group;
  armR: THREE.Group;
  legL: THREE.Group;
  legR: THREE.Group;
  label: CSS2DObject;
};

const SKIN = ["#e8c4a4", "#c48a5a", "#8a5336", "#4a3128"];

export function playerLook(profile: Profile): Look {
  return {
    height: 1.76,
    shoulder: profile.presentation === "soft" ? 0.36 : profile.presentation === "tailored" ? 0.46 : 0.41,
    skin: SKIN[profile.complexion],
    cloth: "#2a241f",
    trim: "#9a3a2c",
    hair: "#1a120e",
    hairStyle: profile.presentation === "soft" ? "long" : profile.presentation === "tailored" ? "short" : "crop",
    sleeves: true,
    legs: "#231e1b",
  };
}

export const LOOKS: Record<string, Look> = {
  lin: { height: 1.68, shoulder: 0.36, skin: SKIN[1], cloth: "#243028", trim: "#c6a15b", hair: "#140e0c", hairStyle: "bun", sleeves: true, legs: "#1c1916" },
  ren: { height: 1.86, shoulder: 0.5, skin: SKIN[1], cloth: "#6a5e52", trim: "#e6d7c4", hair: "#2a2118", hairStyle: "crop", sleeves: false, legs: "#2a241f" },
  sable: { height: 1.62, shoulder: 0.34, skin: SKIN[0], cloth: "#3c4650", trim: "#d7c4a3", hair: "#101014", hairStyle: "tied", sleeves: true, legs: "#24262c" },
  jonah: { height: 1.78, shoulder: 0.44, skin: SKIN[2], cloth: "#e4d8c8", trim: "#7a4e32", hair: "#3a2a22", hairStyle: "short", sleeves: true, legs: "#3a3128" },
  hana: { height: 1.7, shoulder: 0.4, skin: SKIN[0], cloth: "#e7e1d6", trim: "#1a1a1a", hair: "#1a1a1a", hairStyle: "tied", sleeves: true, legs: "#ded6cc" },
  tomas: { height: 1.74, shoulder: 0.46, skin: SKIN[2], cloth: "#e7e0d4", trim: "#3f4a3a", hair: "#2c241c", hairStyle: "short", sleeves: true, legs: "#3a332c" },
  iris: { height: 1.66, shoulder: 0.35, skin: SKIN[1], cloth: "#5c3d48", trim: "#e6d3c4", hair: "#241810", hairStyle: "bun", sleeves: true, legs: "#2c2428" },
  shen: { height: 1.77, shoulder: 0.42, skin: SKIN[1], cloth: "#2a3130", trim: "#c6a15b", hair: "#d9d4cc", hairStyle: "white", sleeves: true, legs: "#232826" },
  adler: { height: 1.8, shoulder: 0.38, skin: SKIN[0], cloth: "#c5c6c8", trim: "#2a2e33", hair: "#cfc8bc", hairStyle: "long", sleeves: true, legs: "#2c3036" },
  hale: { height: 1.83, shoulder: 0.42, skin: SKIN[2], cloth: "#3e4650", trim: "#c6a15b", hair: "#1a140f", hairStyle: "short", sleeves: true, legs: "#24282e" },
  pia: { height: 1.6, shoulder: 0.34, skin: SKIN[0], cloth: "#d9d3c8", trim: "#6e3b34", hair: "#1c140f", hairStyle: "tied", sleeves: true, legs: "#2a2622" },
  ellis: { height: 1.72, shoulder: 0.4, skin: SKIN[3], cloth: "#d7d1c6", trim: "#1e1a17", hair: "#1a120e", hairStyle: "crop", sleeves: true, legs: "#262220" },
};

const box = new THREE.BoxGeometry(1, 1, 1);
const sphere = new THREE.SphereGeometry(1, 14, 12);

function mesh(w: number, h: number, d: number, material: THREE.Material) {
  const m = new THREE.Mesh(box, material);
  m.scale.set(w, h, d);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function buildPerson(look: Look, name: string): Rig {
  const group = new THREE.Group();
  const H = look.height;
  const legLen = H * 0.46;
  const torsoLen = H * 0.3;
  const headR = H * 0.072;
  const skin = std(look.skin, { rough: 0.62 });
  const cloth = std(look.cloth, { rough: 0.84 });
  const trim = std(look.trim, { rough: 0.7 });
  const hair = std(look.hair, { rough: 0.55 });
  const legs = std(look.legs, { rough: 0.86 });
  const sleeve = look.sleeves ? cloth : skin;

  const hips = new THREE.Group();
  hips.position.y = legLen;
  group.add(hips);
  const pelvis = mesh(look.shoulder * 0.72, 0.16, 0.18, cloth);
  pelvis.position.y = 0.02;
  hips.add(pelvis);

  const torso = new THREE.Group();
  torso.position.y = 0.1;
  hips.add(torso);
  const chest = mesh(look.shoulder, torsoLen, 0.2, cloth);
  chest.position.y = torsoLen * 0.42;
  torso.add(chest);
  const collar = mesh(look.shoulder * 0.72, 0.07, 0.22, trim);
  collar.position.y = torsoLen * 0.78;
  torso.add(collar);

  const headPivot = new THREE.Group();
  headPivot.position.y = torsoLen * 0.92;
  torso.add(headPivot);
  const head = new THREE.Mesh(sphere, skin);
  head.scale.set(headR * 0.92, headR * 1.05, headR * 0.96);
  head.castShadow = true;
  headPivot.add(head);
  const eyeMat = std("#1a1412", { rough: 0.4 });
  for (const side of [-1, 1]) {
    const eye = new THREE.Mesh(sphere, eyeMat);
    eye.scale.set(0.018, 0.018, 0.012);
    eye.position.set(side * headR * 0.38, headR * 0.08, headR * 0.82);
    headPivot.add(eye);
  }
  addHair(headPivot, look.hairStyle, hair, headR);

  const armL = limb(look.shoulder * 0.55, torsoLen * 0.78, sleeve, skin, torso, 1);
  const armR = limb(-look.shoulder * 0.55, torsoLen * 0.78, sleeve, skin, torso, -1);
  const legL = leg(0.09, legs, hips, 1, legLen);
  const legR = leg(-0.09, legs, hips, -1, legLen);

  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.34, 16), std(look.trim, { rough: 1, opacity: 0.35 }));
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.03;
  disc.receiveShadow = true;
  group.add(disc);

  const div = document.createElement("div");
  div.className = "nameplate";
  div.textContent = name;
  const label = new CSS2DObject(div);
  label.position.set(0, H + 0.18, 0);
  group.add(label);

  return { group, hips, torso, head: headPivot, armL, armR, legL, legR, label };
}

function limb(x: number, y: number, sleeve: THREE.Material, skin: THREE.Material, parent: THREE.Group, side: number) {
  const pivot = new THREE.Group();
  pivot.position.set(x, y, 0);
  parent.add(pivot);
  const upper = mesh(0.09, 0.28, 0.09, sleeve);
  upper.position.y = -0.16;
  pivot.add(upper);
  const fore = mesh(0.075, 0.24, 0.075, sleeve);
  fore.position.y = -0.42;
  pivot.add(fore);
  const hand = mesh(0.07, 0.07, 0.08, skin);
  hand.position.set(0, -0.56, side * 0.01);
  pivot.add(hand);
  return pivot;
}

function leg(x: number, mat: THREE.Material, parent: THREE.Group, _side: number, legLen: number) {
  const pivot = new THREE.Group();
  pivot.position.set(x, 0.02, 0);
  parent.add(pivot);
  const thigh = mesh(0.11, legLen * 0.52, 0.12, mat);
  thigh.position.y = -legLen * 0.26;
  pivot.add(thigh);
  const shin = mesh(0.09, legLen * 0.46, 0.1, mat);
  shin.position.y = -legLen * 0.72;
  pivot.add(shin);
  const shoe = mesh(0.1, 0.06, 0.18, std("#1a1614", { rough: 0.7 }));
  shoe.position.set(0, -legLen * 0.96, 0.03);
  pivot.add(shoe);
  return pivot;
}

function addHair(head: THREE.Group, style: Hair, mat: THREE.Material, r: number) {
  const cap = new THREE.Mesh(sphere, mat);
  cap.scale.set(r * 0.98, r * 0.55, r * 0.98);
  cap.position.y = r * 0.55;
  cap.castShadow = true;
  head.add(cap);
  if (style === "short" || style === "crop" || style === "white") {
    const fringe = mesh(r * 1.5, r * 0.35, r * 0.4, mat);
    fringe.position.set(0, r * 0.35, r * 0.7);
    head.add(fringe);
  }
  if (style === "bun" || style === "tied") {
    const bun = new THREE.Mesh(sphere, mat);
    bun.scale.set(r * 0.45, r * 0.4, r * 0.45);
    bun.position.set(0, r * 0.85, style === "tied" ? -r * 0.2 : -r * 0.55);
    bun.castShadow = true;
    head.add(bun);
  }
  if (style === "long" || style === "white") {
    const back = mesh(r * 1.7, r * 2.1, r * 0.55, mat);
    back.position.set(0, -r * 0.15, -r * 0.55);
    head.add(back);
  }
  if (style === "crop") {
    cap.scale.set(r * 0.9, r * 0.32, r * 0.9);
  }
}

export function poseRig(rig: Rig, action: string, stateT: number, moving: boolean, time: number) {
  const swing = time * (moving ? 7.2 : 1.5);
  if (action === "walk" || (action === "idle" && moving)) {
    rig.legL.rotation.x = Math.sin(swing) * 0.55;
    rig.legR.rotation.x = Math.sin(swing + Math.PI) * 0.55;
    rig.armL.rotation.x = Math.sin(swing + Math.PI) * 0.45;
    rig.armR.rotation.x = Math.sin(swing) * 0.45;
    rig.hips.position.y = rig.hips.userData.baseY + Math.abs(Math.sin(swing)) * 0.035;
    rig.armL.rotation.z = 0.04;
    rig.armR.rotation.z = -0.04;
    rig.torso.rotation.y = Math.sin(swing) * 0.05;
  } else if (action === "light") {
    const t = stateT;
    rig.armR.rotation.x = t < 0.12 ? -0.4 : t < 0.26 ? 1.15 : 0.4;
    rig.armL.rotation.x = 0.3;
    rig.torso.rotation.y = t < 0.2 ? 0.35 : -0.15;
    resetLegs(rig);
  } else if (action === "heavy") {
    const wind = stateT < 0.3;
    rig.armR.rotation.x = wind ? -1.6 : 1.25;
    rig.torso.rotation.x = wind ? -0.25 : 0.35;
    rig.armL.rotation.x = wind ? -0.6 : 0.2;
    resetLegs(rig);
  } else if (action === "block") {
    rig.armL.rotation.x = -1.25;
    rig.armR.rotation.x = -1.25;
    rig.armL.rotation.z = 0.35;
    rig.armR.rotation.z = -0.35;
    rig.torso.rotation.x = -0.08;
    resetLegs(rig);
  } else if (action === "dodge") {
    rig.torso.rotation.x = 0.55;
    rig.hips.position.y = (rig.hips.userData.baseY as number) - 0.18;
    rig.armL.rotation.x = 0.4;
    rig.armR.rotation.x = 0.4;
    resetLegs(rig);
  } else if (action === "stun") {
    rig.torso.rotation.x = -0.3;
    rig.armL.rotation.x = 0.6;
    rig.armR.rotation.x = 0.8;
    resetLegs(rig);
  } else if (action === "down") {
    rig.hips.position.y = (rig.hips.userData.baseY as number) - 0.45;
    rig.torso.rotation.x = 0.7;
    rig.armL.rotation.x = 0.9;
    rig.armR.rotation.x = 1;
    rig.legL.rotation.x = -1.1;
    rig.legR.rotation.x = -0.4;
  } else {
    const b = Math.sin(time * 1.6);
    rig.torso.rotation.x = b * 0.015;
    rig.torso.rotation.y = 0;
    rig.torso.rotation.z = 0;
    rig.armL.rotation.x = 0.08 + b * 0.02;
    rig.armR.rotation.x = 0.1 - b * 0.02;
    rig.armL.rotation.z = 0.08;
    rig.armR.rotation.z = -0.08;
    resetLegs(rig);
    rig.hips.position.y = rig.hips.userData.baseY as number;
    rig.head.rotation.y = Math.sin(time * 0.4) * 0.08;
  }
  if (action !== "idle") rig.head.rotation.y = 0;
}

function resetLegs(rig: Rig) {
  rig.legL.rotation.x = 0;
  rig.legR.rotation.x = 0;
}

export function rememberBase(rig: Rig) {
  rig.hips.userData.baseY = rig.hips.position.y;
}
