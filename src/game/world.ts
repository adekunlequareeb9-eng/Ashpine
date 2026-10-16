import * as THREE from "three";
import { CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import {
  LOOKS,
  buildPerson,
  playerLook,
  rememberBase,
  type Rig,
} from "@/game/characters";
import { BLOCKS } from "@/game/layout";
import { canvasMaterial, disposeMaterials, speck, std } from "@/game/materials";
import type { Profile } from "@/game/types";

export type World = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  labels: CSS2DRenderer;
  sun: THREE.DirectionalLight;
  sky: THREE.ShaderMaterial;
  rigs: Map<string, Rig>;
  lanterns: THREE.PointLight[];
  rebuildPlayer: (profile: Profile) => void;
  dispose: () => void;
};

const COLORS = {
  plaster: "#d7cfc3",
  timber: "#5a4032",
  stone: "#b7b1a7",
  dark: "#3a2e28",
  counter: "#6b4e39",
};

export function createWorld(canvas: HTMLCanvasElement, labelHost: HTMLElement): World {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor("#cbbba8");

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("#d9cbb8", 18, 62);

  const camera = new THREE.PerspectiveCamera(46, 1, 0.12, 140);

  const sky = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      top: { value: new THREE.Color("#8ea0b0") },
      horizon: { value: new THREE.Color("#eadccb") },
      bottom: { value: new THREE.Color("#d5c4ae") },
    },
    vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vP; uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom;
      void main(){
        float h = normalize(vP).y;
        vec3 c = mix(horizon, top, smoothstep(0.0, 0.62, h));
        c = mix(bottom, c, smoothstep(-0.25, 0.08, h));
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(80, 20, 14), sky);
  scene.add(dome);

  const hemi = new THREE.HemisphereLight("#f3e6d4", "#6d6458", 0.72);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight("#ffe0bf", 2.35);
  sun.position.set(14, 24, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.bias = -0.00025;
  sun.shadow.normalBias = 0.04;
  const cam = sun.shadow.camera;
  cam.left = -28;
  cam.right = 28;
  cam.top = 28;
  cam.bottom = -28;
  cam.near = 1;
  cam.far = 70;
  sun.target.position.set(0, 0, 2);
  scene.add(sun);
  scene.add(sun.target);

  const street = canvasMaterial(
    (g, w, h) => {
      g.fillStyle = "#a79f94";
      g.fillRect(0, 0, w, h);
      g.strokeStyle = "rgba(70,60,50,0.35)";
      for (let y = 0; y < h; y += 28) {
        g.strokeRect(0, y, w, 28);
        for (let x = (y / 28) % 2 === 0 ? 0 : 22; x < w; x += 44) g.strokeRect(x, y, 44, 28);
      }
      speck(g, w, h, 0.08, 1800);
    },
    256,
    256,
    [18, 18],
  );
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(90, 90), street);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const court = canvasMaterial(
    (g, w, h) => {
      g.fillStyle = "#cfc6b8";
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 40; i++) {
        g.strokeStyle = "rgba(80,70,60,0.28)";
        g.strokeRect(Math.random() * w, Math.random() * h, 30 + Math.random() * 40, 18 + Math.random() * 20);
      }
      speck(g, w, h, 0.07, 900);
    },
    256,
    256,
    [4, 5],
  );
  addFloor(scene, -10.1, 10.1, -8.9, 12.35, 0.02, court);

  const wood = canvasMaterial(
    (g, w, h) => {
      g.fillStyle = "#8a6548";
      g.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 18) {
        g.fillStyle = y % 36 === 0 ? "#7b5a40" : "#946c4e";
        g.fillRect(0, y, w, 17);
        g.fillStyle = "rgba(40,24,12,0.15)";
        g.fillRect(0, y + 16, w, 2);
      }
      speck(g, w, h, 0.06, 500);
    },
    256,
    256,
    [3, 4],
    0.78,
  );
  addFloor(scene, -14.55, 14.55, -21.1, -8.7, 0.04, wood);
  addFloor(scene, -21.8, -10.4, -5.8, 11.8, 0.04, wood);
  addFloor(scene, 10.4, 21.8, -5.8, 11.8, 0.04, wood);

  const plaster = canvasMaterial((g, w, h) => {
    g.fillStyle = COLORS.plaster;
    g.fillRect(0, 0, w, h);
    speck(g, w, h, 0.05, 1200);
  }, 128, 128, [1, 1], 0.92);
  const timber = canvasMaterial((g, w, h) => {
    g.fillStyle = COLORS.timber;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "rgba(0,0,0,0.18)";
    for (let x = 0; x < w; x += 16) g.strokeRect(x, 0, 16, h);
    speck(g, w, h, 0.08, 400);
  }, 128, 128, [1, 1], 0.8);
  const stone = canvasMaterial((g, w, h) => {
    g.fillStyle = COLORS.stone;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = "rgba(60,50,40,0.35)";
    for (let y = 0; y < h; y += 22) g.strokeRect(0, y, w, 22);
    speck(g, w, h, 0.07, 400);
  }, 128, 128, [1, 1], 0.95);
  const mats = {
    plaster,
    timber,
    stone,
    dark: std(COLORS.dark, { rough: 0.9 }),
    counter: std(COLORS.counter, { rough: 0.75 }),
  };

  for (const block of BLOCKS) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(block.w, block.h, block.d), mats[block.mat]);
    mesh.position.set(block.x, block.h / 2, block.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
  }

  roof(scene, -16.2, 16.2, -22.1, -8.4, 4.45, 6.5, std("#6e3b34", { rough: 0.86, side: THREE.DoubleSide }));
  roof(scene, -22.5, -9.85, -6.45, 12.45, 3.7, 5.35, std("#6a403c", { rough: 0.88, side: THREE.DoubleSide }));
  roof(scene, 9.85, 22.5, -6.45, 12.45, 3.7, 5.35, std("#6a403c", { rough: 0.88, side: THREE.DoubleSide }));
  roof(scene, 11.2, 19.5, 18.7, 24.1, 4.25, 5.5, std("#6e4a42", { rough: 0.9, side: THREE.DoubleSide }));

  addWindows(scene);
  addProps(scene);
  const lanterns = addLanterns(scene);

  const sign = labelTexture("ASHPINE", "tea · herbs · hall");
  const board = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.85), new THREE.MeshStandardMaterial({ map: sign, roughness: 0.7 }));
  board.position.set(0, 2.15, 12.45);
  scene.add(board);
  const shopSign = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 0.62),
    new THREE.MeshStandardMaterial({ map: labelTexture("TRADING FLOOR", "open at seven"), roughness: 0.7 }),
  );
  shopSign.position.set(9.82, 2.7, 6);
  shopSign.rotation.y = -Math.PI / 2;
  scene.add(shopSign);
  const pell = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.5),
    new THREE.MeshStandardMaterial({ map: labelTexture("PELL'S", "teas"), roughness: 0.75 }),
  );
  pell.position.set(15.3, 3.1, 18.5);
  scene.add(pell);

  const notice = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 1.15),
    new THREE.MeshStandardMaterial({ map: labelTexture("CIRCUIT", "winter list"), roughness: 0.8 }),
  );
  notice.position.set(5.6, 1.35, 13.95);
  scene.add(notice);

  const rigs = new Map<string, Rig>();
  for (const [id, look] of Object.entries(LOOKS)) {
    const rig = buildPerson(look, id);
    rememberBase(rig);
    scene.add(rig.group);
    rigs.set(id, rig);
  }

  const labels = new CSS2DRenderer();
  labels.domElement.style.position = "absolute";
  labels.domElement.style.inset = "0";
  labels.domElement.style.pointerEvents = "none";
  labelHost.appendChild(labels.domElement);

  const rebuildPlayer = (profile: Profile) => {
    const previous = rigs.get("player");
    if (previous) {
      scene.remove(previous.group);
      previous.label.element.remove();
    }
    const rig = buildPerson(playerLook(profile), profile.name);
    rememberBase(rig);
    scene.add(rig.group);
    rigs.set("player", rig);
  };

  return {
    scene,
    camera,
    renderer,
    labels,
    sun,
    sky,
    rigs,
    lanterns,
    rebuildPlayer,
    dispose: () => {
      labels.domElement.remove();
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      disposeMaterials();
      sky.dispose();
    },
  };
}

function addFloor(scene: THREE.Scene, x0: number, x1: number, z0: number, z1: number, y: number, mat: THREE.Material) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function roof(scene: THREE.Scene, x0: number, x1: number, z0: number, z1: number, eave: number, peak: number, mat: THREE.Material) {
  const mid = (z0 + z1) / 2;
  const positions = new Float32Array([
    x0, eave, z0, x1, eave, z0, x1, peak, mid,
    x0, eave, z0, x1, peak, mid, x0, peak, mid,
    x0, eave, z1, x0, peak, mid, x1, peak, mid,
    x0, eave, z1, x1, peak, mid, x1, eave, z1,
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function addWindows(scene: THREE.Scene) {
  const frame = std("#3a302a", { rough: 0.6 });
  const glass = std("#b7c6c8", { rough: 0.12, metal: 0.15, opacity: 0.38 });
  const lamp = std("#14352c", { emissive: "#8ed7b4", ei: 0.9, rough: 0.4 });
  const spots = [
    { x: -9.85, z: 3.2, rot: Math.PI / 2 },
    { x: -9.85, z: 8.4, rot: Math.PI / 2 },
    { x: 9.85, z: 4.2, rot: -Math.PI / 2 },
    { x: 9.85, z: 8.8, rot: -Math.PI / 2 },
    { x: 9.85, z: -2.4, rot: -Math.PI / 2 },
    { x: -21.8, z: 4, rot: -Math.PI / 2 },
    { x: 21.8, z: 4, rot: Math.PI / 2 },
  ];
  for (const spot of spots) {
    const g = new THREE.Group();
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.15, 0.85), frame);
    const pane = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.95, 0.65), glass);
    pane.position.x = 0.02;
    g.add(f, pane);
    g.position.set(spot.x, 1.7, spot.z);
    g.rotation.y = spot.rot;
    scene.add(g);
  }
  const study = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.15, 0.9), lamp);
  study.position.set(-9.88, 1.65, -3.3);
  scene.add(study);
  const glow = new THREE.PointLight("#9ddec0", 8, 6, 2);
  glow.position.set(-12.2, 1.7, -3.3);
  scene.add(glow);
}

function addProps(scene: THREE.Scene) {
  const brass = std("#c6a15b", { rough: 0.45, metal: 0.45 });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.035, 8, 28), brass);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(-0.5, 0.07, -16.5);
  scene.add(ring);

  tree(scene, -3.55, -1.15, "ash");
  tree(scene, 4.15, 0.45, "pine");

  const bannerMat = std("#8f2f22", { rough: 0.7 });
  const banner = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 1.4), bannerMat);
  banner.position.set(-6.2, 2.2, -8.95);
  scene.add(banner);
  const banner2 = banner.clone();
  banner2.position.set(6.2, 2.2, -8.95);
  scene.add(banner2);

  const staffMat = std("#c2a27a", { rough: 0.7 });
  for (let i = 0; i < 4; i++) {
    const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 1.7, 6), staffMat);
    staff.position.set(-12.6, 0.9, -14 - i * 0.35);
    staff.rotation.z = 0.15;
    staff.castShadow = true;
    scene.add(staff);
  }

  bike(scene, -4.2, 13.7);
  const crateMat = std("#7a5a3a", { rough: 0.86 });
  for (const [x, z] of [[12.2, 10.6], [13.1, 10.4]] as const) {
    const crate = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.45), crateMat);
    crate.position.set(x, 0.24, z);
    crate.castShadow = true;
    scene.add(crate);
  }

  const tin = std("#8d8a84", { rough: 0.4, metal: 0.55 });
  for (let i = 0; i < 5; i++) {
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.22, 8), tin);
    can.position.set(16.2 + (i % 3) * 0.28, 1.18, 8.4 + Math.floor(i / 3) * 0.28);
    scene.add(can);
  }
}

function tree(scene: THREE.Scene, x: number, z: number, kind: "ash" | "pine") {
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 1.7, 7), std("#5a4638", { rough: 0.9 }));
  trunk.position.set(x, 0.85, z);
  trunk.castShadow = true;
  scene.add(trunk);
  if (kind === "pine") {
    const leaf = std("#2e4634", { rough: 0.9 });
    for (let i = 0; i < 3; i++) {
      const cone = new THREE.Mesh(new THREE.ConeGeometry(1.15 - i * 0.28, 1.15, 8), leaf);
      cone.position.set(x, 2.1 + i * 0.72, z);
      cone.castShadow = true;
      scene.add(cone);
    }
  } else {
    const leaf = std("#6d7d58", { rough: 0.92 });
    for (const offset of [
      [0, 2.5, 0],
      [-0.45, 2.2, 0.2],
      [0.4, 2.3, -0.25],
    ] as const) {
      const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 1), leaf);
      ball.position.set(x + offset[0], offset[1], z + offset[2]);
      ball.castShadow = true;
      scene.add(ball);
    }
  }
}

function bike(scene: THREE.Scene, x: number, z: number) {
  const g = new THREE.Group();
  const metal = std("#3e4650", { rough: 0.4, metal: 0.6 });
  for (const wz of [-0.48, 0.48]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.02, 6, 14), metal);
    wheel.position.set(0, 0.28, wz);
    wheel.rotation.y = Math.PI / 2;
    g.add(wheel);
  }
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.9), metal);
  frame.position.y = 0.42;
  g.add(frame);
  g.position.set(x, 0, z);
  g.rotation.y = 0.4;
  scene.add(g);
}

function addLanterns(scene: THREE.Scene) {
  const lights: THREE.PointLight[] = [];
  const spots = [
    [-6.5, -6.5],
    [6.5, -6.5],
    [-6.5, 8],
    [6.5, 8],
    [0, -12],
  ] as const;
  const paper = std("#e7b07a", { emissive: "#ff9a4a", ei: 0.8, rough: 0.5 });
  const post = std("#3a302a", { rough: 0.8 });
  for (const [x, z] of spots) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.1, 6), post);
    pole.position.set(x, 1.05, z);
    pole.castShadow = true;
    scene.add(pole);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.3, 0.22), paper);
    lamp.position.set(x, 2.15, z);
    scene.add(lamp);
    const light = new THREE.PointLight("#ff9a4a", 10, 7.5, 2);
    light.position.set(x, 2.15, z);
    scene.add(light);
    lights.push(light);
  }
  const bulb = new THREE.PointLight("#ffe0c2", 14, 9, 2);
  bulb.position.set(16, 2.4, 6);
  scene.add(bulb);
  lights.push(bulb);
  const office = new THREE.PointLight("#ffe0c2", 10, 7, 2);
  office.position.set(16.5, 2.3, -2);
  scene.add(office);
  lights.push(office);
  return lights;
}

function labelTexture(title: string, sub: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 180;
  const g = canvas.getContext("2d");
  if (!g) throw new Error("canvas");
  g.fillStyle = "#2a211c";
  g.fillRect(0, 0, 512, 180);
  g.strokeStyle = "#c6a15b";
  g.lineWidth = 8;
  g.strokeRect(10, 10, 492, 160);
  g.fillStyle = "#f3eadf";
  g.font = "600 72px Georgia, serif";
  g.textAlign = "center";
  g.fillText(title, 256, 100);
  g.font = "28px Georgia, serif";
  g.fillStyle = "#c6a15b";
  g.fillText(sub, 256, 142);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function applyEra(world: World, era: "flashback" | "present") {
  applyMood(world, era, false);
}

export function applyMood(world: World, era: "flashback" | "present", night: boolean) {
  if (night) {
    world.sky.uniforms.top.value.set("#1c2836");
    world.sky.uniforms.horizon.value.set("#6d5344");
    world.sky.uniforms.bottom.value.set("#2a211c");
    world.sun.color.set("#ffb07a");
    world.sun.intensity = 0.38;
    world.sun.position.set(-16, 8, 6);
    if (world.scene.fog instanceof THREE.Fog) {
      world.scene.fog.color.set("#2a2420");
      world.scene.fog.near = 10;
      world.scene.fog.far = 46;
    }
    world.renderer.setClearColor("#1a1614");
    return;
  }
  const dusk = era === "flashback";
  world.sky.uniforms.top.value.set(dusk ? "#5d6e86" : "#8ea0b0");
  world.sky.uniforms.horizon.value.set(dusk ? "#e2b48a" : "#eadccb");
  world.sky.uniforms.bottom.value.set(dusk ? "#c48a62" : "#d5c4ae");
  world.sun.color.set(dusk ? "#ffc08a" : "#ffe0bf");
  world.sun.intensity = dusk ? 1.7 : 2.35;
  world.sun.position.set(dusk ? -10 : 14, dusk ? 12 : 24, dusk ? 8 : 10);
  if (world.scene.fog instanceof THREE.Fog) {
    world.scene.fog.color.set(dusk ? "#c9aa90" : "#d9cbb8");
    world.scene.fog.near = dusk ? 12 : 18;
    world.scene.fog.far = 62;
  }
  world.renderer.setClearColor("#cbbba8");
}
