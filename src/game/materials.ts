import * as THREE from "three";

const cache = new Map<string, THREE.Material>();

export type MatOpts = {
  rough?: number;
  metal?: number;
  emissive?: string;
  ei?: number;
  opacity?: number;
  side?: THREE.Side;
};

export function std(hex: string, opts: MatOpts = {}) {
  const key = JSON.stringify({ hex, ...opts });
  const hit = cache.get(key);
  if (hit) return hit as THREE.MeshStandardMaterial;
  const mat = new THREE.MeshStandardMaterial({
    color: hex,
    roughness: opts.rough ?? 0.82,
    metalness: opts.metal ?? 0.02,
    emissive: opts.emissive ?? "#000000",
    emissiveIntensity: opts.ei ?? 0,
    transparent: (opts.opacity ?? 1) < 1,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  });
  cache.set(key, mat);
  return mat;
}

export function canvasMaterial(
  draw: (g: CanvasRenderingContext2D, w: number, h: number) => void,
  w: number,
  h: number,
  repeat: [number, number],
  rough = 0.9,
) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d");
  if (!g) return std("#888888");
  draw(g, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.anisotropy = 4;
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: rough, metalness: 0.02 });
  cache.set(`tex-${cache.size}-${Math.random()}`, mat);
  return mat;
}

export function speck(g: CanvasRenderingContext2D, w: number, h: number, alpha: number, count: number) {
  for (let i = 0; i < count; i++) {
    const dark = Math.random() > 0.5;
    g.fillStyle = dark ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha * 0.7})`;
    g.fillRect(Math.random() * w, Math.random() * h, Math.random() * 3 + 1, Math.random() * 3 + 1);
  }
}

export function disposeMaterials() {
  for (const mat of cache.values()) {
    const maybe = mat as THREE.MeshStandardMaterial;
    if (maybe.map) maybe.map.dispose();
    mat.dispose();
  }
  cache.clear();
}
