import { i as __toESM } from "../_runtime.mjs";
import { G as require_jsx_runtime, K as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Pause, c as BookOpen, i as ScrollText, n as Swords, o as Leaf, r as Shield, s as Eye } from "../_libs/lucide-react.mjs";
import { C as SRGBColorSpace, D as TorusGeometry, E as SphereGeometry, S as RepeatWrapping, T as ShaderMaterial, _ as Mesh, a as BufferAttribute, b as PlaneGeometry, c as CircleGeometry, d as CylinderGeometry, f as DirectionalLight, g as IcosahedronGeometry, h as HemisphereLight, i as BoxGeometry, l as Color, m as Group, n as CSS2DRenderer, o as BufferGeometry, p as Fog, r as WebGLRenderer, s as CanvasTexture, t as CSS2DObject, u as ConeGeometry, v as MeshStandardMaterial, w as Scene, x as PointLight, y as PerspectiveCamera } from "../_libs/three.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GameApp-BKTQYf-I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLAYER_RADIUS = .34;
/** Axis-aligned solids. Centers are x/z; height grows up from the ground. */
var BLOCKS = [
	{
		x: 0,
		z: -21.35,
		w: 30.4,
		d: .5,
		h: 4.5,
		mat: "timber"
	},
	{
		x: -14.9,
		z: -15.05,
		w: .5,
		d: 12.6,
		h: 4.5,
		mat: "timber"
	},
	{
		x: 14.9,
		z: -15.05,
		w: .5,
		d: 12.6,
		h: 4.5,
		mat: "timber"
	},
	{
		x: -22.1,
		z: 3,
		w: .48,
		d: 18.4,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: -16.2,
		z: -6.1,
		w: 12.3,
		d: .48,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: -16.2,
		z: 12.1,
		w: 12.3,
		d: .48,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: -10.15,
		z: -.4,
		w: .46,
		d: 11.3,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: -10.15,
		z: 9.45,
		w: .46,
		d: 5.2,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: -16.25,
		z: -.55,
		w: 11.4,
		d: .36,
		h: 3.55,
		mat: "plaster"
	},
	{
		x: 22.1,
		z: 3,
		w: .48,
		d: 18.4,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: 16.2,
		z: -6.1,
		w: 12.3,
		d: .48,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: 16.2,
		z: 12.1,
		w: 12.3,
		d: .48,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: 10.15,
		z: -.4,
		w: .46,
		d: 11.3,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: 10.15,
		z: 9.45,
		w: .46,
		d: 5.2,
		h: 3.75,
		mat: "plaster"
	},
	{
		x: 12.65,
		z: 1.55,
		w: 4.6,
		d: .32,
		h: 3.55,
		mat: "plaster"
	},
	{
		x: 19.25,
		z: 1.55,
		w: 5.2,
		d: .32,
		h: 3.55,
		mat: "plaster"
	},
	{
		x: -6.35,
		z: 12.15,
		w: 8.1,
		d: .5,
		h: 2.7,
		mat: "stone"
	},
	{
		x: 6.35,
		z: 12.15,
		w: 8.1,
		d: .5,
		h: 2.7,
		mat: "stone"
	},
	{
		x: -12.2,
		z: 28.45,
		w: 20.2,
		d: .45,
		h: 1.2,
		mat: "stone"
	},
	{
		x: 12.2,
		z: 28.45,
		w: 20.2,
		d: .45,
		h: 1.2,
		mat: "stone"
	},
	{
		x: -8.35,
		z: 34.4,
		w: .4,
		d: 11.4,
		h: 1.25,
		mat: "stone"
	},
	{
		x: 8.35,
		z: 34.4,
		w: .4,
		d: 11.4,
		h: 1.25,
		mat: "stone"
	},
	{
		x: 0,
		z: 40.35,
		w: 16.4,
		d: .45,
		h: 1.15,
		mat: "stone"
	},
	{
		x: 6.55,
		z: 33.7,
		w: 3.15,
		d: 4.4,
		h: 4.1,
		mat: "plaster"
	},
	{
		x: -22.45,
		z: 20.3,
		w: .45,
		d: 16.6,
		h: 1.2,
		mat: "stone"
	},
	{
		x: 22.45,
		z: 20.3,
		w: .45,
		d: 16.6,
		h: 1.2,
		mat: "stone"
	},
	{
		x: 15.3,
		z: 21.3,
		w: 8.4,
		d: 5.5,
		h: 4.3,
		mat: "plaster"
	},
	{
		x: -5.5,
		z: 3.7,
		w: 1.35,
		d: 1.35,
		h: .85,
		mat: "stone"
	},
	{
		x: -3.55,
		z: -1.15,
		w: .55,
		d: .55,
		h: 1.4,
		mat: "dark"
	},
	{
		x: 4.15,
		z: .45,
		w: .5,
		d: .5,
		h: 1.4,
		mat: "dark"
	},
	{
		x: 16.7,
		z: 8.15,
		w: 3.3,
		d: .95,
		h: 1.05,
		mat: "counter"
	},
	{
		x: 8.4,
		z: -17.6,
		w: .4,
		d: .4,
		h: 1.5,
		mat: "dark"
	},
	{
		x: 10.2,
		z: -17.2,
		w: .4,
		d: .4,
		h: 1.5,
		mat: "dark"
	}
];
var POSTS = {
	present: {
		lin: {
			x: 14.7,
			z: -2.6,
			yaw: 2.5
		},
		ren: {
			x: -2.2,
			z: -16.4,
			yaw: .6
		},
		sable: {
			x: -8.45,
			z: -3.25,
			yaw: Math.PI / 2
		},
		jonah: {
			x: 1.7,
			z: 5.15,
			yaw: Math.PI
		},
		hana: {
			x: 2.8,
			z: -15.2,
			yaw: Math.PI
		},
		tomas: {
			x: 14.15,
			z: 6.35,
			yaw: .4
		},
		iris: {
			x: 18.6,
			z: -4.15,
			yaw: Math.PI / 2
		},
		pia: {
			x: 6.4,
			z: -16.8,
			yaw: .2
		},
		ellis: {
			x: 7.8,
			z: -15.5,
			yaw: -.8
		}
	},
	flashback: {
		shen: {
			x: .1,
			z: -2.15,
			yaw: Math.PI
		},
		lin: {
			x: -2.45,
			z: 2.55,
			yaw: .2
		},
		ren: {
			x: 2.55,
			z: 2.45,
			yaw: -.25
		},
		sable: {
			x: -1.45,
			z: 3.65,
			yaw: .05
		},
		jonah: {
			x: 1.55,
			z: 3.7,
			yaw: -.08
		}
	},
	spar: {
		lin: {
			x: -6.2,
			z: -10.35,
			yaw: .35
		},
		jonah: {
			x: -4.4,
			z: -10.2,
			yaw: .1
		},
		sable: {
			x: 4.5,
			z: -10.2,
			yaw: -.15
		},
		hana: {
			x: 6.4,
			z: -10.4,
			yaw: -.45
		}
	}
};
var SPOTS = {
	train: {
		id: "train",
		x: -.5,
		z: -16.5,
		label: "Practice the Ash Breath"
	},
	study: {
		id: "study",
		x: -8.35,
		z: -3.35,
		label: "Look through the study window"
	},
	board: {
		id: "board",
		x: 5.6,
		z: 14.35,
		label: "Read the circuit notice"
	},
	ledger: {
		id: "ledger",
		x: 16.4,
		z: -1.35,
		label: "Open the house ledger"
	},
	rest: {
		id: "rest",
		x: -16.5,
		z: 6.4,
		label: "Sleep until the house opens"
	},
	letter: {
		id: "letter",
		x: .85,
		z: 14.35,
		label: "Take the envelope under the stone"
	}
};
var QUAY_ADLER = {
	x: 4.15,
	z: 33.55,
	yaw: Math.PI / 2
};
var QUAY_SABLE = {
	x: 1.55,
	z: 32.35,
	yaw: .35
};
var HALE_WAIT = {
	x: 13.2,
	z: .2,
	yaw: Math.PI
};
var JONAH_ROOM = {
	x: 15.55,
	z: -1.45,
	yaw: -.7
};
var ADLER_WAIT = {
	x: .35,
	z: 14.55,
	yaw: 0
};
var ADLER_SPAWN_Z = 25.5;
/** Where the four stand once the morning's work is done, until the hall is locked. */
var GATHER = {
	lin: {
		x: -1.55,
		z: 1.15,
		yaw: .5
	},
	ren: {
		x: 1.7,
		z: 1.05,
		yaw: -.55
	},
	sable: {
		x: -.85,
		z: 2.65,
		yaw: .18
	},
	jonah: {
		x: 1,
		z: 2.7,
		yaw: -.12
	}
};
var FLASH_SPAWN = {
	x: 0,
	z: 7.35,
	yaw: 0
};
var PRESENT_SPAWN = {
	x: .2,
	z: 4.1,
	yaw: 0
};
function floorY(x, z) {
	if (x > -14.55 && x < 14.55 && z < -8.75 && z > -21.15) return .045;
	if (x < -10.35 && x > -21.85 && z > -5.85 && z < 11.85) return .04;
	if (x > 10.35 && x < 21.85 && z > -5.85 && z < 11.85) return .04;
	if (x > -10.2 && x < 10.2 && z > -8.9 && z < 12.3) return .02;
	return 0;
}
function placeAt(x, z) {
	if (z > 29.2) {
		if (x > 4.6 && z < 36.2) return "14 Quay Stairs";
		if (z > 37.2) return "The water stairs";
		return "Quay lane";
	}
	if (z < -8.8 && x > -15 && x < 15) return "Training hall";
	if (x < -10.2 && z < -.4) return "Outside the study";
	if (x < -10.2) return "Residence";
	if (x > 10.2 && z < 1.45) return "Office";
	if (x > 10.2) return "Trading floor";
	if (z > 12.6) return "Gate street";
	return "Courtyard";
}
function economy(decision) {
	const trade = decision === "dock" ? 5400 : 6200;
	const tuition = 2400;
	const wages = 4100;
	const upkeep = 1800;
	const supply = decision === "pay" ? 2860 : decision === "dock" ? 1400 : 2200;
	const income = trade + tuition;
	const costs = 5900 + supply;
	return {
		trade,
		tuition,
		wages,
		upkeep,
		supply,
		income,
		costs,
		net: income - costs
	};
}
function visiblePost(id, era, sparring) {
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
function actorPose(id, save, sparring, talking = false) {
	if (sparring) return visiblePost(id, save.era, true);
	if (id === "hale") {
		if (!(save.flags.dawn && save.posture === "receive" && !save.flags.branch) && !talking) return null;
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
var NAMES = {
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
	ellis: "Ellis"
};
var ctx = null;
var muted = false;
function setMuted(next) {
	muted = next;
	if (muted && ctx) ctx.suspend();
	else if (ctx) ctx.resume();
}
function unlockAudio() {
	if (typeof window === "undefined") return;
	if (!ctx) ctx = new AudioContext();
	if (!muted && ctx.state === "suspended") ctx.resume();
}
function envGain(duration, peak) {
	if (!ctx || muted) return null;
	const gain = ctx.createGain();
	gain.connect(ctx.destination);
	const now = ctx.currentTime;
	gain.gain.setValueAtTime(1e-4, now);
	gain.gain.exponentialRampToValueAtTime(peak, now + .015);
	gain.gain.exponentialRampToValueAtTime(1e-4, now + duration);
	return {
		ctx,
		gain,
		now
	};
}
function tick(freq = 520) {
	const node = envGain(.08, .03);
	if (!node || !ctx) return;
	const osc = ctx.createOscillator();
	osc.type = "triangle";
	osc.frequency.value = freq;
	osc.connect(node.gain);
	osc.start(node.now);
	osc.stop(node.now + .09);
}
function thud() {
	const node = envGain(.16, .08);
	if (!node || !ctx) return;
	const osc = ctx.createOscillator();
	osc.type = "sine";
	osc.frequency.setValueAtTime(140, node.now);
	osc.frequency.exponentialRampToValueAtTime(55, node.now + .14);
	osc.connect(node.gain);
	osc.start(node.now);
	osc.stop(node.now + .16);
}
function stepSound() {
	const node = envGain(.07, .025);
	if (!node || !ctx) return;
	const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .06), ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
	const src = ctx.createBufferSource();
	src.buffer = buffer;
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = 280;
	src.connect(filter);
	filter.connect(node.gain);
	src.start(node.now);
}
var cache = /* @__PURE__ */ new Map();
function std(hex, opts = {}) {
	const key = JSON.stringify({
		hex,
		...opts
	});
	const hit = cache.get(key);
	if (hit) return hit;
	const mat = new MeshStandardMaterial({
		color: hex,
		roughness: opts.rough ?? .82,
		metalness: opts.metal ?? .02,
		emissive: opts.emissive ?? "#000000",
		emissiveIntensity: opts.ei ?? 0,
		transparent: (opts.opacity ?? 1) < 1,
		opacity: opts.opacity ?? 1,
		side: opts.side ?? 0
	});
	cache.set(key, mat);
	return mat;
}
function canvasMaterial(draw, w, h, repeat, rough = .9) {
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const g = canvas.getContext("2d");
	if (!g) return std("#888888");
	draw(g, w, h);
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = SRGBColorSpace;
	tex.wrapS = RepeatWrapping;
	tex.wrapT = RepeatWrapping;
	tex.repeat.set(repeat[0], repeat[1]);
	tex.anisotropy = 4;
	const mat = new MeshStandardMaterial({
		map: tex,
		roughness: rough,
		metalness: .02
	});
	cache.set(`tex-${cache.size}-${Math.random()}`, mat);
	return mat;
}
function speck(g, w, h, alpha, count) {
	for (let i = 0; i < count; i++) {
		g.fillStyle = Math.random() > .5 ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha * .7})`;
		g.fillRect(Math.random() * w, Math.random() * h, Math.random() * 3 + 1, Math.random() * 3 + 1);
	}
}
function disposeMaterials() {
	for (const mat of cache.values()) {
		const maybe = mat;
		if (maybe.map) maybe.map.dispose();
		mat.dispose();
	}
	cache.clear();
}
var SKIN = [
	"#e8c4a4",
	"#c48a5a",
	"#8a5336",
	"#4a3128"
];
function playerLook(profile) {
	return {
		height: 1.76,
		shoulder: profile.presentation === "soft" ? .36 : profile.presentation === "tailored" ? .46 : .41,
		skin: SKIN[profile.complexion],
		cloth: "#2a241f",
		trim: "#9a3a2c",
		hair: "#1a120e",
		hairStyle: profile.presentation === "soft" ? "long" : profile.presentation === "tailored" ? "short" : "crop",
		sleeves: true,
		legs: "#231e1b"
	};
}
var LOOKS = {
	lin: {
		height: 1.68,
		shoulder: .36,
		skin: SKIN[1],
		cloth: "#243028",
		trim: "#c6a15b",
		hair: "#140e0c",
		hairStyle: "bun",
		sleeves: true,
		legs: "#1c1916"
	},
	ren: {
		height: 1.86,
		shoulder: .5,
		skin: SKIN[1],
		cloth: "#6a5e52",
		trim: "#e6d7c4",
		hair: "#2a2118",
		hairStyle: "crop",
		sleeves: false,
		legs: "#2a241f"
	},
	sable: {
		height: 1.62,
		shoulder: .34,
		skin: SKIN[0],
		cloth: "#3c4650",
		trim: "#d7c4a3",
		hair: "#101014",
		hairStyle: "tied",
		sleeves: true,
		legs: "#24262c"
	},
	jonah: {
		height: 1.78,
		shoulder: .44,
		skin: SKIN[2],
		cloth: "#e4d8c8",
		trim: "#7a4e32",
		hair: "#3a2a22",
		hairStyle: "short",
		sleeves: true,
		legs: "#3a3128"
	},
	hana: {
		height: 1.7,
		shoulder: .4,
		skin: SKIN[0],
		cloth: "#e7e1d6",
		trim: "#1a1a1a",
		hair: "#1a1a1a",
		hairStyle: "tied",
		sleeves: true,
		legs: "#ded6cc"
	},
	tomas: {
		height: 1.74,
		shoulder: .46,
		skin: SKIN[2],
		cloth: "#e7e0d4",
		trim: "#3f4a3a",
		hair: "#2c241c",
		hairStyle: "short",
		sleeves: true,
		legs: "#3a332c"
	},
	iris: {
		height: 1.66,
		shoulder: .35,
		skin: SKIN[1],
		cloth: "#5c3d48",
		trim: "#e6d3c4",
		hair: "#241810",
		hairStyle: "bun",
		sleeves: true,
		legs: "#2c2428"
	},
	shen: {
		height: 1.77,
		shoulder: .42,
		skin: SKIN[1],
		cloth: "#2a3130",
		trim: "#c6a15b",
		hair: "#d9d4cc",
		hairStyle: "white",
		sleeves: true,
		legs: "#232826"
	},
	adler: {
		height: 1.8,
		shoulder: .38,
		skin: SKIN[0],
		cloth: "#c5c6c8",
		trim: "#2a2e33",
		hair: "#cfc8bc",
		hairStyle: "long",
		sleeves: true,
		legs: "#2c3036"
	},
	hale: {
		height: 1.83,
		shoulder: .42,
		skin: SKIN[2],
		cloth: "#3e4650",
		trim: "#c6a15b",
		hair: "#1a140f",
		hairStyle: "short",
		sleeves: true,
		legs: "#24282e"
	},
	pia: {
		height: 1.6,
		shoulder: .34,
		skin: SKIN[0],
		cloth: "#d9d3c8",
		trim: "#6e3b34",
		hair: "#1c140f",
		hairStyle: "tied",
		sleeves: true,
		legs: "#2a2622"
	},
	ellis: {
		height: 1.72,
		shoulder: .4,
		skin: SKIN[3],
		cloth: "#d7d1c6",
		trim: "#1e1a17",
		hair: "#1a120e",
		hairStyle: "crop",
		sleeves: true,
		legs: "#262220"
	}
};
var box = new BoxGeometry(1, 1, 1);
var sphere = new SphereGeometry(1, 14, 12);
function mesh(w, h, d, material) {
	const m = new Mesh(box, material);
	m.scale.set(w, h, d);
	m.castShadow = true;
	m.receiveShadow = true;
	return m;
}
function buildPerson(look, name) {
	const group = new Group();
	const H = look.height;
	const legLen = H * .46;
	const torsoLen = H * .3;
	const headR = H * .072;
	const skin = std(look.skin, { rough: .62 });
	const cloth = std(look.cloth, { rough: .84 });
	const trim = std(look.trim, { rough: .7 });
	const hair = std(look.hair, { rough: .55 });
	const legs = std(look.legs, { rough: .86 });
	const sleeve = look.sleeves ? cloth : skin;
	const hips = new Group();
	hips.position.y = legLen;
	group.add(hips);
	const pelvis = mesh(look.shoulder * .72, .16, .18, cloth);
	pelvis.position.y = .02;
	hips.add(pelvis);
	const torso = new Group();
	torso.position.y = .1;
	hips.add(torso);
	const chest = mesh(look.shoulder, torsoLen, .2, cloth);
	chest.position.y = torsoLen * .42;
	torso.add(chest);
	const collar = mesh(look.shoulder * .72, .07, .22, trim);
	collar.position.y = torsoLen * .78;
	torso.add(collar);
	const headPivot = new Group();
	headPivot.position.y = torsoLen * .92;
	torso.add(headPivot);
	const head = new Mesh(sphere, skin);
	head.scale.set(headR * .92, headR * 1.05, headR * .96);
	head.castShadow = true;
	headPivot.add(head);
	const eyeMat = std("#1a1412", { rough: .4 });
	for (const side of [-1, 1]) {
		const eye = new Mesh(sphere, eyeMat);
		eye.scale.set(.018, .018, .012);
		eye.position.set(side * headR * .38, headR * .08, headR * .82);
		headPivot.add(eye);
	}
	addHair(headPivot, look.hairStyle, hair, headR);
	const armL = limb(look.shoulder * .55, torsoLen * .78, sleeve, skin, torso, 1);
	const armR = limb(-look.shoulder * .55, torsoLen * .78, sleeve, skin, torso, -1);
	const legL = leg(.09, legs, hips, 1, legLen);
	const legR = leg(-.09, legs, hips, -1, legLen);
	const disc = new Mesh(new CircleGeometry(.34, 16), std(look.trim, {
		rough: 1,
		opacity: .35
	}));
	disc.rotation.x = -Math.PI / 2;
	disc.position.y = .03;
	disc.receiveShadow = true;
	group.add(disc);
	const div = document.createElement("div");
	div.className = "nameplate";
	div.textContent = name;
	const label = new CSS2DObject(div);
	label.position.set(0, H + .18, 0);
	group.add(label);
	return {
		group,
		hips,
		torso,
		head: headPivot,
		armL,
		armR,
		legL,
		legR,
		label
	};
}
function limb(x, y, sleeve, skin, parent, side) {
	const pivot = new Group();
	pivot.position.set(x, y, 0);
	parent.add(pivot);
	const upper = mesh(.09, .28, .09, sleeve);
	upper.position.y = -.16;
	pivot.add(upper);
	const fore = mesh(.075, .24, .075, sleeve);
	fore.position.y = -.42;
	pivot.add(fore);
	const hand = mesh(.07, .07, .08, skin);
	hand.position.set(0, -.56, side * .01);
	pivot.add(hand);
	return pivot;
}
function leg(x, mat, parent, _side, legLen) {
	const pivot = new Group();
	pivot.position.set(x, .02, 0);
	parent.add(pivot);
	const thigh = mesh(.11, legLen * .52, .12, mat);
	thigh.position.y = -legLen * .26;
	pivot.add(thigh);
	const shin = mesh(.09, legLen * .46, .1, mat);
	shin.position.y = -legLen * .72;
	pivot.add(shin);
	const shoe = mesh(.1, .06, .18, std("#1a1614", { rough: .7 }));
	shoe.position.set(0, -legLen * .96, .03);
	pivot.add(shoe);
	return pivot;
}
function addHair(head, style, mat, r) {
	const cap = new Mesh(sphere, mat);
	cap.scale.set(r * .98, r * .55, r * .98);
	cap.position.y = r * .55;
	cap.castShadow = true;
	head.add(cap);
	if (style === "short" || style === "crop" || style === "white") {
		const fringe = mesh(r * 1.5, r * .35, r * .4, mat);
		fringe.position.set(0, r * .35, r * .7);
		head.add(fringe);
	}
	if (style === "bun" || style === "tied") {
		const bun = new Mesh(sphere, mat);
		bun.scale.set(r * .45, r * .4, r * .45);
		bun.position.set(0, r * .85, style === "tied" ? -r * .2 : -r * .55);
		bun.castShadow = true;
		head.add(bun);
	}
	if (style === "long" || style === "white") {
		const back = mesh(r * 1.7, r * 2.1, r * .55, mat);
		back.position.set(0, -r * .15, -r * .55);
		head.add(back);
	}
	if (style === "crop") cap.scale.set(r * .9, r * .32, r * .9);
}
function poseRig(rig, action, stateT, moving, time) {
	const swing = time * (moving ? 7.2 : 1.5);
	if (action === "walk" || action === "idle" && moving) {
		rig.legL.rotation.x = Math.sin(swing) * .55;
		rig.legR.rotation.x = Math.sin(swing + Math.PI) * .55;
		rig.armL.rotation.x = Math.sin(swing + Math.PI) * .45;
		rig.armR.rotation.x = Math.sin(swing) * .45;
		rig.hips.position.y = rig.hips.userData.baseY + Math.abs(Math.sin(swing)) * .035;
		rig.armL.rotation.z = .04;
		rig.armR.rotation.z = -.04;
		rig.torso.rotation.y = Math.sin(swing) * .05;
	} else if (action === "light") {
		const t = stateT;
		rig.armR.rotation.x = t < .12 ? -.4 : t < .26 ? 1.15 : .4;
		rig.armL.rotation.x = .3;
		rig.torso.rotation.y = t < .2 ? .35 : -.15;
		resetLegs(rig);
	} else if (action === "heavy") {
		const wind = stateT < .3;
		rig.armR.rotation.x = wind ? -1.6 : 1.25;
		rig.torso.rotation.x = wind ? -.25 : .35;
		rig.armL.rotation.x = wind ? -.6 : .2;
		resetLegs(rig);
	} else if (action === "block") {
		rig.armL.rotation.x = -1.25;
		rig.armR.rotation.x = -1.25;
		rig.armL.rotation.z = .35;
		rig.armR.rotation.z = -.35;
		rig.torso.rotation.x = -.08;
		resetLegs(rig);
	} else if (action === "dodge") {
		rig.torso.rotation.x = .55;
		rig.hips.position.y = rig.hips.userData.baseY - .18;
		rig.armL.rotation.x = .4;
		rig.armR.rotation.x = .4;
		resetLegs(rig);
	} else if (action === "stun") {
		rig.torso.rotation.x = -.3;
		rig.armL.rotation.x = .6;
		rig.armR.rotation.x = .8;
		resetLegs(rig);
	} else if (action === "down") {
		rig.hips.position.y = rig.hips.userData.baseY - .45;
		rig.torso.rotation.x = .7;
		rig.armL.rotation.x = .9;
		rig.armR.rotation.x = 1;
		rig.legL.rotation.x = -1.1;
		rig.legR.rotation.x = -.4;
	} else {
		const b = Math.sin(time * 1.6);
		rig.torso.rotation.x = b * .015;
		rig.torso.rotation.y = 0;
		rig.torso.rotation.z = 0;
		rig.armL.rotation.x = .08 + b * .02;
		rig.armR.rotation.x = .1 - b * .02;
		rig.armL.rotation.z = .08;
		rig.armR.rotation.z = -.08;
		resetLegs(rig);
		rig.hips.position.y = rig.hips.userData.baseY;
		rig.head.rotation.y = Math.sin(time * .4) * .08;
	}
	if (action !== "idle") rig.head.rotation.y = 0;
}
function resetLegs(rig) {
	rig.legL.rotation.x = 0;
	rig.legR.rotation.x = 0;
}
function rememberBase(rig) {
	rig.hips.userData.baseY = rig.hips.position.y;
}
var runtime = {
	keys: /* @__PURE__ */ new Set(),
	override: null,
	overrideSnapped: false,
	steer: 0,
	move: {
		active: false,
		x: 0,
		y: 0
	},
	hold: { guard: false },
	edge: {
		light: false,
		heavy: false,
		dodge: false,
		interact: false,
		pause: false,
		ledger: false,
		cult: false
	},
	player: {
		x: .2,
		z: 4.1,
		yaw: 0,
		speed: 0
	},
	camYaw: .2,
	camPitch: .34,
	orbit: 0,
	dragging: false,
	colliders: [],
	shake: 0,
	flash: 0,
	fade: 0,
	hitStop: 0,
	spar: null,
	adlerZ: 25.5,
	stepAcc: 0,
	clockAcc: 0,
	hudAcc: 0,
	saveAcc: 0,
	foot: 0,
	elapsed: 0,
	returnPos: {
		x: 0,
		z: 4,
		yaw: 0
	},
	promptId: "",
	promptLabel: ""
};
function held(code) {
	if (runtime.override) return runtime.override.has(code);
	return runtime.keys.has(code);
}
function emptyHud() {
	return {
		prompt: "",
		promptId: "",
		place: "Courtyard",
		x: 0,
		z: 4,
		yaw: 0,
		spar: null
	};
}
function installProbe() {
	window.__controlsTest = {
		getYaw: () => runtime.player.yaw,
		getSpeed: () => runtime.player.speed,
		setSteer: (v) => {
			runtime.steer = Math.max(-1, Math.min(1, v));
		},
		setKeys: (codes) => {
			runtime.override = new Set(codes);
		}
	};
}
function node(speaker, text, extra = {}) {
	return {
		speaker,
		text,
		...extra
	};
}
var JOURNAL = {
	seal: {
		id: "seal",
		title: "The seal",
		text: "He put it in your hand at dusk and told you not to expect him at the usual hour. The papers were already in your name. He had packed nothing you could see."
	},
	holding: {
		id: "holding",
		title: "P. Meridian holding",
		text: "A quarterly transfer in Shen's hand, marked personal, stopped the month he left. It is not a supplier Iris recognises. She has not written to the bank."
	},
	study: {
		id: "study",
		title: "The lamp is still on",
		text: "The study is locked. Through the glass: a green lamp, a cleared desk, a cream page torn down one side. The watermark is a pine needle, not the ash-leaf stamp on the shop stationery."
	},
	board: {
		id: "board",
		title: "Winter exhibition",
		text: "City Martial Circuit, open class, empty hands, three weeks to enter. Ashpine is not on the list. Ren wants the proof. Hana thinks he is early, not wrong."
	},
	adler: {
		id: "adler",
		title: "Adler & Co.",
		text: "14 Quay Stairs. She said a private clientele will come whether or not you feel ready, and that the question 'where did he go' has already been wasted."
	},
	paper: {
		id: "paper",
		title: "Same paper",
		text: "Adler's card and the torn page in the study share a watermark and the same cream stock. She did not mention the study. The study cannot mention her."
	}
};
function inspectFor(id, save) {
	if (id === "study") return {
		title: "The study window",
		body: "The door is locked and the lamp is not. Green light on a desk cleared except for a closed ledger and a cream page torn down one side. The watermark is a pine needle. Your shop stationery uses an ash leaf. Nobody is in the chair." + (save.flags.adler ? " You take out Adler's card. Same cream stock. Same pine needle." : "")
	};
	return {
		title: "City Martial Circuit",
		body: "Winter Exhibition — open class. Public rules. Empty hands. Applications close in three weeks. Ashpine Hall is not yet listed. Someone has pencilled, in the margin of the posted sheet, 'serious houses only'."
	};
}
function met(id, save) {
	return save.met.includes(id);
}
function scriptFor(id, save) {
	if (save.era === "flashback") return flash(id);
	switch (id) {
		case "lin": return met("lin", save) ? linAgain(save) : linFirst();
		case "ren": return met("ren", save) ? renAgain(save) : renFirst();
		case "sable": return met("sable", save) ? sableAgain(save) : sableFirst();
		case "jonah": return met("jonah", save) ? jonahAgain(save) : jonahFirst();
		case "hana": return met("hana", save) ? hanaAgain(save) : hanaFirst();
		case "tomas": return met("tomas", save) ? tomasAgain(save) : tomasFirst();
		case "iris": return met("iris", save) ? irisAgain(save) : irisFirst();
		case "adler": return save.flags.dawn && save.posture === "stairs" && !save.flags.branch ? adlerQuay(save) : adler();
		case "council": return council(save);
		case "evening": return evening(save);
		case "hale": return hale();
		case "letter": return letter();
		case "exhibit": return exhibit(save);
		case "door": return door(save);
		case "pia": return one("pia", "Pia", "Hana said to keep my elbow in. I am keeping my elbow in. If you are the owner, please don't add a second instruction until this one fits.");
		default: return one("ellis", "Ellis", "Dawn class already finished. I stayed because the dummy doesn't sigh when I miss. Ren says that's not a personality. I think it's a kindness.");
	}
}
function one(id, speaker, text) {
	return {
		id,
		start: "a",
		nodes: { a: node(speaker, text, {
			effect: `met:${id}`,
			close: "talk"
		}) }
	};
}
function flash(id) {
	if (id === "shen") return {
		id: "shen",
		start: "s1",
		nodes: {
			s1: node("Shen Wei", "You came straight from the floor. Good. The others are here because this concerns all five of you, but the papers are in your name. That was my decision, not a vote.", { next: "s2" }),
			s2: node("Shen Wei", "Ashpine is a trading house that teaches martial arts, not a school that sells tea to seem respectable. Both halves are real. Both have people who depend on them. Neglect either, and the other starts to lie.", { next: "s3" }),
			s3: node("Shen Wei", "I am leaving the seal, the accounts, and a set of notes. The notes will look like breathing exercises. Practise before you decide they are only that.", { choices: [
				{
					label: "Where are you going?",
					goto: "s4a"
				},
				{
					label: "Why me? Lin is better with the books.",
					goto: "s4b"
				},
				{
					label: "We'll keep it standing.",
					goto: "s4c"
				}
			] }),
			s4a: node("Shen Wei", "If I answer that today, you will hear a destination instead of a warning. Stay with the house. It will teach you which questions are worth the walk.", { next: "s5" }),
			s4b: node("Shen Wei", "She is. She will also tell you when you are wrong, which is why you can carry the name. Leadership is not the same gift as being correct.", { next: "s5" }),
			s4c: node("Shen Wei", "Do not promise the building. Promise the people who open it. Buildings are patient. People are not.", { next: "s5" }),
			s5: node("Shen Wei", "The seal is yours. I have already signed the rest. Do not look for me at the usual hour tomorrow. I dislike long goodbyes, and I have already had this one.", {
				effect: "seal",
				close: "handover"
			})
		}
	};
	const pair = {
		lin: ["Lin Mei", "If you're about to refuse him, don't. We already talked. He's made up his mind, and so have we."],
		ren: ["Ren Calder", "I'll keep the hall honest. You keep the rest of us from inventing five different plans."],
		sable: ["Sable Quinn", "He packed nothing. I looked. Draw whatever conclusion you like, but don't tell me it's an ordinary trip."],
		jonah: ["Jonah Vale", "We'll be all right, Captain. That's not optimism. That's the work."]
	}[id] ?? ["Someone", "He's waiting."];
	return {
		id,
		start: "a",
		nodes: { a: node(pair[0], pair[1], {
			effect: `met:flash:${id}`,
			close: "talk"
		}) }
	};
}
function linFirst() {
	return {
		id: "lin",
		start: "a",
		nodes: {
			a: node("Lin Mei", "You're on the floor before eight. I'll allow myself to be impressed for one breath. Gao sent the autumn price. It's up. Iris has the page ready, and she has used the red pen, which means she is being polite.", { next: "b" }),
			b: node("Lin Mei", "We've made payroll for six months. Nobody is celebrating, which is how I know it's real. The house is not dying. It is one careless contract away from becoming a story we tell badly.", { choices: [{
				label: "What do you want me to do about Gao?",
				goto: "c"
			}, {
				label: "How are you, aside from the invoice?",
				goto: "d",
				effect: "bond:lin:+1:You asked about her, not only the invoice."
			}] }),
			c: node("Lin Mei", "I want the regulars to taste the same cup in November that they tasted in May. That means Gao. Whether you pay his pride or let Jonah talk him down is your name on the paper. I'll live with either if you do it on purpose.", {
				effect: "met:lin",
				close: "talk"
			}),
			d: node("Lin Mei", "Tired. Useful. I keep thinking about a version of this house that people mention without saying his name after. I don't know if that is ambition or ingratitude. I'm not asking you to solve it in the corridor.", {
				effect: "met:lin",
				close: "talk"
			})
		}
	};
}
function linAgain(save) {
	return {
		id: "lin",
		start: "a",
		nodes: {
			a: node("Lin Mei", (save.flags.evening ? "The books are closed. I'm still here because the red pen makes a sound I can think in. " : "") + (save.decision === "pay" ? "You paid him. The shelf stays honest. I won't pretend the margin is comfortable, but I can defend this number with my head up." : save.decision === "exclusive" ? "Jonah's exclusive. It holds if Gao's harvest holds. We've tied the season to one man's weather. I hope you did that because you trust the relationship, not because the signature was cheaper." : save.decision === "dock" ? "Dock stock. Tomas will sell it because Tomas is loyal, and two Wednesday regulars will know. I hope the cash was worth the conversation I'm about to have." : "The ledger is on the desk. Gao will not become more patient if we stare at the kettle."), { choices: [{
				label: "Open the ledger.",
				effect: "ledger"
			}, {
				label: "The four of us still aren't on the payroll.",
				goto: "b"
			}] }),
			b: node("Lin Mei", "Jonah calls it loyalty. I call it a habit that will turn into resentment the first time one of us needs a dentist. Not this morning. But write it down somewhere you can't romanticise it.", { close: "talk" })
		}
	};
}
function renFirst() {
	return {
		id: "ren",
		start: "a",
		nodes: {
			a: node("Ren Calder", "Hana took dawn class. She corrected a student three times and didn't mention us once. That's peace. Don't waste it by only owning the floor.", { next: "b" }),
			b: node("Ren Calder", "The winter exhibition is on the board by the gate. Public rules. Open class. I want our name on the list — not for a trophy. For proof the hall still produces fighters, and not only memories of him.", { choices: [
				{
					label: "Then spar. Show me the gap.",
					effect: "spar"
				},
				{
					label: "Are we good enough?",
					goto: "c"
				},
				{
					label: "After the morning's other work.",
					effect: "met:ren"
				}
			] }),
			c: node("Ren Calder", "Hana is Martial 6 and pretends the number is impolite. You're Martial 2. I'm 3. 'Good enough' is a spectator's phrase. Come and find out where you actually fail.", { choices: [{
				label: "Spar.",
				effect: "spar"
			}, {
				label: "Not this minute.",
				effect: "met:ren"
			}] })
		}
	};
}
function renAgain(save) {
	return {
		id: "ren",
		start: "a",
		nodes: { a: node("Ren Calder", (save.flags.evening ? "Students are gone. The floor is not. " : "") + (save.sparResult === "win" ? "You found the opening. Don't get poetic about it. Do it again when you're tired, or it was a story." : save.sparResult === "loss" ? "You lost a spar in your own hall and you're still standing here. That's the useful part. The other part is that I told you the rhythm and your body was late." : save.sparResult === "draw" ? "Neither of us yielded. Hana would call that unfinished. I call it a reason to go again." : "The floor is free. Talking about the exhibition will not put our name on it."), { choices: [{
			label: "Spar again.",
			effect: "spar"
		}, { label: "Leave the floor to the students." }] }) }
	};
}
function sableFirst() {
	return {
		id: "sable",
		start: "a",
		nodes: {
			a: node("Sable Quinn", "The study is locked. The key is not in the lower desk, the till, or the place Jonah hides sweets. I looked. I am telling you that I looked.", { next: "b" }),
			b: node("Sable Quinn", "His breathing notes are missing a page. The tear is yellowed — older than our signatures on the deliveries. And the lamp in there is on. It has been on for six months. Iris also found a transfer, 'P. Meridian holding', that stopped the month he left.", { choices: [
				{
					label: "Don't break into the study.",
					goto: "c",
					effect: "bond:sable:+0:You drew a line. She heard care, and also a closed door."
				},
				{
					label: "Keep looking. Bring it to me before you do anything sharp.",
					goto: "d",
					effect: "bond:sable:+1:You gave her a method, and a person to bring it to."
				},
				{
					label: "P. Meridian. Any honest guess?",
					goto: "e"
				}
			] }),
			c: node("Sable Quinn", "I wasn't going to use a brick. I'm saying the lock is part of the message. He locked it knowing we would stand on this side of the glass.", {
				effect: "met:sable",
				close: "talk"
			}),
			d: node("Sable Quinn", "I will. I don't want a secret from you. I want a method. If the lamp is a timer, it's a very confident timer.", {
				effect: "met:sable",
				close: "talk"
			}),
			e: node("Sable Quinn", "Holding companies don't get nicknames in his handwriting unless they were people, or places he didn't want the staff to repeat. P is not a supplier. I checked the invoices twice and then felt unwell about how much I enjoyed checking.", {
				effect: "met:sable",
				close: "talk"
			})
		}
	};
}
function sableAgain(save) {
	if (save.flags.dawn && save.posture === "stairs" && !save.flags.branch) return {
		id: "sable",
		start: "a",
		nodes: { a: node("Sable Quinn", "She's at the number. I'm not going in without you, and I'm not walking home on the question we already agreed was wasted. Pine paper. Who still has the plate. That's the visit.", { close: "talk" }) }
	};
	return {
		id: "sable",
		start: "a",
		nodes: { a: node("Sable Quinn", save.flags.evening ? "I'm not going back to the glass tonight. If I do, I'll start inventing a reason to force the lock, and you already told me what kind of morning that would be." : save.flags.study ? save.flags.adler ? "You saw the page. You've held her card. I won't say the word coincidence where the paper matches. I also won't kick the door. Yet." : "You looked. Good. The tear wasn't theatre. If a stranger mentions pine needles, I want the sentence before you give them tea." : "The window is right there. I'm not asking you to become me. I'm asking you to use your eyes before the morning fills up with invoices.", { close: "talk" }) }
	};
}
function jonahFirst() {
	return {
		id: "jonah",
		start: "a",
		nodes: {
			a: node("Jonah Vale", "Mrs Pell asked if you were eating. I lied with confidence. There's rice in the kitchen if you want the lie to become administration.", { next: "b" }),
			b: node("Jonah Vale", "The others will bring you problems shaped like their talents. Lin, numbers. Ren, a fight. Sable, a locked door. I'm bringing you the fact that the students stayed. Twenty-two of them. They like Hana. They are still deciding whether they like us.", { choices: [{
				label: "We keep the house by keeping the people.",
				goto: "c",
				effect: "bond:jonah:+1:You said the people first, where he could hear it."
			}, {
				label: "Tell me about Gao, honestly.",
				goto: "d"
			}] }),
			c: node("Jonah Vale", "Then say it where they can hear you, not only to me. I'll hold you to it, Captain. Affectionately. Which is the dangerous kind.", {
				effect: "met:jonah",
				close: "talk"
			}),
			d: node("Jonah Vale", "He's proud and he's fair. Haggle like he's a stranger and he'll sell the root to Pell and smile while he does it. Ask him for the season, exclusive, and mean it — he'll grumble and stay. I can walk that conversation. Not as a trick. As a history.", {
				effect: "met:jonah",
				close: "talk"
			})
		}
	};
}
function jonahAgain(save) {
	if (save.flags.dawn && save.posture === "receive" && !save.flags.branch) return {
		id: "jonah",
		start: "a",
		nodes: { a: node("Jonah Vale", "Hale is in the office. I'll stay. You do the talking. If he spends the hour on where Shen went, we don't pay him with a story. Tea is already poured. Don't apologise for the cups.", { close: "talk" }) }
	};
	return {
		id: "jonah",
		start: "a",
		nodes: { a: node("Jonah Vale", (save.flags.evening ? "Mrs Pell would say eat. The rice is still there. " : "") + (save.decision === "exclusive" ? "Gao will grumble in writing and then send the usual crates. You let the relationship do the work. I'll go see him this afternoon so the paper has a face." : save.decision === "pay" ? "You paid. Clean. I would have talked, but paying isn't an insult. Just don't forget the rice, or Mrs Pell will audit me." : save.decision === "dock" ? "You went around him. The dock blend will sell for a week and then the regulars will start a rumour that tastes like the tea. I wish you'd let me walk over there." : "If you want Gao handled like a person, say so before Lin handles him like a column. Both are kinds of respect. They are not the same kind."), { close: "talk" }) }
	};
}
function hanaFirst() {
	return {
		id: "hana",
		start: "a",
		nodes: {
			a: node("Hana Okabe", "You may watch the class. You may not apologise for owning the floor. The students can smell uncertainty, and they already have enough of their own.", { next: "b" }),
			b: node("Hana Okabe", "Ren wants the exhibition. He is not wrong. He is early. The difference is smaller than he thinks, and larger than a poster.", { choices: [{
				label: "What was Master Shen like, at the end?",
				goto: "c"
			}, {
				label: "Will you keep teaching?",
				goto: "d"
			}] }),
			c: node("Hana Okabe", "Quiet. He stopped correcting the advanced students and started watching the doorway. I asked if he was ill. He said he was finishing a count. I dislike answers like that. They tend to be precise.", {
				effect: "met:hana",
				close: "talk"
			}),
			d: node("Hana Okabe", "I teach because the hall is serious. Keep it serious and I stay. Turn it into a story about five young owners and I will say so — and then I will stay long enough to see whether you listened.", {
				effect: "met:hana",
				close: "talk"
			})
		}
	};
}
function hanaAgain(save) {
	return {
		id: "hana",
		start: "a",
		nodes: { a: node("Hana Okabe", save.flags.second ? "The door has a name. You do not get to knock on it by repeating the sentence. Practise, or go look after the house. Both are the work." : save.flags.evening ? "The hall is locked. If you practise, practise quietly. The dark is not an audience." : "Your breath notes are not a costume. If you practise them on this floor, do it until the strike belongs to you. I will not clap for a performance of his handwriting.", { close: "talk" }) }
	};
}
function tomasFirst() {
	return {
		id: "tomas",
		start: "a",
		nodes: {
			a: node("Tomas Reid", "Gao's root is what this counter smells like. The dock blend is cheaper and it tastes like a rumour of tea. I'll wrap whichever you buy. I only have one mouth, so I'm using it now.", { next: "b" }),
			b: node("Tomas Reid", "Shen used to stand where you're standing and say nothing for a full minute. Customers thought it was wisdom. I think he was listening for a loose lid. You don't have to imitate the silence. You do have to notice the lid.", {
				effect: "met:tomas",
				close: "talk"
			})
		}
	};
}
function tomasAgain(save) {
	return {
		id: "tomas",
		start: "a",
		nodes: { a: node("Tomas Reid", save.decision === "dock" ? "I'll label it honestly. If a regular asks, I won't lie for the margin. That's the only condition I didn't put in writing, because I assumed it was obvious." : "The lids are tight. The morning is ordinary. Ordinary is what most of our people pay us for.", { close: "talk" }) }
	};
}
function irisFirst() {
	return {
		id: "iris",
		start: "a",
		nodes: {
			a: node("Iris Chen", "The week balances if we treat Gao's old price as still true. It does not balance if we pretend the new letter is a suggestion. I have flagged the line. Politely. The pen was already red.", { next: "b" }),
			b: node("Iris Chen", "There is also a dead transfer. Quarterly, to an account he labelled P. Meridian holding, marked personal, ceased six months ago. I don't chase a man's private money without the owner asking. You are the owner.", { choices: [{
				label: "Leave it noted. We'll come back with a better question.",
				goto: "c",
				effect: "holding"
			}, {
				label: "Open the ledger. I'll settle the supply.",
				effect: "ledger"
			}] }),
			c: node("Iris Chen", "Noted. I prefer an owner who can say 'not yet' to one who invents an answer to look decisive. The red line will still be there after lunch.", {
				effect: "met:iris",
				close: "talk"
			})
		}
	};
}
function irisAgain(save) {
	return {
		id: "iris",
		start: "a",
		nodes: { a: node("Iris Chen", save.decision ? "I'll enter the supply the way you chose it, not the way a neater week would have preferred. That's the job." : "The book is open whenever you are. Gao's letter does not improve with age.", { close: "talk" }) }
	};
}
function adler() {
	return {
		id: "adler",
		start: "a",
		nodes: {
			a: node("Ms Adler", "Ashpine opens at seven. That was part of the understanding, though none of you signed it. I'm not collecting a debt. I wanted to see whether the door still meant what it meant.", { choices: [
				{
					label: "What understanding?",
					goto: "b"
				},
				{
					label: "If you have business, you have it with me.",
					goto: "c"
				},
				{
					label: "Master Shen isn't here.",
					goto: "d"
				}
			] }),
			b: node("Ms Adler", "A private clientele. People who do not put their names on a circuit poster. They will come whether or not you feel ready. How you receive them will matter more than how hard any of you can hit.", { next: "e" }),
			c: node("Ms Adler", "Good. Then I'll say it to you. Shen Wei kept company that does not introduce itself at a counter. You will know them by the questions, not the clothes. I am only the first question.", { next: "e" }),
			d: node("Ms Adler", "I'm aware. The ward is full of people who are aware and still telling the wrong story. I won't trade rumours before breakfast. If he had wanted you to have a sentence, he would have left one you could frame.", { next: "e" }),
			e: node("Ms Adler", "My card. Fourteen Quay Stairs. When you have a better question than where he went, the address will still be good. Don't come with the first question. It's already been wasted by calmer people than either of us.", {
				effect: "adler",
				close: "talk"
			})
		}
	};
}
function council(save) {
	const lin = save.decision === "pay" ? "The supply is paid. I can live with a thin week. I cannot live with a clientele that doesn't appear in the book." : save.decision === "exclusive" ? "Jonah's exclusive is written down. A private clientele is not the same kind of promise, and I won't pretend it is." : "The dock blend is in the book. If we now start taking nameless visitors, the regulars will think we have two faces. They will be right.";
	const ren = save.sparResult === "win" ? "You found the opening this morning. That doesn't mean the next person through the gate is a spar." : "Whoever she represents, they are not a poster on the circuit board. Don't treat a card like a challenge slip.";
	const sable = save.flags.study ? "Her card and the torn page in the study are the same paper. I am saying that once, and then I am going to stand here and not kick the door." : "I haven't seen her paper next to the page in the study, because someone still hasn't looked through the glass. I'm saying that without throwing anything.";
	return {
		id: "council",
		start: "a",
		nodes: {
			a: node("Jonah Vale", "She left a card and a tone of voice. Lin has the supply written down. Ren has an opinion about the floor. Sable has not kicked the study door, which I am calling growth. We're here because the morning got larger than a kettle.", { next: "b" }),
			b: node("Lin Mei", lin, { next: "c" }),
			c: node("Ren Calder", ren, { next: "d" }),
			d: node("Sable Quinn", sable, { choices: [
				{
					label: "We receive them. One at a time. Never alone.",
					goto: "receive",
					effect: "posture:receive"
				},
				{
					label: "We don't open the door to people we can't name.",
					goto: "refuse",
					effect: "posture:refuse"
				},
				{
					label: "Quay Stairs. Sable comes. We take a better question.",
					goto: "stairs",
					effect: "posture:stairs"
				}
			] }),
			receive: node("Jonah Vale", "Then I'll be the second person in the room. Not as a bodyguard. As someone who notices when a guest stops being a guest.", { next: "end" }),
			refuse: node("Ren Calder", "Good. A hall that opens for anyone with a quiet card stops being a hall. The address can sit in the journal until it earns a better question.", { next: "end" }),
			stairs: node("Sable Quinn", "I'll come. I won't pretend I'm only there to take notes. If the paper matches, I want to see who still has the plate.", { next: "end" }),
			end: node("Lin Mei", "Then that's the house, for tonight. Go close the hall before Hana does it and decides we needed reminding.", {
				effect: "council",
				close: "talk"
			})
		}
	};
}
function evening(save) {
	return {
		id: "evening",
		start: "a",
		nodes: {
			a: node("Hana Okabe", `The students are gone. The floor is still warm. Whatever you decided in the courtyard, the hall does not need to hear it tonight. ${save.martialLevel >= 3 ? "You moved today. Don't spend the dark congratulating a number. Martial 3 is a floor that still has to be stood on." : "You are still Martial 2. That is not a verdict. It is also not a coat you get to wear without the work."}`, { next: "b" }),
			b: node("Hana Okabe", "Lock the side door. I'll take the front. If you look back at the residence, the study lamp will still be on. Leave it. A light is not an invitation, and a lock is not an answer.", { choices: [{
				label: "Lock the side door.",
				goto: "c"
			}, {
				label: "Will you still be here at dawn?",
				goto: "d"
			}] }),
			d: node("Hana Okabe", "I'll be here if the hall is still serious. You have not made it less serious today. That is the compliment. Don't make me repeat it.", { next: "c" }),
			c: node("Hana Okabe", "Good. Go. The five of you kept the doors open for six months. One evening of closing them will not undo that.", { close: "epilogue" })
		}
	};
}
function hale() {
	return {
		id: "hale",
		start: "a",
		nodes: {
			a: node("Jonah Vale", "This is Mr Hale. He asked for the owner, and he asked that I stay. I stayed. The kettle has already done its job.", { next: "b" }),
			b: node("Mr Hale", "Adler said this house would receive one person, and never alone. I am the one person. I did not come to ask where Shen Wei went. That question has been spent by people with more patience than I have.", { choices: [{
				label: "Then what is the hour for?",
				goto: "c"
			}, {
				label: "Forty minutes. Then the door.",
				goto: "d"
			}] }),
			c: node("Mr Hale", "A private hour on the floor, and a look at whether your paper is still an ash leaf. I can pay for the hour. I cannot pay you to become a different house, and I will not ask to see the study.", { next: "e" }),
			d: node("Mr Hale", "Then we understand each other. I will not stretch the time, and I will not decorate it. The floor, the paper on the desk, and then I go.", { next: "e" }),
			e: node("Mr Hale", "Four hundred and eighty pounds for the hour. Your friend stays. If the answer is not today, I will not pretend to be offended. A rule that bends for the first quiet coat is not a rule.", { choices: [{
				label: "Take the hour. Jonah stays.",
				goto: "stay"
			}, {
				label: "The hour can wait. The rule stands.",
				goto: "wait"
			}] }),
			stay: node("Jonah Vale", "I'll clear the office. He didn't ask the wasted question. That's the part I'm going to remember, not the fee.", {
				effect: "branch:hale",
				close: "talk"
			}),
			wait: node("Mr Hale", "Then I'll tell Adler the door is a door. She will not be surprised. Neither, I think, will you.", {
				effect: "branch:hale-wait",
				close: "talk"
			})
		}
	};
}
function letter() {
	return {
		id: "letter",
		start: "a",
		nodes: { a: node("The letter", "No stamp. Cream paper, a pine needle in the watermark. The hand is Adler's, or a very confident imitation. 'You closed the door. I will not send people to test the lock. The address remains. The first question is still wasted.'", { choices: [{
			label: "File it. The refusal holds.",
			effect: "branch:letter"
		}, {
			label: "Keep it. Do not answer it.",
			effect: "branch:letter"
		}] }) }
	};
}
function exhibit(save) {
	return {
		id: "exhibit",
		start: "a",
		nodes: { a: node("The notice", `Winter Exhibition. Open class. Empty hands. Applications close in three weeks. The margin still says 'serious houses only'. The fee, if you enter this morning, is six hundred pounds. ${save.sparResult === "win" ? "You already proved something on the floor. A list is a different kind of proof. I still want our name where serious houses put theirs." : "I don't want a trophy. I want the hall on a public list, so we are not only a story people tell about an old man who left."}`, { choices: [{
			label: "Enter Ashpine. Pay the fee.",
			effect: "exhibit:enter"
		}, {
			label: "Hold. He is early, not wrong.",
			effect: "exhibit:hold"
		}] }) }
	};
}
function adlerQuay(save) {
	const study = save.flags.study ? "You have seen the page in the study. I am not going to pretend that is a coincidence, and I am not going to explain the lock." : "If you have not looked through your own study glass, do that before you decide my stationery is a plot.";
	return {
		id: "adler",
		start: "a",
		nodes: {
			a: node("Sable Quinn", "We're here. I'm not taking notes for the performance of it. If the paper matches, I want to know who else still has the plate.", { next: "b" }),
			b: node("Ms Adler", `You came without the wasted question. That is why the door upstairs is open and we are standing in the wet instead. ${study}`, { choices: [{
				label: "Who else uses the pine needle?",
				goto: "c"
			}, {
				label: "What do those rooms call the ninth?",
				goto: "d"
			}] }),
			c: node("Ms Adler", "People who do not put their names on a circuit poster. I will not give you a list before lunch, and I will not give you one at all if you treat it as a hunt. The plate is older than my card. Your ash leaf is the public face. The pine is what he used when he was not speaking to customers.", { next: "e" }),
			d: node("Ms Adler", "In rooms that do not print notices, Martial 9 is not a prize. It is a door. I have not walked through it. I have not met anyone who would admit they had, not to me, and not to you. The city has no public name past nine. Anyone who offers you one this year is selling you a story.", { next: "e" }),
			e: node("Ms Adler", "Take that back to the hall. Do not bring me a framed sentence about Shen Wei. If he had wanted you to have one, you would already be tired of it.", {
				effect: "branch:quay",
				close: "talk"
			})
		}
	};
}
function door(save) {
	return {
		id: "door",
		start: "a",
		nodes: {
			a: node("Hana Okabe", `${save.exhibit === "enter" ? "You put the hall on a public list. That is a serious act. It is not the same as being ready for what the list cannot print." : "You held the exhibition. Ren will sulk in a straight line, which is his most honest shape. You did not hide from the decision."} ${save.martialLevel >= 4 ? "You are Martial 4. Defend it. A public rank that you cannot repeat when you are tired is a costume." : save.martialLevel >= 3 ? "You are Martial 3. Ren's number is no longer a ceiling you get to gesture at. It is a person you can reach, on a good day, if your feet agree with your eyes." : "You are still Martial 2. I am not shaming you. I am refusing to let a sentence become an excuse to skip the floors."}`, { next: "b" }),
			b: node("Hana Okabe", "You want the margin explained. Then hear it once. The ninth is a door, not a ceiling. The city has no public rank past nine, and I will not invent one so the five of you have a ladder to stare at. I have stood at six for years. Six is not humility. Six is the work.", { next: "c" }),
			c: node("Hana Okabe", "He watched the doorway, at the end, and called it finishing a count. I disliked the precision. I still dislike it. That is not a sentence you get to frame, and it is not a rank you inherit. The intact notes will carry a careful student to Martial 4. After that, the page is torn. Wanting the rest of it does not glue it back.", { choices: [{
				label: "I'll stay on the floors I can stand on.",
				goto: "d"
			}, {
				label: "If the door is real, I need to know the rules.",
				goto: "e"
			}] }),
			d: node("Hana Okabe", "Good. The house is still a house. The hall is still a hall. Come back to the floor when you want the strike to belong to you. I will be here if you keep it serious.", {
				effect: "second",
				close: "arc"
			}),
			e: node("Hana Okabe", "The rule you have is the one in front of you. Form, breath, and whether you can see a person in time to use what you saw. Understanding a counter is not the same as landing it. Anything past that is a rumour until your own hands make it boring. Do not ask me to skip you there.", {
				effect: "second",
				close: "arc"
			})
		}
	};
}
function objectives(save) {
	if (save.era === "flashback") return [{
		id: "seal",
		text: "Speak with Master Shen",
		done: save.flags.seal
	}];
	const friends = [
		"lin",
		"ren",
		"sable",
		"jonah"
	].filter((id) => save.met.includes(id)).length;
	const list = [
		{
			id: "friends",
			text: `Speak with the house (${Math.min(friends, 3)}/3)`,
			done: friends >= 3
		},
		{
			id: "ledger",
			text: "Settle Gao's supply",
			done: save.decision != null
		},
		{
			id: "practice",
			text: "Train the Ash Breath, or spar with Ren",
			done: save.flags.trained || save.flags.sparred
		}
	];
	if (save.decision) list.push({
		id: "gate",
		text: "See who is asking at the gate",
		done: save.flags.adler
	});
	if (save.met.includes("sable") || save.flags.study) list.push({
		id: "study",
		text: "Look through the locked study",
		done: save.flags.study
	});
	if (save.flags.chapter) list.push({
		id: "council",
		text: "Hear the four in the courtyard",
		done: save.flags.council
	});
	if (save.flags.council) list.push({
		id: "evening",
		text: "Close the hall with Hana",
		done: save.flags.evening
	});
	if (save.flags.evening && !save.flags.dawn) list.push({
		id: "rest",
		text: "Sleep in the residence until the house opens",
		done: false
	});
	if (save.flags.dawn) {
		const branch = save.posture === "receive" ? "Receive Mr Hale. Jonah stays in the room." : save.posture === "refuse" ? "Read the letter under the gate stone" : "Walk to 14 Quay Stairs with Sable";
		list.push({
			id: "branch",
			text: branch,
			done: save.flags.branch
		});
		if (save.flags.branch) list.push({
			id: "exhibit",
			text: "Decide the winter exhibition",
			done: save.exhibit != null
		});
		if (save.exhibit) list.push({
			id: "door",
			text: "Ask Hana what the ninth rank is",
			done: save.flags.second
		});
	}
	return list;
}
function regardWord(n) {
	if (n >= 3) return "Close";
	if (n >= 2) return "Steady";
	if (n >= 1) return "Wary";
	return "Strained";
}
function formatMinute(minute) {
	const total = 460 + Math.floor(minute);
	const dayAdd = Math.floor(total / 1440);
	const m = (total % 1440 + 1440) % 1440;
	const hh = Math.floor(m / 60);
	const mm = m % 60;
	return `${[
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday"
	][dayAdd % 7]} · ${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
function minutesUntilOpen(minute) {
	const day = 1440;
	let add = (430 - (460 + Math.floor(minute)) % day + day) % day;
	if (add < 90) add += day;
	return Math.floor(minute) + add;
}
function pounds(n) {
	return `£${Math.round(n).toLocaleString("en-GB")}`;
}
function closingNotes(save) {
	return [
		save.decision === "pay" ? "You paid Gao's increase. The shelf will taste the same, and the week will be thin. Lin can defend the number." : save.decision === "exclusive" ? "You kept Gao's old price and gave him the season. Jonah will put a face on the paper. The harvest is now part of the house." : save.decision === "dock" ? "You bought the dock blend. Tomas will not lie about it. Some of the Wednesday regulars will notice, and Lin will have to stand in front of that." : "Gao's letter is still unanswered.",
		save.sparResult === "win" ? "You beat Ren in his own pattern. He is Martial 3. Rank stayed a fact. It was not the verdict." : save.sparResult === "draw" ? "The spar with Ren finished with both of you still up. A higher rank is not a promise." : save.sparResult === "loss" ? save.flags.punished ? "Ren put you down, and you still took the opening once. Seeing a counter and having the body for it were not the same thing. For a moment they were." : "Ren put you down. If you saw his long windup, your feet were still late. That gap is allowed to last longer than a morning." : save.flags.trained ? "You practised the Ash Breath and left the spar for another day. The floor was still used for what a floor is for." : "The hall was open. You did not spend it.",
		save.posture === "receive" ? "Adler's card is real. You will receive her people one at a time, and never alone. Jonah will be the second person in the room." : save.posture === "refuse" ? "You will not open the door to a clientele you cannot name. The card stays in the journal. Refusal is not the same as forgetting." : save.posture === "stairs" ? "You and Sable will walk to 14 Quay Stairs, and not with the question of where Shen went. That one has already been wasted." : "The woman at the gate left a card. The house has not decided what to do with it.",
		save.flags.study ? save.flags.adler ? "Through the study glass: a green lamp, a cleared desk, a cream page with a pine-needle watermark. Adler's card is the same stock. She did not mention the study." : "Through the study glass: a green lamp, a cleared desk, a cream page with a pine-needle watermark. Your stationery uses an ash leaf." : "The study is still locked. The lamp in it has been on for six months. Sable has not used a brick.",
		"Shen Wei is still gone. You do not have a sentence that would fit a frame. In the margin of his notes, the ninth martial rank is a door, not a ceiling, and you have not opened it. The house remains a house. It will be here in the morning."
	];
}
function arcNotes(save) {
	return [
		save.posture === "receive" ? "Hale paid for forty minutes and did not ask where Shen went. Jonah stayed in the room. The rule held because you used it, not because you announced it." : save.posture === "refuse" ? "Adler did not send a second person to test the lock. The letter under the stone is a refusal accepted, not a mystery solved. The card is still in the journal." : "You and Sable stood at 14 Quay Stairs and asked about the paper, not the absence. Adler answered less than Sable wanted and more than a rumour would have.",
		save.exhibit === "enter" ? "Ashpine is on the winter list. Open class, empty hands, six hundred pounds. Ren has his proof. Lin has a line she can explain." : save.exhibit === "hold" ? "You held the exhibition. Ren is early, not wrong, and he heard you say so without dressing it up as fear." : "The exhibition board is still unanswered.",
		`${save.martialLevel >= 4 ? "You are Martial 4. That is a public rank. It changes a spar. It does not open the door." : save.martialLevel >= 3 ? "You are Martial 3. Ren's number is no longer something you only stand under. The next intact page asks for more form, more breath, and insight you cannot grind out of a count." : "You are still Martial 2. Hana did not treat that as an insult. She treated it as a floor."} Hana said the ninth is a door, not a ceiling, and that the city has no public name past nine. She will not invent one. Shen Wei is still gone. Nobody in this house has a sentence that would fit a frame.`,
		"The yard is still a yard. Training, the ledger, and the four of them do not expire because a chapter found its last line. Time still moves only while you are here."
	];
}
function nextRank(level) {
	if (level < 3) return {
		next: 3,
		form: 6,
		breath: 6,
		insight: 2
	};
	if (level === 3) return {
		next: 4,
		form: 12,
		breath: 12,
		insight: 4
	};
	return null;
}
var SAVE_KEY = "ashpine.v1";
function blankBonds() {
	return {
		lin: {
			regard: 2,
			line: "Watching whether you treat the books as a duty or a costume."
		},
		ren: {
			regard: 2,
			line: "Will keep the hall honest, and will say if you don't."
		},
		sable: {
			regard: 2,
			line: "Trusts you with an unfinished fact. Will not sit on it forever."
		},
		jonah: {
			regard: 2,
			line: "Counting the five of you before he counts the till."
		}
	};
}
function blankSave(profile) {
	return {
		version: 1,
		profile,
		era: "flashback",
		minute: 0,
		x: FLASH_SPAWN.x,
		z: FLASH_SPAWN.z,
		yaw: FLASH_SPAWN.yaw,
		martialLevel: 2,
		form: 2,
		breath: 1,
		insight: 0,
		cash: 18400,
		decision: null,
		visitor: "none",
		met: [],
		flags: {
			seal: false,
			study: false,
			board: false,
			holding: false,
			trained: false,
			sparred: false,
			punished: false,
			chapter: false,
			adler: false,
			council: false,
			evening: false,
			epilogueSeen: false,
			dawn: false,
			branch: false,
			second: false,
			arcSeen: false
		},
		sparResult: null,
		posture: null,
		exhibit: null,
		bonds: blankBonds(),
		journal: [],
		trainSessions: 0,
		pendingModal: null
	};
}
function readSave() {
	if (typeof localStorage === "undefined") return null;
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return null;
		const data = hydrate(JSON.parse(raw));
		if (data.version !== 1 || !data.profile?.name) return null;
		return data;
	} catch {
		return null;
	}
}
function writeSave(save) {
	if (typeof localStorage === "undefined") return;
	if (!save) {
		localStorage.removeItem(SAVE_KEY);
		return;
	}
	localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}
function blankFlags() {
	return {
		seal: false,
		study: false,
		board: false,
		holding: false,
		trained: false,
		sparred: false,
		punished: false,
		chapter: false,
		adler: false,
		council: false,
		evening: false,
		epilogueSeen: false,
		dawn: false,
		branch: false,
		second: false,
		arcSeen: false
	};
}
function hydrate(data) {
	return {
		...data,
		posture: data.posture ?? null,
		exhibit: data.exhibit ?? null,
		journal: data.journal ?? [],
		bonds: data.bonds?.lin ? data.bonds : blankBonds(),
		flags: {
			...blankFlags(),
			...data.flags
		}
	};
}
function addJournal(save, id) {
	if (save.journal.some((entry) => entry.id === id)) return;
	const entry = JOURNAL[id];
	if (entry) save.journal = [...save.journal, entry];
}
function pushJournal(save, entry) {
	if (save.journal.some((item) => item.id === entry.id)) return;
	save.journal = [...save.journal, entry];
}
function addMet(save, id) {
	if (!save.met.includes(id)) save.met = [...save.met, id];
}
function setBond(save, id, delta, line) {
	const current = save.bonds[id];
	save.bonds = {
		...save.bonds,
		[id]: {
			regard: Math.max(-1, Math.min(5, current.regard + delta)),
			line
		}
	};
}
function applyEffect(save, effect) {
	if (!effect) return save;
	const next = structuredClone(save);
	if (effect.startsWith("met:")) {
		addMet(next, effect.slice(4));
		return next;
	}
	if (effect.startsWith("bond:")) {
		const [, id, delta, ...rest] = effect.split(":");
		if (id === "lin" || id === "ren" || id === "sable" || id === "jonah") setBond(next, id, Number(delta), rest.join(":"));
		return next;
	}
	if (effect === "seal") {
		next.flags.seal = true;
		addMet(next, "shen");
		addJournal(next, "seal");
		return next;
	}
	if (effect === "holding") {
		next.flags.holding = true;
		addJournal(next, "holding");
		return next;
	}
	if (effect === "adler") {
		next.flags.adler = true;
		addMet(next, "adler");
		addJournal(next, "adler");
		if (next.flags.study) addJournal(next, "paper");
		return next;
	}
	if (effect.startsWith("posture:")) {
		const posture = effect.slice(8);
		if (posture !== "receive" && posture !== "refuse" && posture !== "stairs") return next;
		next.posture = posture;
		if (posture === "receive") {
			setBond(next, "jonah", 1, "You asked him to be the second person in the room. He will notice when a guest stops being a guest.");
			setBond(next, "sable", 1, "You didn't hand the house to strangers, and you didn't slam the door.");
			setBond(next, "lin", 0, "She will write a rule for who is allowed in. She wanted one anyway.");
			setBond(next, "ren", 0, "He wanted the door shut. He will live with a rule.");
		} else if (posture === "refuse") {
			setBond(next, "ren", 1, "You kept the hall from becoming a waiting room.");
			setBond(next, "lin", 1, "A clientele you can't name is not a revenue line. She is relieved you agree.");
			setBond(next, "jonah", 0, "He would have poured the tea. He understands why you didn't.");
			setBond(next, "sable", 0, "The card is still in the journal. Refusal is not the same as forgetting.");
		} else {
			setBond(next, "sable", 1, "You gave her the walk, not just the theory.");
			setBond(next, "jonah", 0, "He wanted to come. You asked Sable. He is pretending that is fine.");
			setBond(next, "lin", 0, "She wants the address written down before you leave the ward.");
			setBond(next, "ren", 0, "He thinks questions are slower than fists. He did not say you were wrong.");
		}
		return next;
	}
	if (effect === "council") {
		next.flags.council = true;
		pushJournal(next, {
			id: "council",
			title: "The courtyard",
			text: next.posture === "receive" ? "The four met in the courtyard. Private visitors will be received one at a time, never alone. Jonah stays in the room." : next.posture === "refuse" ? "The four met in the courtyard. The house will not open for a clientele it cannot name. Fourteen Quay Stairs stays in the journal." : "The four met in the courtyard. You and Sable will walk to Quay Stairs with a better question than where he went."
		});
		return next;
	}
	if (effect === "evening") {
		next.flags.evening = true;
		pushJournal(next, {
			id: "evening",
			title: "The hall, locked",
			text: "Hana took the front door. You took the side. The study lamp was still on. You left it."
		});
		return next;
	}
	if (effect.startsWith("branch:")) {
		next.flags.branch = true;
		const kind = effect.slice(7);
		if (kind === "hale") {
			next.cash += 480;
			setBond(next, "jonah", 1, "He stayed through the hour. Hale paid, asked nothing about the absence, and left while the tea was still warm.");
			pushJournal(next, {
				id: "hale",
				title: "Forty minutes",
				text: "Mr Hale paid £480 for a private hour. Jonah stayed in the room. Hale looked at the ash-leaf stationery, did not ask where Shen went, and did not ask to see the study."
			});
		} else if (kind === "hale-wait") {
			setBond(next, "jonah", 1, "You kept the rule and still sent the man home. Jonah would rather a closed hour than a careless one.");
			pushJournal(next, {
				id: "hale",
				title: "The hour can wait",
				text: "Hale came as the one visitor. You did not take the fee. He left without the wasted question, and the rule is still a rule."
			});
		} else if (kind === "letter") {
			setBond(next, "lin", 1, "A clientele you cannot name stayed unnamed. She can live with a letter. She could not have lived with a queue.");
			pushJournal(next, {
				id: "letter",
				title: "Under the stone",
				text: "Adler wrote that she will not send people to test a door you closed. The address remains. The first question is still wasted."
			});
		} else {
			setBond(next, "sable", 1, "You asked about the paper, in the place the paper came from. She has something to set beside the study, and she did not have to kick a door.");
			pushJournal(next, {
				id: "quay",
				title: "14 Quay Stairs",
				text: "Adler said the pine needle is stationery used by people who do not put their names on circuit posters. She called Martial 9 a door, in rooms that do not print notices. She has not walked through it. She did not say where Shen is."
			});
		}
		return next;
	}
	if (effect === "exhibit:enter") {
		next.exhibit = "enter";
		next.cash -= 600;
		setBond(next, "ren", 1, "The hall is on the list. He wanted proof, and you paid for the kind of proof a poster understands.");
		setBond(next, "lin", 0, "Six hundred pounds, written down. She can explain it. She would have preferred to wait.");
		pushJournal(next, {
			id: "exhibit",
			title: "Winter list",
			text: "Ashpine is entered. Open class, empty hands, three weeks. The fee was £600. Ren's name is not the only one that will be read out."
		});
		return next;
	}
	if (effect === "exhibit:hold") {
		next.exhibit = "hold";
		setBond(next, "ren", 0, "You told him he is early, not wrong. He is annoyed. He is still in the hall.");
		setBond(next, "lin", 1, "The poster can wait. She would rather the house be serious than famous for a week.");
		pushJournal(next, {
			id: "exhibit",
			title: "Not this season",
			text: "You held the exhibition. The pencilled line still says serious houses only. Ashpine is not on the list. Ren has been told he is early, not wrong."
		});
		return next;
	}
	if (effect === "second") {
		next.flags.second = true;
		pushJournal(next, {
			id: "door",
			title: "The ninth",
			text: "Hana named it without decorating it. Martial 9 is a door, not a ceiling. The city has no public rank past nine, and she will not invent one. The intact notes stop where the page is torn."
		});
		return next;
	}
	return next;
}
function chapterModal() {
	return {
		title: "The morning's work is done",
		body: "Supply is settled, the hall has been used, and a woman who is not a customer knows the door. The four of them are in the courtyard. They are not waiting for a speech. They are waiting to decide what the house does with the card."
	};
}
function maybeChapter(save) {
	if (save.era !== "present" || save.flags.chapter || save.pendingModal) return save;
	if ([
		"lin",
		"ren",
		"sable",
		"jonah"
	].filter((id) => save.met.includes(id)).length >= 3 && save.decision && (save.flags.trained || save.flags.sparred) && save.flags.adler) {
		save.flags.chapter = true;
		save.pendingModal = chapterModal();
	}
	return save;
}
function tryAdvance(save) {
	const need = nextRank(save.martialLevel);
	if (!need) return "";
	if (save.form >= need.form && save.breath >= need.breath && save.insight >= need.insight) {
		save.martialLevel = need.next;
		if (need.next === 4) return "\n\nMartial 4. The strike is yours when you are tired, not only when you are watching yourself do it. This is as far as the intact notes go. The ninth is still a door, and a progress count is not a key.";
		return "\n\nMartial 3. The strike settles, and your balance is still there when it ends. Hana would notice. Ren will. This does not make his rank a rumour, and it does not make the locked study any less locked.";
	}
	return "";
}
function missingLine(save) {
	const need = nextRank(save.martialLevel);
	if (!need) return "\n\nMartial 4 is as far as the intact page goes. Further ranks are not a bar you can fill.";
	const bits = [];
	if (save.form < need.form) bits.push(`Form ${save.form}/${need.form}`);
	if (save.breath < need.breath) bits.push(`Breath ${save.breath}/${need.breath}`);
	if (save.insight < need.insight) bits.push(`Insight ${save.insight}/${need.insight}`);
	if (!bits.length) return "";
	return `\n\nStill short of Martial ${need.next}: ${bits.join(", ")}. Insight comes from sparring with your eyes open, not from repeating the breath.`;
}
function placeRuntime(save) {
	runtime.player.x = save.x;
	runtime.player.z = save.z;
	runtime.player.yaw = save.yaw;
	runtime.camYaw = save.yaw;
	runtime.overrideSnapped = false;
	runtime.adlerZ = save.visitor === "walking" ? ADLER_SPAWN_Z : 14.55;
}
function decisionCopy(decision, save) {
	const book = economy(decision);
	if (decision === "pay") return {
		toast: "Gao's price is paid. The shelf stays honest.",
		body: `You paid £2,860. Cash is now ${save.cash.toLocaleString("en-GB")}. The week's trade holds at £6,200 if the regulars taste what they expect. Lin can defend the number. Jonah would have talked; he will not call this a betrayal.`,
		net: book.net
	};
	if (decision === "exclusive") return {
		toast: "Gao keeps the season. You keep the old price.",
		body: `£2,200, and the root is his alone until spring. Cash is ${save.cash.toLocaleString("en-GB")}. If a better crate appears, you have already said no. Jonah will walk the conversation this afternoon so the paper has a face.`,
		net: book.net
	};
	return {
		toast: "Dock stock is cheaper. Tomas will not lie about it.",
		body: `You spent £1,400. Cash is ${save.cash.toLocaleString("en-GB")}. Expect the week's trade to sag toward £5,400 once the Wednesday regulars notice. The margin looks clever for seven days.`,
		net: book.net
	};
}
var useGame = create((set, get) => ({
	phase: "title",
	resume: "play",
	save: null,
	hasSave: false,
	talk: null,
	inspect: null,
	modal: null,
	toast: null,
	hud: emptyHud(),
	pausePage: "root",
	boot: () => {
		set({ hasSave: !!readSave() });
	},
	toCreate: () => set({ phase: "create" }),
	toTitle: () => {
		set({
			phase: "title",
			hasSave: !!readSave(),
			talk: null,
			inspect: null,
			modal: null,
			pausePage: "root"
		});
	},
	startOrContinue: () => {
		unlockAudio();
		tick(440);
		const existing = readSave();
		if (!existing) {
			set({ phase: "create" });
			return;
		}
		placeRuntime(existing);
		runtime.fade = 1;
		set({
			save: existing,
			hasSave: true,
			phase: existing.flags.second && !existing.flags.arcSeen ? "epilogue" : existing.flags.evening && !existing.flags.epilogueSeen ? "epilogue" : existing.era === "flashback" ? "flashback" : "play",
			toast: null
		});
	},
	newStory: () => {
		unlockAudio();
		set({ phase: "create" });
	},
	confirmProfile: (profile) => {
		unlockAudio();
		tick(520);
		const save = blankSave(profile);
		placeRuntime(save);
		runtime.fade = 1;
		writeSave(save);
		set({
			save,
			hasSave: true,
			phase: "flashback",
			toast: null,
			talk: null
		});
	},
	beginPresent: () => {
		const current = get().save;
		if (!current) return;
		const save = {
			...structuredClone(current),
			era: "present",
			minute: 0,
			x: PRESENT_SPAWN.x,
			z: PRESENT_SPAWN.z,
			yaw: PRESENT_SPAWN.yaw,
			flags: {
				...current.flags,
				seal: true
			}
		};
		addJournal(save, "seal");
		placeRuntime(save);
		runtime.fade = 1;
		writeSave(save);
		set({
			save,
			phase: "play",
			toast: "Thursday morning. Six months since the seal."
		});
	},
	interact: () => {
		const { phase, save } = get();
		if (!save || phase !== "play" && phase !== "flashback") return;
		const prompt = runtime.promptId;
		if (!prompt) return;
		let id = prompt;
		if (save.era === "present" && save.flags.chapter && !save.flags.council && (id === "lin" || id === "ren" || id === "sable" || id === "jonah")) id = "council";
		if (save.era === "present" && save.flags.council && !save.flags.evening && id === "hana") id = "evening";
		if (save.era === "present" && save.flags.dawn && save.flags.branch && save.exhibit && !save.flags.second && id === "hana") id = "door";
		if (id === "rest") {
			get().beginDawn();
			return;
		}
		if (id === "ledger") {
			get().openLedger();
			return;
		}
		if (id === "train") {
			get().startTraining();
			return;
		}
		if (id === "board" && save.flags.dawn && save.flags.branch && !save.exhibit) id = "exhibit";
		else if (id === "study" || id === "board") {
			get().openInspect(id);
			return;
		}
		const script = scriptFor(id, save);
		const node = script.nodes[script.start];
		const nextSave = node ? applyEffect(save, node.effect) : save;
		set({
			phase: "talk",
			resume: phase,
			talk: {
				id,
				node: script.start,
				script
			},
			save: nextSave
		});
	},
	enterNode: (nodeId) => {
		const talk = get().talk;
		const save = get().save;
		if (!talk || !save) return;
		const node = talk.script.nodes[nodeId];
		if (!node) return;
		const nextSave = node.close ? save : applyEffect(save, node.effect);
		set({
			talk: {
				...talk,
				node: nodeId
			},
			save: nextSave
		});
	},
	advance: () => {
		const talk = get().talk;
		if (!talk) return;
		const node = talk.script.nodes[talk.node];
		if (!node || node.choices?.length) return;
		if (node.next) {
			get().enterNode(node.next);
			return;
		}
		let current = get().save;
		if (current && node.effect) {
			current = applyEffect(current, node.effect);
			set({ save: current });
		}
		if (node.close === "handover") {
			set({
				phase: "handover",
				talk: null
			});
			get().persist();
			return;
		}
		if (node.close === "epilogue") {
			const current = get().save;
			if (!current) {
				set({
					phase: "epilogue",
					talk: null
				});
				return;
			}
			const save = applyEffect(current, "evening");
			writeSave(save);
			set({
				save,
				phase: "epilogue",
				talk: null,
				hasSave: true
			});
			return;
		}
		if (node.close === "arc") {
			const current = get().save;
			if (!current) {
				set({
					phase: "epilogue",
					talk: null
				});
				return;
			}
			const save = current.flags.second ? current : applyEffect(current, "second");
			writeSave(save);
			set({
				save,
				phase: "epilogue",
				talk: null,
				hasSave: true
			});
			return;
		}
		get().closeTalk();
	},
	pick: (index) => {
		const talk = get().talk;
		const save = get().save;
		if (!talk || !save) return;
		const choice = talk.script.nodes[talk.node]?.choices?.[index];
		if (!choice) return;
		tick(480);
		let nextSave = applyEffect(save, choice.effect);
		if (choice.effect === "spar") {
			addMet(nextSave, "ren");
			set({
				save: nextSave,
				talk: null
			});
			get().startSpar();
			return;
		}
		if (choice.effect === "ledger") {
			addMet(nextSave, talk.id);
			set({
				save: nextSave,
				talk: null
			});
			get().openLedger();
			return;
		}
		set({ save: nextSave });
		if (choice.goto) {
			get().enterNode(choice.goto);
			return;
		}
		get().closeTalk();
	},
	closeTalk: () => {
		const current = get().save;
		const resume = get().resume === "flashback" ? "flashback" : "play";
		if (!current) {
			set({
				phase: resume,
				talk: null
			});
			return;
		}
		let save = structuredClone(current);
		if (save.flags.adler && save.visitor !== "met") save.visitor = "met";
		save = maybeChapter(save);
		const modal = save.pendingModal;
		if (modal) save.pendingModal = null;
		writeSave(save);
		set({
			save,
			talk: null,
			phase: modal ? "modal" : resume,
			modal,
			resume
		});
	},
	openLedger: () => {
		const current = get().save;
		if (!current || current.era !== "present") return;
		let save = structuredClone(current);
		if (!save.flags.holding) {
			save.flags.holding = true;
			addJournal(save, "holding");
		}
		writeSave(save);
		set({
			save,
			phase: "ledger",
			resume: "play",
			talk: null
		});
	},
	closePanel: () => {
		set({
			phase: get().save?.era === "flashback" ? "flashback" : "play",
			pausePage: "root"
		});
	},
	chooseSupply: (decision) => {
		const current = get().save;
		if (!current || current.decision) return;
		tick(560);
		let save = structuredClone(current);
		save.cash -= decision === "pay" ? 2860 : decision === "dock" ? 1400 : 2200;
		save.decision = decision;
		if (decision === "pay") setBond(save, "lin", 1, "You kept the shelf honest. She can defend the number.");
		if (decision === "exclusive") {
			setBond(save, "jonah", 1, "You let him deal with Gao the way Gao requires.");
			setBond(save, "lin", 0, "She accepted the exclusive. She is already worrying about the harvest.");
		}
		if (decision === "dock") {
			setBond(save, "lin", -1, "She will have the conversation with the Wednesday regulars.");
			setBond(save, "jonah", -1, "He wanted you to speak to Gao. You went around him.");
		}
		if (save.visitor === "none") {
			save.visitor = "walking";
			runtime.adlerZ = ADLER_SPAWN_Z;
		}
		save = maybeChapter(save);
		const copy = decisionCopy(decision, save);
		writeSave(save);
		set({
			save,
			toast: copy.toast,
			phase: "modal",
			modal: {
				title: "The order is in",
				body: copy.body
			}
		});
	},
	startTraining: () => {
		const save = get().save;
		if (!save || save.era !== "present") return;
		if (runtime.player.z > -9 || Math.abs(runtime.player.x) > 14) {
			set({ toast: "The breath wants the hall floor. The brass ring is inside." });
			return;
		}
		unlockAudio();
		set({
			phase: "train",
			resume: "play"
		});
	},
	finishTraining: (session, perfect, good) => {
		const current = get().save;
		if (!current) return;
		if (current.trainSessions >= session) return;
		let save = structuredClone(current);
		save.trainSessions = session;
		const base = perfect + good * .5;
		const doubled = base * 2;
		const formGain = Math.round(doubled / 2);
		const breathGain = Math.floor(doubled / 2);
		save.form += formGain;
		save.breath += breathGain;
		if (base >= 1) save.flags.trained = true;
		const advance = tryAdvance(save);
		const comparison = base <= 0 ? "The set didn't settle. Pressing through the inhale spends the breath you meant to keep. Nothing was added, and that is a result, not a glitch." : `A comparable student of Hana's would take ${base} from this set. You take ${doubled}. Form +${formGain}, Breath +${breathGain}. Shen wrote that your measure runs ahead. The notes did not explain why.`;
		save = maybeChapter(save);
		writeSave(save);
		set({
			save,
			phase: "modal",
			modal: {
				title: base <= 0 ? "The breath scattered" : "Ash Breath",
				body: comparison + (advance || missingLine(save))
			}
		});
	},
	startSpar: () => {
		if (!get().save || get().phase === "spar") return;
		runtime.returnPos = {
			x: runtime.player.x,
			z: runtime.player.z,
			yaw: runtime.player.yaw
		};
		runtime.spar = null;
		set({
			phase: "spar",
			resume: "play",
			talk: null,
			toast: null
		});
	},
	finishSpar: (result, info) => {
		const current = get().save;
		if (!current) return;
		let save = structuredClone(current);
		save.flags.sparred = true;
		save.sparResult = result;
		if (info.punished) save.flags.punished = true;
		let insight = 0;
		if (result === "win") insight = 2;
		else if (result === "draw" || info.blocks + info.dodges >= 2 || info.sawHeavy) insight = 1;
		save.insight += insight;
		const regardLine = result === "win" ? "You beat a higher rank in his own pattern. He is annoyed, which is his version of respect." : result === "draw" ? "You refused to fold. He will call that unfinished, and he will be back on the line." : insight > 0 ? "You lost and still left with a picture of him. He noticed which one it was." : "You left with bruises and no clearer picture. He will spar again. Come back with your eyes open.";
		setBond(save, "ren", result === "loss" && insight === 0 ? 0 : 1, regardLine);
		const advance = tryAdvance(save);
		const rankLine = result === "win" ? "He is Martial 3. You were not, when the spar started. Rank is a fact. It was not the verdict. You found a rhythm and your body was in time with what you understood." : result === "draw" ? "Time ran out with both of you still up. A lower rank holding a higher one to a draw is not a speech. It is information." : info.sawHeavy ? "You saw the long windup. Understanding the counter did not put your feet there. That gap is the whole lesson, and it is allowed to sting." : "You were busy swinging. The pattern was on offer. It will be on offer again.";
		save = maybeChapter(save);
		runtime.player.x = -.4;
		runtime.player.z = -12.4;
		runtime.player.yaw = 0;
		runtime.camYaw = 0;
		runtime.spar = null;
		writeSave(save);
		set({
			save,
			phase: "modal",
			modal: {
				title: result === "win" ? "Ren yields" : result === "draw" ? "Neither yields" : "Ren offers a hand",
				body: `${rankLine}\n\nInsight +${insight}. ${regardLine}${advance || missingLine(save)}`
			}
		});
	},
	togglePause: () => {
		const phase = get().phase;
		if (phase === "pause") {
			const back = get().resume;
			set({
				phase: back,
				pausePage: "root"
			});
			return;
		}
		if (phase === "talk") {
			get().closeTalk();
			return;
		}
		if (phase === "play" || phase === "flashback" || phase === "spar") set({
			phase: "pause",
			resume: phase,
			pausePage: "root"
		});
	},
	setPausePage: (page) => set({ pausePage: page }),
	openInspect: (id) => {
		const current = get().save;
		if (!current) return;
		let save = structuredClone(current);
		if (id === "study") {
			save.flags.study = true;
			addJournal(save, "study");
			if (save.flags.adler) addJournal(save, "paper");
		}
		if (id === "board") {
			save.flags.board = true;
			addJournal(save, "board");
		}
		writeSave(save);
		set({
			save,
			phase: "inspect",
			resume: "play",
			inspect: inspectFor(id, save)
		});
	},
	closeInspect: () => {
		get().closePanel();
		set({ inspect: null });
	},
	dismissModal: () => {
		const save = get().save;
		if (save?.pendingModal) {
			const modal = save.pendingModal;
			const next = structuredClone(save);
			next.pendingModal = null;
			writeSave(next);
			set({
				save: next,
				modal,
				phase: "modal"
			});
			return;
		}
		set({
			phase: save?.era === "flashback" ? "flashback" : "play",
			modal: null
		});
		get().persist();
	},
	stayEvening: () => {
		const current = get().save;
		if (!current) {
			set({ phase: "play" });
			return;
		}
		const save = structuredClone(current);
		if (save.flags.second) save.flags.arcSeen = true;
		else save.flags.epilogueSeen = true;
		writeSave(save);
		set({
			save,
			phase: "play",
			hasSave: true,
			toast: save.flags.second ? "Friday keeps going. The door has a name. It is not open." : "The lamps are lit. The residence is there when you want the night to end."
		});
	},
	beginDawn: () => {
		const current = get().save;
		if (!current || current.era !== "present" || !current.flags.evening || current.flags.dawn) return;
		const save = structuredClone(current);
		save.flags.epilogueSeen = true;
		save.flags.dawn = true;
		save.minute = minutesUntilOpen(save.minute);
		save.x = -14.2;
		save.z = 6.4;
		save.yaw = -Math.PI / 2;
		pushJournal(save, {
			id: "dawn",
			title: "Friday",
			text: "You slept in the residence. The clock moved because you closed your eyes, not because the city ran while you were away. The study lamp was still on. You left it."
		});
		placeRuntime(save);
		runtime.fade = 1;
		writeSave(save);
		set({
			save,
			phase: "play",
			hasSave: true,
			talk: null,
			modal: null,
			toast: `Friday morning. ${save.posture === "receive" ? "Hale is expected in the office. Jonah will stay." : save.posture === "refuse" ? "Something has been left under the stone at the gate." : "Sable is already at the water stairs."}`
		});
	},
	notePos: (x, z, yaw) => {
		const save = get().save;
		if (!save) return;
		if (save.x === x && save.z === z && save.yaw === yaw) return;
		set({ save: {
			...save,
			x,
			z,
			yaw
		} });
	},
	addMinute: (minutes) => {
		const save = get().save;
		const phase = get().phase;
		if (!save || phase !== "play" && phase !== "flashback") return;
		set({ save: {
			...save,
			minute: save.minute + minutes
		} });
	},
	setHud: (hud) => set({ hud }),
	visitorArrived: () => {
		const save = get().save;
		if (!save || save.visitor !== "walking") return;
		const next = {
			...save,
			visitor: "waiting"
		};
		writeSave(next);
		set({
			save: next,
			toast: "A woman in a grey coat has stopped at the gate."
		});
	},
	persist: () => {
		const save = get().save;
		if (!save) return;
		writeSave(save);
		set({ hasSave: true });
	}
}));
var LIGHT = {
	wind: .12,
	active: .13,
	rec: .24,
	range: 1.75
};
var HEAVY = {
	wind: .3,
	active: .16,
	rec: .46,
	range: 1.98
};
var solidsReady = false;
function ensureSolids() {
	if (solidsReady) return;
	runtime.colliders = BLOCKS.filter((b) => b.h >= .8).map((b) => ({
		minX: b.x - b.w / 2,
		maxX: b.x + b.w / 2,
		minZ: b.z - b.d / 2,
		maxZ: b.z + b.d / 2
	}));
	solidsReady = true;
}
function dampAngle(current, target, speed, dt) {
	const d = Math.atan2(Math.sin(target - current), Math.cos(target - current));
	const max = speed * dt;
	return current + Math.max(-max, Math.min(max, d));
}
function blocked(x, z) {
	const r = PLAYER_RADIUS;
	return runtime.colliders.some((b) => x + r > b.minX && x - r < b.maxX && z + r > b.minZ && z - r < b.maxZ);
}
function slide(x, z, dx, dz) {
	let nx = x + dx;
	if (blocked(nx, z)) nx = x;
	let nz = z + dz;
	if (blocked(nx, nz)) nz = z;
	if (blocked(nx, nz)) return {
		x,
		z
	};
	return {
		x: nx,
		z: nz
	};
}
function approach(v, target, max) {
	if (v < target) return Math.min(target, v + max);
	return Math.max(target, v - max);
}
var persistAcc = 0;
function stepGame(dt) {
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
	const exploring = phase === "play" || phase === "flashback" || synthetic && phase !== "spar" && phase !== "train";
	if (phase === "spar" && save && !synthetic) stepSpar(dt, save);
	else if (exploring) stepExplore(dt);
	if (save && (phase === "play" || phase === "flashback")) {
		separateFromPeople(save);
		updatePrompt(save);
		runtime.clockAcc += dt * .2;
		if (runtime.clockAcc >= .2) {
			const add = runtime.clockAcc;
			runtime.clockAcc = 0;
			useGame.getState().addMinute(add);
		}
		runtime.saveAcc += dt;
		if (runtime.saveAcc > .5) {
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
	if (!synthetic && !runtime.dragging && runtime.orbit <= 0 && phase !== "spar" && phase !== "title" && phase !== "create") runtime.camYaw = dampAngle(runtime.camYaw, runtime.player.yaw, 3.2, dt);
	if (runtime.orbit > 0 && !runtime.dragging) runtime.orbit = Math.max(0, runtime.orbit - dt);
	runtime.shake = Math.max(0, runtime.shake - dt * 1.5);
	runtime.flash = Math.max(0, runtime.flash - dt * 2.3);
	runtime.fade = Math.max(0, runtime.fade - dt * .8);
	runtime.hudAcc += dt;
	if (runtime.hudAcc > .12) {
		runtime.hudAcc = 0;
		pushHud(useGame.getState().save);
	}
	runtime.edge.light = false;
	runtime.edge.heavy = false;
	runtime.edge.dodge = false;
	runtime.elapsed += dt;
}
function stepExplore(dt) {
	if (runtime.override) {
		if (!runtime.overrideSnapped) {
			runtime.camYaw = runtime.player.yaw;
			runtime.overrideSnapped = true;
		}
	} else if (runtime.overrideSnapped) runtime.overrideSnapped = false;
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
	const moving = len > .08;
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
		if (runtime.foot > .46) {
			runtime.foot = 0;
			stepSound();
		}
	}
}
function separateFromPeople(save) {
	const people = peoplePoints(save);
	for (const p of people) {
		const dx = runtime.player.x - p.x;
		const dz = runtime.player.z - p.z;
		const d = Math.hypot(dx, dz);
		if (d < .72 && d > 1e-4) {
			const push = .72 - d;
			const slid = slide(runtime.player.x, runtime.player.z, dx / d * push, dz / d * push);
			runtime.player.x = slid.x;
			runtime.player.z = slid.z;
		}
	}
}
function peoplePoints(save) {
	const list = [];
	for (const id of Object.keys(NAMES)) {
		if (id === "adler") continue;
		const pose = actorPose(id, save, false);
		if (!pose) continue;
		list.push({
			id,
			x: pose.x,
			z: pose.z,
			label: labelFor(id, save)
		});
	}
	if (save.era === "present") {
		list.push({ ...SPOTS.train }, { ...SPOTS.study }, {
			...SPOTS.board,
			label: save.flags.dawn && save.flags.branch && !save.exhibit ? "Decide the winter exhibition" : SPOTS.board.label
		}, { ...SPOTS.ledger });
		if (save.flags.evening && !save.flags.dawn) list.push({ ...SPOTS.rest });
		if (save.flags.dawn && save.posture === "refuse" && !save.flags.branch) list.push({ ...SPOTS.letter });
		if (save.flags.dawn && save.posture === "stairs" && !save.flags.branch) list.push({
			id: "adler",
			x: QUAY_ADLER.x,
			z: QUAY_ADLER.z,
			label: "Speak with Ms Adler"
		});
		else if (save.visitor === "walking" || save.visitor === "waiting") list.push({
			id: "adler",
			x: ADLER_WAIT.x,
			z: runtime.adlerZ,
			label: "Speak with the woman at the gate"
		});
	}
	return list;
}
function labelFor(id, save) {
	if (save.era === "present" && save.flags.chapter && !save.flags.council && !save.flags.evening && (id === "lin" || id === "ren" || id === "sable" || id === "jonah")) return "The four are waiting";
	if (save.flags.council && !save.flags.evening && id === "hana") return "Close the hall with Hana";
	if (save.flags.dawn && save.flags.branch && save.exhibit && !save.flags.second && id === "hana") return "Ask Hana about the ninth";
	if (id === "hale") return "Receive Mr Hale";
	return `Speak with ${NAMES[id]}`;
}
function updatePrompt(save) {
	let best = null;
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
function pushHud(save) {
	const spar = runtime.spar;
	useGame.getState().setHud({
		prompt: runtime.promptLabel,
		promptId: runtime.promptId,
		place: placeAt(runtime.player.x, runtime.player.z),
		x: runtime.player.x,
		z: runtime.player.z,
		yaw: runtime.player.yaw,
		spar: spar && useGame.getState().phase === "spar" ? {
			php: spar.player.hp,
			pmax: spar.player.hpMax,
			pstam: spar.player.stam,
			pstamMax: spar.player.stamMax,
			rhp: spar.ren.hp,
			rmax: spar.ren.hpMax,
			time: spar.time,
			text: spar.text
		} : null
	});
}
function power(level) {
	return {
		light: 8 + level,
		heavy: 15 + level * 2
	};
}
function ensureSpar(level) {
	if (runtime.spar) return runtime.spar;
	runtime.spar = {
		player: fighter("player", level, 0, -12.15, 0, 96 + level * 6),
		ren: fighter("ren", 3, .15, -17.05, Math.PI, 114),
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
		renWait: .35,
		open: false,
		openTimer: 0,
		bufferLight: 0,
		bufferHeavy: 0,
		bufferDodge: 0
	};
	return runtime.spar;
}
function fighter(id, level, x, z, yaw, hp) {
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
		level
	};
}
function enter(f, state) {
	f.state = state;
	f.stateT = 0;
	f.didHit = false;
}
function faceToward(f, x, z) {
	f.yaw = Math.atan2(-(x - f.x), -(z - f.z));
}
function stepSpar(dt, save) {
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
				dodges: spar.dodges
			});
		}
		return;
	}
	spar.time += dt;
	spar.bufferLight = runtime.edge.light ? .16 : Math.max(0, spar.bufferLight - dt);
	spar.bufferHeavy = runtime.edge.heavy ? .16 : Math.max(0, spar.bufferHeavy - dt);
	spar.bufferDodge = runtime.edge.dodge ? .14 : Math.max(0, spar.bufferDodge - dt);
	const prevRen = spar.ren.state;
	stepRen(spar, dt);
	if ((prevRen === "light" || prevRen === "heavy") && spar.ren.state === "idle") {
		spar.renWait = prevRen === "heavy" ? .48 : .16;
		spar.renStep = (spar.renStep + 1) % 3;
		if (prevRen === "heavy") spar.openTimer = .36;
	}
	if (prevRen !== "heavy" && spar.ren.state === "heavy") {
		spar.text = spar.sawHeavy ? "The long windup. The opening is after his heel lands — if you are free to take it." : "Watch his weight. This strike is not the same as the jabs.";
		spar.sawHeavy = true;
	}
	stepHuman(spar.player, spar, dt, {
		moveF: axisForward(),
		moveR: axisRight(),
		light: spar.bufferLight > 0,
		heavy: spar.bufferHeavy > 0,
		dodge: spar.bufferDodge > 0,
		guard: runtime.hold.guard
	}, spar.ren);
	if (spar.player.state === "light" || spar.player.state === "heavy") {
		spar.bufferLight = 0;
		spar.bufferHeavy = 0;
	}
	if (spar.player.state === "dodge") spar.bufferDodge = 0;
	const specP = spar.player.state === "heavy" ? HEAVY : LIGHT;
	if (spar.player.state === "light" || spar.player.state === "heavy") tryHit(spar.player, spar.ren, specP, spar.player.state === "heavy" ? power(spar.player.level).heavy : power(spar.player.level).light, spar);
	const specR = spar.ren.state === "heavy" ? HEAVY : LIGHT;
	if (spar.ren.state === "light" || spar.ren.state === "heavy") tryHit(spar.ren, spar.player, specR, spar.ren.state === "heavy" ? power(3).heavy : power(3).light, spar);
	spar.open = spar.openTimer > 0 || spar.ren.state === "heavy" && spar.ren.stateT > HEAVY.wind + HEAVY.active;
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
function judge(spar) {
	if (spar.player.hp <= 0 && spar.ren.hp <= 0) return "draw";
	if (spar.player.hp <= 0) return "loss";
	if (spar.ren.hp <= 0) return "win";
	const pp = spar.player.hp / spar.player.hpMax;
	const rp = spar.ren.hp / spar.ren.hpMax;
	if (Math.abs(pp - rp) < .08) return "draw";
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
function stepRen(spar, dt) {
	const r = spar.ren;
	const p = spar.player;
	if (r.state === "down") return;
	if (r.state !== "idle" && r.state !== "block") {
		stepHuman(r, spar, dt, emptyWant(), p);
		return;
	}
	const dist = Math.hypot(p.x - r.x, p.z - r.z);
	if (p.state === "heavy" && p.stateT < .28 && dist < 2.35) {
		stepHuman(r, spar, dt, {
			...emptyWant(),
			guard: true
		}, p);
		return;
	}
	if (r.state === "block") {
		stepHuman(r, spar, dt, emptyWant(), p);
		return;
	}
	if (spar.renWait > 0) {
		spar.renWait -= dt;
		stepHuman(r, spar, dt, {
			...emptyWant(),
			moveF: dist > 1.7 ? 1 : 0
		}, p);
		return;
	}
	if (dist > 1.58) {
		stepHuman(r, spar, dt, {
			...emptyWant(),
			moveF: 1
		}, p);
		return;
	}
	const heavy = spar.renStep === 2;
	stepHuman(r, spar, dt, {
		...emptyWant(),
		heavy,
		light: !heavy
	}, p);
}
function emptyWant() {
	return {
		moveF: 0,
		moveR: 0,
		light: false,
		heavy: false,
		dodge: false,
		guard: false
	};
}
function stepHuman(f, spar, dt, want, other) {
	f.stateT += dt;
	const regen = f.state === "idle" ? 17 : f.state === "block" ? 4 : 7;
	f.stam = Math.min(f.stamMax, f.stam + regen * dt);
	if (f.state === "down" || f.state === "stun") {
		if (f.state === "stun" && f.stateT > .4) enter(f, "idle");
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
		if (f.stateT < .34) {
			f.x += f.dodgeX * dt;
			f.z += f.dodgeZ * dt;
		} else enter(f, "idle");
		return;
	}
	if (f.state === "block") {
		faceToward(f, other.x, other.z);
		if (!want.guard && f.stateT > .08) enter(f, "idle");
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
		const mf = want.moveF || -.3;
		const mr = want.moveR;
		const len = Math.hypot(mf, mr) || 1;
		f.dodgeX = (fx * mf + rx * mr) / len * 6.2;
		f.dodgeZ = (fz * mf + rz * mr) / len * 6.2;
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
	if ((want.light || want.heavy || want.dodge) && f.id === "player") spar.text = "Not enough breath for that. Drop the guard and wait half a second.";
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
function tryHit(a, b, spec, dmg, spar) {
	if (a.didHit) return;
	if (a.stateT < spec.wind || a.stateT > spec.wind + spec.active) return;
	const dx = b.x - a.x;
	const dz = b.z - a.z;
	const dist = Math.hypot(dx, dz);
	if (dist > spec.range + .28) return;
	const fx = -Math.sin(a.yaw);
	const fz = -Math.cos(a.yaw);
	if (dist > .05 && (dx * fx + dz * fz) / dist < .18) return;
	a.didHit = true;
	if (b.state === "dodge" && b.stateT > .04 && b.stateT < .22) {
		spar.text = b.id === "player" ? "You slipped it." : "He slipped it.";
		return;
	}
	const bfx = -Math.sin(b.yaw);
	const bfz = -Math.cos(b.yaw);
	const facing = dist < .05 || (-dx * bfx + -dz * bfz) / Math.max(dist, .05) > .1;
	let dealt = dmg;
	if (b.state === "block" && facing && b.stam > 6) {
		b.stam = Math.max(0, b.stam - 18);
		dealt = dmg * .16;
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
			if (spar.open) spar.text = "You took the opening. Seeing a counter and having the body for it are different. That was both.";
		}
	}
	b.hp = Math.max(0, b.hp - dealt);
	runtime.hitStop = .055;
	runtime.shake = b.id === "player" ? .2 : .12;
	runtime.flash = b.id === "player" ? .62 : .28;
	thud();
}
function separateFighters(spar) {
	const dx = spar.player.x - spar.ren.x;
	const dz = spar.player.z - spar.ren.z;
	const d = Math.hypot(dx, dz) || .001;
	if (d < .78) {
		const push = (.78 - d) / 2;
		spar.player.x += dx / d * push;
		spar.player.z += dz / d * push;
		spar.ren.x -= dx / d * push;
		spar.ren.z -= dz / d * push;
	}
}
function clampArena(f) {
	f.x = Math.max(-11.6, Math.min(11.6, f.x));
	f.z = Math.max(-20.15, Math.min(-10.4, f.z));
}
function collectVisuals() {
	const state = useGame.getState();
	const save = state.save;
	const phase = state.phase;
	const sparring = phase === "spar" && runtime.spar != null;
	const list = [];
	if (save) {
		const spar = runtime.spar;
		const fight = sparring && spar ? spar.player : null;
		const x = fight ? fight.x : runtime.player.x;
		const z = fight ? fight.z : runtime.player.z;
		const moving = fight ? fight.state === "idle" && (held("KeyW") || held("KeyA") || held("KeyS") || held("KeyD") || runtime.move.active) : runtime.player.speed > .35;
		list.push({
			id: "player",
			x,
			y: floorY(x, z),
			z,
			yaw: fight ? fight.yaw : runtime.player.yaw,
			visible: phase !== "title" && phase !== "create",
			action: fight ? fight.state === "idle" ? moving ? "walk" : "idle" : fight.state : moving ? "walk" : "idle",
			stateT: fight ? fight.stateT : 0,
			moving,
			label: save.profile.name
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
				action: f.state === "idle" ? moving ? "walk" : "idle" : f.state,
				stateT: f.stateT,
				moving,
				label: NAMES[id] ?? id
			});
			continue;
		}
		if (id === "adler") {
			const talking = phase === "talk" && state.talk?.id === "adler";
			if (!!save && save.flags.dawn && save.posture === "stairs" && !save.flags.branch || talking && save?.posture === "stairs" && save.flags.dawn) {
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
					label: "Ms Adler"
				});
				continue;
			}
			const visible = !!save && save.era === "present" && (save.visitor === "walking" || save.visitor === "waiting" || save.visitor === "met" && talking);
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
				label: "Ms Adler"
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
				label: NAMES[id] ?? id
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
			label: NAMES[id] ?? id
		});
	}
	return list;
}
var COLORS = {
	plaster: "#d7cfc3",
	timber: "#5a4032",
	stone: "#b7b1a7",
	dark: "#3a2e28",
	counter: "#6b4e39"
};
function createWorld(canvas, labelHost) {
	const renderer = new WebGLRenderer({
		canvas,
		antialias: true,
		alpha: false,
		powerPreference: "high-performance"
	});
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.toneMapping = 4;
	renderer.toneMappingExposure = 1.05;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = 2;
	renderer.setClearColor("#cbbba8");
	const scene = new Scene();
	scene.fog = new Fog("#d9cbb8", 18, 62);
	const camera = new PerspectiveCamera(46, 1, .12, 140);
	const sky = new ShaderMaterial({
		side: 1,
		depthWrite: false,
		uniforms: {
			top: { value: new Color("#8ea0b0") },
			horizon: { value: new Color("#eadccb") },
			bottom: { value: new Color("#d5c4ae") }
		},
		vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
		fragmentShader: `varying vec3 vP; uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom;
      void main(){
        float h = normalize(vP).y;
        vec3 c = mix(horizon, top, smoothstep(0.0, 0.62, h));
        c = mix(bottom, c, smoothstep(-0.25, 0.08, h));
        gl_FragColor = vec4(c, 1.0);
      }`
	});
	const dome = new Mesh(new SphereGeometry(80, 20, 14), sky);
	scene.add(dome);
	const hemi = new HemisphereLight("#f3e6d4", "#6d6458", .72);
	scene.add(hemi);
	const sun = new DirectionalLight("#ffe0bf", 2.35);
	sun.position.set(14, 24, 10);
	sun.castShadow = true;
	sun.shadow.mapSize.set(2048, 2048);
	sun.shadow.bias = -25e-5;
	sun.shadow.normalBias = .04;
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
	const street = canvasMaterial((g, w, h) => {
		g.fillStyle = "#a79f94";
		g.fillRect(0, 0, w, h);
		g.strokeStyle = "rgba(70,60,50,0.35)";
		for (let y = 0; y < h; y += 28) {
			g.strokeRect(0, y, w, 28);
			for (let x = y / 28 % 2 === 0 ? 0 : 22; x < w; x += 44) g.strokeRect(x, y, 44, 28);
		}
		speck(g, w, h, .08, 1800);
	}, 256, 256, [18, 18]);
	const ground = new Mesh(new PlaneGeometry(90, 90), street);
	ground.rotation.x = -Math.PI / 2;
	ground.receiveShadow = true;
	scene.add(ground);
	addFloor(scene, -10.1, 10.1, -8.9, 12.35, .02, canvasMaterial((g, w, h) => {
		g.fillStyle = "#cfc6b8";
		g.fillRect(0, 0, w, h);
		for (let i = 0; i < 40; i++) {
			g.strokeStyle = "rgba(80,70,60,0.28)";
			g.strokeRect(Math.random() * w, Math.random() * h, 30 + Math.random() * 40, 18 + Math.random() * 20);
		}
		speck(g, w, h, .07, 900);
	}, 256, 256, [4, 5]));
	const wood = canvasMaterial((g, w, h) => {
		g.fillStyle = "#8a6548";
		g.fillRect(0, 0, w, h);
		for (let y = 0; y < h; y += 18) {
			g.fillStyle = y % 36 === 0 ? "#7b5a40" : "#946c4e";
			g.fillRect(0, y, w, 17);
			g.fillStyle = "rgba(40,24,12,0.15)";
			g.fillRect(0, y + 16, w, 2);
		}
		speck(g, w, h, .06, 500);
	}, 256, 256, [3, 4], .78);
	addFloor(scene, -14.55, 14.55, -21.1, -8.7, .04, wood);
	addFloor(scene, -21.8, -10.4, -5.8, 11.8, .04, wood);
	addFloor(scene, 10.4, 21.8, -5.8, 11.8, .04, wood);
	const mats = {
		plaster: canvasMaterial((g, w, h) => {
			g.fillStyle = COLORS.plaster;
			g.fillRect(0, 0, w, h);
			speck(g, w, h, .05, 1200);
		}, 128, 128, [1, 1], .92),
		timber: canvasMaterial((g, w, h) => {
			g.fillStyle = COLORS.timber;
			g.fillRect(0, 0, w, h);
			g.strokeStyle = "rgba(0,0,0,0.18)";
			for (let x = 0; x < w; x += 16) g.strokeRect(x, 0, 16, h);
			speck(g, w, h, .08, 400);
		}, 128, 128, [1, 1], .8),
		stone: canvasMaterial((g, w, h) => {
			g.fillStyle = COLORS.stone;
			g.fillRect(0, 0, w, h);
			g.strokeStyle = "rgba(60,50,40,0.35)";
			for (let y = 0; y < h; y += 22) g.strokeRect(0, y, w, 22);
			speck(g, w, h, .07, 400);
		}, 128, 128, [1, 1], .95),
		dark: std(COLORS.dark, { rough: .9 }),
		counter: std(COLORS.counter, { rough: .75 })
	};
	for (const block of BLOCKS) {
		const mesh = new Mesh(new BoxGeometry(block.w, block.h, block.d), mats[block.mat]);
		mesh.position.set(block.x, block.h / 2, block.z);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add(mesh);
	}
	roof(scene, -16.2, 16.2, -22.1, -8.4, 4.45, 6.5, std("#6e3b34", {
		rough: .86,
		side: 2
	}));
	roof(scene, -22.5, -9.85, -6.45, 12.45, 3.7, 5.35, std("#6a403c", {
		rough: .88,
		side: 2
	}));
	roof(scene, 9.85, 22.5, -6.45, 12.45, 3.7, 5.35, std("#6a403c", {
		rough: .88,
		side: 2
	}));
	roof(scene, 11.2, 19.5, 18.7, 24.1, 4.25, 5.5, std("#6e4a42", {
		rough: .9,
		side: 2
	}));
	addWindows(scene);
	addProps(scene);
	const lanterns = addLanterns(scene);
	const sign = labelTexture("ASHPINE", "tea · herbs · hall");
	const board = new Mesh(new PlaneGeometry(3.2, .85), new MeshStandardMaterial({
		map: sign,
		roughness: .7
	}));
	board.position.set(0, 2.15, 12.45);
	scene.add(board);
	const shopSign = new Mesh(new PlaneGeometry(2.4, .62), new MeshStandardMaterial({
		map: labelTexture("TRADING FLOOR", "open at seven"),
		roughness: .7
	}));
	shopSign.position.set(9.82, 2.7, 6);
	shopSign.rotation.y = -Math.PI / 2;
	scene.add(shopSign);
	const pell = new Mesh(new PlaneGeometry(2.2, .5), new MeshStandardMaterial({
		map: labelTexture("PELL'S", "teas"),
		roughness: .75
	}));
	pell.position.set(15.3, 3.1, 18.5);
	scene.add(pell);
	const notice = new Mesh(new PlaneGeometry(.9, 1.15), new MeshStandardMaterial({
		map: labelTexture("CIRCUIT", "winter list"),
		roughness: .8
	}));
	notice.position.set(5.6, 1.35, 13.95);
	scene.add(notice);
	const rigs = /* @__PURE__ */ new Map();
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
	const rebuildPlayer = (profile) => {
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
				const mesh = obj;
				if (mesh.geometry) mesh.geometry.dispose();
			});
			disposeMaterials();
			sky.dispose();
		}
	};
}
function addFloor(scene, x0, x1, z0, z1, y, mat) {
	const mesh = new Mesh(new PlaneGeometry(x1 - x0, z1 - z0), mat);
	mesh.rotation.x = -Math.PI / 2;
	mesh.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
	mesh.receiveShadow = true;
	scene.add(mesh);
}
function roof(scene, x0, x1, z0, z1, eave, peak, mat) {
	const mid = (z0 + z1) / 2;
	const positions = new Float32Array([
		x0,
		eave,
		z0,
		x1,
		eave,
		z0,
		x1,
		peak,
		mid,
		x0,
		eave,
		z0,
		x1,
		peak,
		mid,
		x0,
		peak,
		mid,
		x0,
		eave,
		z1,
		x0,
		peak,
		mid,
		x1,
		peak,
		mid,
		x0,
		eave,
		z1,
		x1,
		peak,
		mid,
		x1,
		eave,
		z1
	]);
	const geo = new BufferGeometry();
	geo.setAttribute("position", new BufferAttribute(positions, 3));
	geo.computeVertexNormals();
	const mesh = new Mesh(geo, mat);
	mesh.castShadow = true;
	mesh.receiveShadow = true;
	scene.add(mesh);
}
function addWindows(scene) {
	const frame = std("#3a302a", { rough: .6 });
	const glass = std("#b7c6c8", {
		rough: .12,
		metal: .15,
		opacity: .38
	});
	const lamp = std("#14352c", {
		emissive: "#8ed7b4",
		ei: .9,
		rough: .4
	});
	const spots = [
		{
			x: -9.85,
			z: 3.2,
			rot: Math.PI / 2
		},
		{
			x: -9.85,
			z: 8.4,
			rot: Math.PI / 2
		},
		{
			x: 9.85,
			z: 4.2,
			rot: -Math.PI / 2
		},
		{
			x: 9.85,
			z: 8.8,
			rot: -Math.PI / 2
		},
		{
			x: 9.85,
			z: -2.4,
			rot: -Math.PI / 2
		},
		{
			x: -21.8,
			z: 4,
			rot: -Math.PI / 2
		},
		{
			x: 21.8,
			z: 4,
			rot: Math.PI / 2
		}
	];
	for (const spot of spots) {
		const g = new Group();
		const f = new Mesh(new BoxGeometry(.08, 1.15, .85), frame);
		const pane = new Mesh(new BoxGeometry(.05, .95, .65), glass);
		pane.position.x = .02;
		g.add(f, pane);
		g.position.set(spot.x, 1.7, spot.z);
		g.rotation.y = spot.rot;
		scene.add(g);
	}
	const study = new Mesh(new BoxGeometry(.08, 1.15, .9), lamp);
	study.position.set(-9.88, 1.65, -3.3);
	scene.add(study);
	const glow = new PointLight("#9ddec0", 8, 6, 2);
	glow.position.set(-12.2, 1.7, -3.3);
	scene.add(glow);
}
function addProps(scene) {
	const brass = std("#c6a15b", {
		rough: .45,
		metal: .45
	});
	const ring = new Mesh(new TorusGeometry(.85, .035, 8, 28), brass);
	ring.rotation.x = Math.PI / 2;
	ring.position.set(-.5, .07, -16.5);
	scene.add(ring);
	tree(scene, -3.55, -1.15, "ash");
	tree(scene, 4.15, .45, "pine");
	const bannerMat = std("#8f2f22", { rough: .7 });
	const banner = new Mesh(new PlaneGeometry(.7, 1.4), bannerMat);
	banner.position.set(-6.2, 2.2, -8.95);
	scene.add(banner);
	const banner2 = banner.clone();
	banner2.position.set(6.2, 2.2, -8.95);
	scene.add(banner2);
	const staffMat = std("#c2a27a", { rough: .7 });
	for (let i = 0; i < 4; i++) {
		const staff = new Mesh(new CylinderGeometry(.025, .03, 1.7, 6), staffMat);
		staff.position.set(-12.6, .9, -14 - i * .35);
		staff.rotation.z = .15;
		staff.castShadow = true;
		scene.add(staff);
	}
	bike(scene, -4.2, 13.7);
	const crateMat = std("#7a5a3a", { rough: .86 });
	for (const [x, z] of [[12.2, 10.6], [13.1, 10.4]]) {
		const crate = new Mesh(new BoxGeometry(.55, .4, .45), crateMat);
		crate.position.set(x, .24, z);
		crate.castShadow = true;
		scene.add(crate);
	}
	const tin = std("#8d8a84", {
		rough: .4,
		metal: .55
	});
	for (let i = 0; i < 5; i++) {
		const can = new Mesh(new CylinderGeometry(.1, .1, .22, 8), tin);
		can.position.set(16.2 + i % 3 * .28, 1.18, 8.4 + Math.floor(i / 3) * .28);
		scene.add(can);
	}
}
function tree(scene, x, z, kind) {
	const trunk = new Mesh(new CylinderGeometry(.16, .22, 1.7, 7), std("#5a4638", { rough: .9 }));
	trunk.position.set(x, .85, z);
	trunk.castShadow = true;
	scene.add(trunk);
	if (kind === "pine") {
		const leaf = std("#2e4634", { rough: .9 });
		for (let i = 0; i < 3; i++) {
			const cone = new Mesh(new ConeGeometry(1.15 - i * .28, 1.15, 8), leaf);
			cone.position.set(x, 2.1 + i * .72, z);
			cone.castShadow = true;
			scene.add(cone);
		}
	} else {
		const leaf = std("#6d7d58", { rough: .92 });
		for (const offset of [
			[
				0,
				2.5,
				0
			],
			[
				-.45,
				2.2,
				.2
			],
			[
				.4,
				2.3,
				-.25
			]
		]) {
			const ball = new Mesh(new IcosahedronGeometry(.85, 1), leaf);
			ball.position.set(x + offset[0], offset[1], z + offset[2]);
			ball.castShadow = true;
			scene.add(ball);
		}
	}
}
function bike(scene, x, z) {
	const g = new Group();
	const metal = std("#3e4650", {
		rough: .4,
		metal: .6
	});
	for (const wz of [-.48, .48]) {
		const wheel = new Mesh(new TorusGeometry(.28, .02, 6, 14), metal);
		wheel.position.set(0, .28, wz);
		wheel.rotation.y = Math.PI / 2;
		g.add(wheel);
	}
	const frame = new Mesh(new BoxGeometry(.06, .06, .9), metal);
	frame.position.y = .42;
	g.add(frame);
	g.position.set(x, 0, z);
	g.rotation.y = .4;
	scene.add(g);
}
function addLanterns(scene) {
	const lights = [];
	const spots = [
		[-6.5, -6.5],
		[6.5, -6.5],
		[-6.5, 8],
		[6.5, 8],
		[0, -12]
	];
	const paper = std("#e7b07a", {
		emissive: "#ff9a4a",
		ei: .8,
		rough: .5
	});
	const post = std("#3a302a", { rough: .8 });
	for (const [x, z] of spots) {
		const pole = new Mesh(new CylinderGeometry(.04, .05, 2.1, 6), post);
		pole.position.set(x, 1.05, z);
		pole.castShadow = true;
		scene.add(pole);
		const lamp = new Mesh(new BoxGeometry(.22, .3, .22), paper);
		lamp.position.set(x, 2.15, z);
		scene.add(lamp);
		const light = new PointLight("#ff9a4a", 10, 7.5, 2);
		light.position.set(x, 2.15, z);
		scene.add(light);
		lights.push(light);
	}
	const bulb = new PointLight("#ffe0c2", 14, 9, 2);
	bulb.position.set(16, 2.4, 6);
	scene.add(bulb);
	lights.push(bulb);
	const office = new PointLight("#ffe0c2", 10, 7, 2);
	office.position.set(16.5, 2.3, -2);
	scene.add(office);
	lights.push(office);
	return lights;
}
function labelTexture(title, sub) {
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
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function applyMood(world, era, night) {
	if (night) {
		world.sky.uniforms.top.value.set("#1c2836");
		world.sky.uniforms.horizon.value.set("#6d5344");
		world.sky.uniforms.bottom.value.set("#2a211c");
		world.sun.color.set("#ffb07a");
		world.sun.intensity = .38;
		world.sun.position.set(-16, 8, 6);
		if (world.scene.fog instanceof Fog) {
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
	if (world.scene.fog instanceof Fog) {
		world.scene.fog.color.set(dusk ? "#c9aa90" : "#d9cbb8");
		world.scene.fog.near = dusk ? 12 : 18;
		world.scene.fog.far = 62;
	}
	world.renderer.setClearColor("#cbbba8");
}
function GameCanvas() {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !canvas) return;
		installProbe();
		useGame.getState().boot();
		let world;
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
		const onKeyDown = (event) => {
			const target = event.target;
			if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
			runtime.keys.add(event.code);
			if ([
				"Space",
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight",
				"Tab"
			].includes(event.code)) event.preventDefault();
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
		const onKeyUp = (event) => {
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
		const onPointerDown = (event) => {
			if (event.button !== 0) return;
			runtime.dragging = true;
			dragX = event.clientX;
			dragY = event.clientY;
			canvas.setPointerCapture(event.pointerId);
			unlockAudio();
		};
		const onPointerMove = (event) => {
			if (!runtime.dragging) return;
			const dx = event.clientX - dragX;
			const dy = event.clientY - dragY;
			dragX = event.clientX;
			dragY = event.clientY;
			runtime.camYaw -= dx * .005;
			runtime.camPitch = Math.max(.16, Math.min(.72, runtime.camPitch - dy * .003));
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
		const frame = (now) => {
			if (document.hidden) {
				last = now;
				raf = requestAnimationFrame(frame);
				return;
			}
			const delta = Math.min(.05, (now - last) / 1e3);
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
				if (snap.save) runtime.fade = Math.max(runtime.fade, .85);
			}
			const key = snap.save ? `${snap.save.profile.name}|${snap.save.profile.presentation}|${snap.save.profile.complexion}` : "";
			if (key && key !== profileKey) {
				profileKey = key;
				world.rebuildPlayer(snap.save.profile);
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
			if (flash) flash.style.opacity = String(Math.min(.7, runtime.flash));
			for (const light of world.lanterns) light.intensity = 9 + Math.sin(runtime.elapsed * 3 + light.position.x) * .8;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapRef,
		className: "absolute inset-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "h-full w-full touch-none"
		})
	});
}
function placeCamera(world, phase) {
	const shake = runtime.shake;
	const sx = (Math.random() - .5) * shake;
	const sy = (Math.random() - .5) * shake * .5;
	if (phase === "spar" && runtime.spar && !runtime.override && runtime.spar) {
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
	if ((phase === "title" || phase === "create") && !runtime.override) {
		const ang = .5 + Math.sin(runtime.elapsed * .12) * .2;
		world.camera.position.set(Math.sin(ang) * 12.5, 4.6, 9 + Math.cos(ang) * 1.6);
		world.camera.lookAt(0, 1.4, .4);
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
function pullCamera(px, pz, cx, cz) {
	let lastX = px;
	let lastZ = pz;
	const steps = 12;
	for (let i = 1; i <= steps; i++) {
		const x = px + (cx - px) * i / steps;
		const z = pz + (cz - pz) * i / steps;
		if (runtime.colliders.some((b) => x > b.minX - .2 && x < b.maxX + .2 && z > b.minZ - .2 && z < b.maxZ + .2)) return {
			x: lastX,
			z: lastZ
		};
		lastX = x;
		lastZ = z;
	}
	return {
		x: cx,
		z: cz
	};
}
var primary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-fg";
var ghost = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface-2 px-4 py-2 text-sm font-medium text-fg";
function GameApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "game-root relative w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "vignette pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "world-fade",
				className: "pointer-events-none absolute inset-0 bg-bg opacity-0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "hit-flash",
				className: "pointer-events-none absolute inset-0 bg-primary opacity-0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Create, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handover, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Talk, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ledger, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Train, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspect, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Result, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Epilogue, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PauseMenu, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchControls, {})
		]
	});
}
function Title() {
	const phase = useGame((s) => s.phase);
	const hasSave = useGame((s) => s.hasSave);
	if (phase !== "title") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-xl p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-brass",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-11 place-items-center rounded-full border border-brass font-display text-xl",
						children: "A"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-[0.28em] uppercase",
						children: "Lantern Ward"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-5xl font-medium sm:text-7xl",
					children: "Ashpine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-xl text-muted italic",
					children: "A house, a hall, and a man who did not come back."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-lg text-sm leading-relaxed text-muted",
					children: "Five friends have kept a trading house and a training hall standing for six months. This morning the invoices, the floor, and a locked study all want an answer. The hidden world can wait until you notice it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: primary,
						onClick: () => useGame.getState().startOrContinue(),
						children: "Start"
					}), hasSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: ghost,
						onClick: () => useGame.getState().newStory(),
						children: "New story"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs leading-relaxed text-muted",
					children: [hasSave ? "Start returns you to the same minute you left. " : "", "The house waits. Nothing here advances while you are away."]
				})
			]
		})
	});
}
function Create() {
	const phase = useGame((s) => s.phase);
	const [name, setName] = (0, import_react.useState)("");
	const [presentation, setPresentation] = (0, import_react.useState)("plain");
	const [pronouns, setPronouns] = (0, import_react.useState)("they");
	const [complexion, setComplexion] = (0, import_react.useState)(1);
	if (phase !== "create") return null;
	const choosePresentation = (next) => {
		setPresentation(next);
		setPronouns(next === "tailored" ? "he" : next === "soft" ? "she" : "they");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "panel w-full max-w-xl p-6 sm:p-8",
			onSubmit: (event) => {
				event.preventDefault();
				const clean = name.trim().slice(0, 18);
				if (clean.length < 2) return;
				useGame.getState().confirmProfile({
					name: clean,
					presentation,
					pronouns,
					complexion
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-brass uppercase",
					children: "Who carries the seal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl",
					children: "You are nineteen. They already call you Captain."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mt-5 block text-sm text-muted",
					htmlFor: "captain-name",
					children: "Name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "captain-name",
					value: name,
					onChange: (event) => setName(event.target.value),
					maxLength: 18,
					autoComplete: "off",
					placeholder: "Your name",
					className: "mt-2 w-full rounded-xl border border-line bg-bg px-3 py-3 text-fg select-text outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted",
					children: "Presentation. It changes your coat and hair, not your rank."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-2 sm:grid-cols-3",
					children: [
						[
							"plain",
							"Plain",
							"Work jacket, jaw-length hair"
						],
						[
							"tailored",
							"Tailored",
							"Sharper coat, short hair"
						],
						[
							"soft",
							"Soft",
							"Longer coat, hair down"
						]
					].map(([id, label, detail]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => choosePresentation(id),
						className: `min-h-11 rounded-xl border px-3 py-3 text-left ${presentation === id ? "border-brass bg-surface-2" : "border-line bg-bg"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-muted",
							children: detail
						})]
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Narration pronouns"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						"they",
						"she",
						"he"
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: pronouns === p ? primary : ghost,
						onClick: () => setPronouns(p),
						children: p === "they" ? "they" : p === "she" ? "she" : "he"
					}, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Complexion"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex gap-2",
					children: [
						0,
						1,
						2,
						3
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": `Complexion ${n + 1}`,
						onClick: () => setComplexion(n),
						className: `size-11 rounded-full border-2 ${complexion === n ? "border-brass" : "border-line"} ${[
							"bg-skin-0",
							"bg-skin-1",
							"bg-skin-2",
							"bg-skin-3"
						][n]}`
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: primary,
						type: "submit",
						disabled: name.trim().length < 2,
						children: "Enter the courtyard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: ghost,
						type: "button",
						onClick: () => useGame.getState().toTitle(),
						children: "Back"
					})]
				})
			]
		})
	});
}
function Handover() {
	if (useGame((s) => s.phase) !== "handover") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-lg p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-brass uppercase",
					children: "Six months later"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-4xl",
					children: "Thursday morning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: "The papers were already in your name. Payroll was met. The hall opened every dawn. He did not come back, and the usual hour became a habit of looking at the door."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${primary} mt-6`,
					onClick: () => useGame.getState().beginPresent(),
					children: "Open the house"
				})
			]
		})
	});
}
function Hud() {
	const phase = useGame((s) => s.phase);
	const save = useGame((s) => s.save);
	const hud = useGame((s) => s.hud);
	const toast = useGame((s) => s.toast);
	const touch = useTouchLayout();
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const id = window.setTimeout(() => useGame.setState({ toast: null }), 4600);
		return () => window.clearTimeout(id);
	}, [toast]);
	if (!save || phase === "title" || phase === "create" || phase === "handover" || phase === "epilogue") return null;
	const goals = objectives(save);
	const showExplore = phase === "play" || phase === "flashback" || phase === "spar";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 z-10",
		children: [
			toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-3 left-1/2 w-[min(92vw,34rem)] -translate-x-1/2 rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed",
				children: toast
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-3 left-3 max-w-[70vw] sm:max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-surface/90 px-3 py-2 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.16em] text-brass uppercase",
						children: save.era === "flashback" ? "Six months ago · dusk" : `${formatMinute(save.minute)} · month six`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl leading-tight",
						children: hud.place
					})]
				}), phase !== "spar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1 rounded-xl border border-line bg-surface/90 p-3 text-sm backdrop-blur-sm",
					children: goals.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: goal.done ? "text-muted line-through" : "text-fg",
						children: goal.text
					}, goal.id))
				}) : null]
			}),
			phase !== "spar" && !touch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute right-3 bottom-3 hidden rounded-xl border border-line bg-surface/90 p-2 sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniMap, {})
			}) : null,
			showExplore && hud.prompt && phase !== "spar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-6 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${primary} pointer-events-auto w-full`,
					onClick: () => runtime.edge.interact = true,
					children: hud.prompt
				})
			}) : null,
			phase === "spar" && hud.spar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparHud, {}) : null,
			showExplore ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-3 right-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${ghost} pointer-events-auto size-11 px-0`,
					"aria-label": "Pause",
					onClick: () => useGame.getState().togglePause(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" })
				}), save.era === "present" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${ghost} pointer-events-auto size-11 px-0`,
					"aria-label": "Ledger",
					onClick: () => useGame.getState().openLedger(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-5" })
				}) : null]
			}) : null,
			save.era === "flashback" && phase === "flashback" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `${ghost} pointer-events-auto absolute bottom-6 left-3`,
				onClick: () => useGame.getState().beginPresent(),
				children: "Skip to this morning"
			}) : null
		]
	});
}
function SparHud() {
	const spar = useGame((s) => s.hud.spar);
	const level = useGame((s) => s.save?.martialLevel ?? 2);
	if (!spar) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute right-3 bottom-24 left-3 sm:bottom-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none mx-auto w-full max-w-3xl rounded-xl border border-line bg-surface/90 p-3 backdrop-blur-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 text-xs tracking-[0.14em] uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["You · Martial ", level] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [Math.max(0, 70 - Math.floor(spar.time)), "s"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ren · Martial 3" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "Composure",
						value: spar.php,
						max: spar.pmax
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						label: "His composure",
						value: spar.rhp,
						max: spar.rmax,
						align: "right"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: "Breath",
					value: spar.pstam,
					max: spar.pstamMax
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed",
					children: spar.text
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto mx-auto mt-2 flex max-w-3xl flex-wrap justify-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FightButton, {
					label: "Light",
					hint: "J",
					onPress: () => runtime.edge.light = true,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FightButton, {
					label: "Heavy",
					hint: "K",
					onPress: () => runtime.edge.heavy = true,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FightButton, {
					label: "Dodge",
					hint: "Space",
					onPress: () => runtime.edge.dodge = true,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FightButton, {
					label: "Guard",
					hint: "F",
					hold: true,
					onPress: () => runtime.hold.guard = true,
					onRelease: () => runtime.hold.guard = false,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" })
				})
			]
		})]
	});
}
function FightButton({ label, hint, onPress, onRelease, hold, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: `${ghost} min-w-20 flex-1`,
		onPointerDown: (event) => {
			event.preventDefault();
			onPress();
		},
		onPointerUp: () => onRelease?.(),
		onPointerLeave: () => hold && onRelease?.(),
		children: [
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: hint
			})
		]
	});
}
function Bar({ label, value, max, align }) {
	const pct = Math.max(0, Math.min(100, value / Math.max(1, max) * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: align === "right" ? "text-right" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex justify-between text-[11px] tracking-wide text-muted uppercase",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.ceil(value) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-2 overflow-hidden rounded-full bg-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full bg-primary",
				style: { width: `${pct}%` }
			})
		})]
	});
}
function MiniMap() {
	const hud = useGame((s) => s.hud);
	if (!useGame((s) => s.save)) return null;
	const fx = -Math.sin(hud.yaw);
	const fz = -Math.cos(hud.yaw);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "-24 -24 50 56",
		className: "h-36 w-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "-22",
				y: "-21",
				width: "30",
				height: "13",
				fill: "#3a302a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "-22",
				y: "-6",
				width: "12",
				height: "18",
				fill: "#d7cfc3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10",
				y: "-6",
				width: "12",
				height: "18",
				fill: "#d7cfc3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "-10",
				y: "-9",
				width: "20",
				height: "21",
				fill: "#cfc6b8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "11",
				y: "18",
				width: "8",
				height: "6",
				fill: "#d7cfc3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: hud.x,
				cy: hud.z,
				r: "1.1",
				fill: "#c4452d"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: hud.x,
				y1: hud.z,
				x2: hud.x + fx * 2.4,
				y2: hud.z + fz * 2.4,
				stroke: "#f3eadf",
				strokeWidth: "0.4"
			})
		]
	});
}
function Talk() {
	const phase = useGame((s) => s.phase);
	const talk = useGame((s) => s.talk);
	if (phase !== "talk" || !talk) return null;
	const node = talk.script.nodes[talk.node];
	if (!node) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-x-0 bottom-0 z-20 p-3 sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel mx-auto max-h-96 w-full max-w-3xl overflow-y-auto p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-brass",
					children: node.speaker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base leading-relaxed",
					children: node.text
				}),
				node.choices?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: node.choices.map((choice, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `${ghost} justify-start text-left`,
						onClick: () => useGame.getState().pick(index),
						children: choice.label
					}, choice.label))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${primary} mt-4`,
					onClick: () => useGame.getState().advance(),
					children: "Continue"
				})
			]
		})
	});
}
function Ledger() {
	const phase = useGame((s) => s.phase);
	const save = useGame((s) => s.save);
	const [pick, setPick] = (0, import_react.useState)(null);
	if (phase !== "ledger" || !save) return null;
	const book = economy(save.decision);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel max-h-[90vh] w-full max-w-3xl overflow-y-auto p-5 sm:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.2em] text-brass uppercase",
						children: "House ledger"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl",
						children: "This week, before Gao"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: ghost,
						onClick: () => useGame.getState().closePanel(),
						children: "Close"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Cash",
							value: pounds(save.cash)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Trade",
							value: pounds(book.trade)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Tuition",
							value: pounds(book.tuition)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Wages",
							value: pounds(book.wages)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Upkeep",
							value: pounds(book.upkeep)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Supply",
							value: save.decision ? pounds(book.supply) : "Unsettled"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Students on the book: 22. Hana teaches. The four of you still draw no wage. Projected week after supply: ",
						pounds(book.net),
						" if the trade number holds."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-xl border border-line bg-bg p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-brass uppercase",
						children: "Irregular"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed",
						children: "P. Meridian holding. Quarterly, marked personal, stopped the month Shen left. Iris has not written to the bank."
					})]
				}),
				save.decision ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed",
					children: "The morning's supply is already chosen. Live with it long enough to see who notices."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3",
					children: [[
						{
							id: "pay",
							title: "Pay Gao's increase",
							body: "£2,860 now. The shelf tastes the same. Supplier trust stays. The week stays thin."
						},
						{
							id: "exclusive",
							title: "Old price, exclusive season",
							body: "£2,200, and you don't buy this root elsewhere until spring. Jonah's way. The harvest becomes your risk."
						},
						{
							id: "dock",
							title: "Buy the dock blend",
							body: "£1,400. Tomas will not pretend. Expect trade to fall toward £5,400 once regulars notice."
						}
					].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `rounded-xl border p-4 text-left ${pick === option.id ? "border-brass bg-surface-2" : "border-line bg-bg"}`,
						onClick: () => setPick(option.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: option.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm leading-relaxed text-muted",
							children: option.body
						})]
					}, option.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: primary,
						disabled: !pick,
						onClick: () => pick && useGame.getState().chooseSupply(pick),
						children: "Record this choice"
					})]
				})
			]
		})
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-bg px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-[0.14em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl",
			children: value
		})]
	});
}
function Train() {
	const phase = useGame((s) => s.phase);
	const sessions = useGame((s) => s.save?.trainSessions ?? 0);
	const [view, setView] = (0, import_react.useState)({
		beat: "inhale",
		t: 0,
		round: 0,
		note: "Do not press."
	});
	const done = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (phase !== "train") {
			done.current = false;
			return;
		}
		done.current = false;
		const session = sessions + 1;
		let perfect = 0;
		let good = 0;
		let spoiled = false;
		let beat = "inhale";
		let t = 0;
		let round = 0;
		let last = performance.now();
		let raf = 0;
		const lengths = {
			inhale: 2.15,
			hold: 1.35,
			strike: 1.05
		};
		const finishRound = (hit) => {
			if (spoiled || hit === "miss") {} else if (hit === "perfect") perfect += 1;
			else good += 1;
			spoiled = false;
			round += 1;
			beat = "inhale";
			t = 0;
			if (round >= 4 && !done.current) {
				done.current = true;
				useGame.getState().finishTraining(session, perfect, good);
			}
		};
		const onKey = (event) => {
			if (event.code !== "Space" && event.code !== "KeyJ") return;
			event.preventDefault();
			press();
		};
		const press = () => {
			if (done.current) return;
			if (beat !== "strike") {
				spoiled = true;
				setView((v) => ({
					...v,
					note: "Too soon. The hand waits for the end of the breath."
				}));
				return;
			}
			const perfectWindow = t > lengths.strike - .4;
			finishRound(perfectWindow ? "perfect" : "good");
			setView({
				beat: "inhale",
				t: 0,
				round,
				note: perfectWindow ? "Settled." : "Early, but it was the strike."
			});
		};
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			if (!done.current) {
				t += dt;
				if (t >= lengths[beat]) {
					if (beat === "strike") finishRound(spoiled ? "miss" : "miss");
					else {
						beat = beat === "inhale" ? "hold" : "strike";
						t = 0;
						spoiled = false;
					}
				}
				setView({
					beat,
					t,
					round,
					note: beat === "inhale" ? "Inhale. Do not press." : beat === "hold" ? "Hold. Still no hand." : "Strike — the last of the breath."
				});
			}
			raf = requestAnimationFrame(loop);
		};
		window.addEventListener("keydown", onKey);
		raf = requestAnimationFrame(loop);
		const api = { press };
		window.__ashpineStrike = () => api.press();
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("keydown", onKey);
		};
	}, [phase, sessions]);
	if (phase !== "train") return null;
	const pct = Math.min(100, view.t / {
		inhale: 2.15,
		hold: 1.35,
		strike: 1.05
	}[view.beat] * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-lg p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.2em] text-brass uppercase",
					children: "Ash Breath"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-4xl capitalize",
					children: view.beat
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: view.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						"Four counts, shortened. Round ",
						Math.min(view.round + 1, 4),
						" of 4."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-2 overflow-hidden rounded-full bg-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-full ${view.beat === "strike" ? "bg-primary" : "bg-brass"}`,
						style: { width: `${pct}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${primary} mt-5 w-full`,
					onClick: () => window.__ashpineStrike?.(),
					children: "Strike"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${ghost} mt-2 w-full`,
					onClick: () => useGame.getState().closePanel(),
					children: "Leave the ring"
				})
			]
		})
	});
}
function Inspect() {
	const phase = useGame((s) => s.phase);
	const inspect = useGame((s) => s.inspect);
	if (phase !== "inspect" || !inspect) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-lg p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-brass",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.18em] uppercase",
						children: inspect.title
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed",
					children: inspect.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${primary} mt-5`,
					onClick: () => useGame.getState().closeInspect(),
					children: "Step back"
				})
			]
		})
	});
}
function Epilogue() {
	const phase = useGame((s) => s.phase);
	const save = useGame((s) => s.save);
	if (phase !== "epilogue" || !save) return null;
	const notes = save.flags.second && !save.flags.arcSeen ? arcNotes(save) : closingNotes(save);
	const chapterTwo = save.flags.second && !save.flags.arcSeen;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center overflow-y-auto p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel max-h-[92vh] w-full max-w-xl overflow-y-auto p-6 sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-brass uppercase",
					children: chapterTwo ? "Chapter two" : "Chapter one"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-5xl",
					children: chapterTwo ? "The ninth is a door" : "The lamp is still on"
				}),
				notes.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: paragraph
				}, paragraph)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [
						save.flags.second ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: primary,
							onClick: () => useGame.getState().stayEvening(),
							children: "Keep Friday"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: primary,
							onClick: () => useGame.getState().beginDawn(),
							children: "Sleep until the house opens"
						}),
						chapterTwo ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: ghost,
							onClick: () => useGame.getState().stayEvening(),
							children: "Walk the yard tonight"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: ghost,
							onClick: () => {
								useGame.getState().stayEvening();
								useGame.getState().toTitle();
							},
							children: "Title"
						})
					]
				})
			]
		})
	});
}
function Result() {
	const phase = useGame((s) => s.phase);
	const modal = useGame((s) => s.modal);
	if (phase !== "modal" || !modal) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-20 flex items-end justify-center p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-lg p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl",
					children: modal.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed whitespace-pre-wrap",
					children: modal.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${primary} mt-5`,
					onClick: () => useGame.getState().dismissModal(),
					children: "Continue"
				})
			]
		})
	});
}
function PauseMenu() {
	const phase = useGame((s) => s.phase);
	const page = useGame((s) => s.pausePage);
	const save = useGame((s) => s.save);
	const [quiet, setQuiet] = (0, import_react.useState)(false);
	if (phase !== "pause" || !save) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-30 flex items-end justify-center overflow-y-auto bg-bg/50 p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel max-h-[92vh] w-full max-w-xl overflow-y-auto p-6",
			children: [
				page === "root" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.2em] text-brass uppercase",
						children: "Paused"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl",
						children: "The house is holding still"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Time does not pass while this is open, and it does not pass while the game is closed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: primary,
								onClick: () => useGame.getState().togglePause(),
								children: "Resume"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: ghost,
								onClick: () => useGame.getState().setPausePage("cult"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), " Cultivation"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: ghost,
								onClick: () => useGame.getState().setPausePage("journal"),
								children: "Journal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: ghost,
								onClick: () => useGame.getState().setPausePage("help"),
								children: "How the morning works"
							}),
							save.era === "present" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: ghost,
								onClick: () => useGame.getState().openLedger(),
								children: "Ledger"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: ghost,
								onClick: () => {
									const next = !quiet;
									setQuiet(next);
									setMuted(next);
								},
								children: quiet ? "Sound is off" : "Sound is on"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: ghost,
								onClick: () => {
									useGame.getState().persist();
									useGame.getState().toTitle();
								},
								children: "Save and return to the title"
							})
						]
					})
				] }) : null,
				page === "cult" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cultivation, {}) : null,
				page === "journal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journal, {}) : null,
				page === "help" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Help, {}) : null,
				page !== "root" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `${ghost} mt-4`,
					onClick: () => useGame.getState().setPausePage("root"),
					children: "Back"
				}) : null
			]
		})
	});
}
function Cultivation() {
	const save = useGame((s) => s.save);
	if (!save) return null;
	const need = nextRank(save.martialLevel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.2em] text-brass uppercase",
			children: "What the house teaches"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "font-display text-4xl",
			children: ["Martial ", save.martialLevel]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: [
				"Public ranks run from Martial 1 to Martial 9. Hana is 6 and does not advertise it. Ren is 3. You are ",
				save.martialLevel,
				". Rank helps. It does not swing for you. The intact notes stop at Martial 4. The ninth is a door, not a bar."
			]
		}),
		need ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: `Form ${save.form}/${need.form}`,
					value: Math.min(save.form, need.form),
					max: need.form
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: `Breath ${save.breath}/${need.breath}`,
					value: Math.min(save.breath, need.breath),
					max: need.breath
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					label: `Insight ${save.insight}/${need.insight}`,
					value: Math.min(save.insight, need.insight),
					max: need.insight
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm leading-relaxed",
			children: "Martial 4 is as far as the page that is still in the book. There is no count past it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed",
			children: "You settle a form in about half the sessions Hana's best students need. That is not a reason to be careless. Insight does not come from the breath. It comes from seeing a person and still being fast enough to use what you saw."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm leading-relaxed text-muted",
			children: "In the margin, in his hand: \"The ninth is a door, not a ceiling.\" The rest of that page is the one missing from the notes."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-2",
			children: Object.keys(save.bonds).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-bg px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-medium",
					children: [id === "lin" ? "Lin Mei" : id === "ren" ? "Ren Calder" : id === "sable" ? "Sable Quinn" : "Jonah Vale", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-xs tracking-wide text-brass uppercase",
						children: regardWord(save.bonds[id].regard)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: save.bonds[id].line
				})]
			}, id))
		}),
		save.era === "present" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: `${primary} mt-4`,
			onClick: () => useGame.getState().startTraining(),
			children: "Practise on the hall floor"
		}) : null
	] });
}
function Journal() {
	const save = useGame((s) => s.save);
	if (!save) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-4xl",
		children: "What you are carrying"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-3 space-y-3",
		children: [
			save.flags.seal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
				title: "House seal",
				text: "The papers are in your name. He said not to expect him."
			}) : null,
			save.flags.adler ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
				title: "Adler & Co.",
				text: "14 Quay Stairs. Come with a better question than where he went."
			}) : null,
			save.journal.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "The morning has not written anything down yet."
			}) : null,
			save.journal.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
				title: entry.title,
				text: entry.text
			}, entry.id))
		]
	})] });
}
function Item({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-xl border border-line bg-bg px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed text-muted",
			children: text
		})]
	});
}
function Help() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-sm leading-relaxed text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-4xl text-fg",
				children: "Controls"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3",
				children: "Move with W A S D or the stick. A moves you left on screen, D moves you right. Drag to look around."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "E or the prompt speaks, reads, or practises. Tab opens the ledger. C opens this page's cultivation notes. Esc pauses. When the morning's work is done, the four wait in the courtyard. The day ends when the hall is locked. After that, sleep in the residence if you want Friday. Closing the game does not pass the night."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "In a spar: J light, K heavy, Space dodge, hold F to guard. Ren has a rhythm. Seeing it is not the same as being in time with it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "Closing the game does not age the house. You will return to this minute."
			})
		]
	});
}
function TouchControls() {
	const phase = useGame((s) => s.phase);
	if (!useTouchLayout()) return null;
	if (phase !== "play" && phase !== "flashback") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stick, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto mb-2 flex flex-col gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: `${primary} min-w-24`,
				onClick: () => runtime.edge.interact = true,
				children: "Act"
			})
		})]
	});
}
function Stick() {
	const ref = (0, import_react.useRef)(null);
	const knob = (0, import_react.useRef)(null);
	const set = (clientX, clientY, active) => {
		const el = ref.current;
		const dot = knob.current;
		if (!el || !dot) return;
		if (!active) {
			runtime.move.active = false;
			runtime.move.x = 0;
			runtime.move.y = 0;
			dot.style.transform = "translate(-50%, -50%)";
			return;
		}
		const rect = el.getBoundingClientRect();
		let x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
		let y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
		const len = Math.hypot(x, y) || 1;
		if (len > 1) {
			x /= len;
			y /= len;
		}
		runtime.move.active = true;
		runtime.move.x = x;
		runtime.move.y = -y;
		dot.style.transform = `translate(calc(-50% + ${x * 28}px), calc(-50% + ${y * 28}px))`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: "pointer-events-auto relative size-28 rounded-full border border-line bg-surface/80",
		onPointerDown: (event) => {
			event.currentTarget.setPointerCapture(event.pointerId);
			set(event.clientX, event.clientY, true);
		},
		onPointerMove: (event) => {
			if (event.currentTarget.hasPointerCapture(event.pointerId)) set(event.clientX, event.clientY, true);
		},
		onPointerUp: () => set(0, 0, false),
		onPointerCancel: () => set(0, 0, false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: knob,
			className: "absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass"
		})
	});
}
function useTouchLayout() {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const media = window.matchMedia("(pointer: coarse), (max-width: 820px)");
		const go = () => setOn(media.matches);
		go();
		media.addEventListener("change", go);
		return () => media.removeEventListener("change", go);
	}, []);
	return on;
}
//#endregion
export { GameApp };
