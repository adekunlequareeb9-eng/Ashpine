let ctx: AudioContext | null = null;
export let muted = false;

export function setMuted(next: boolean) {
  muted = next;
  if (muted && ctx) {
    void ctx.suspend();
  } else if (ctx) {
    void ctx.resume();
  }
}

export function unlockAudio() {
  if (typeof window === "undefined") return;
  if (!ctx) ctx = new AudioContext();
  if (!muted && ctx.state === "suspended") void ctx.resume();
}

function envGain(duration: number, peak: number) {
  if (!ctx || muted) return null;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  return { ctx, gain, now };
}

export function tick(freq = 520) {
  const node = envGain(0.08, 0.03);
  if (!node || !ctx) return;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  osc.connect(node.gain);
  osc.start(node.now);
  osc.stop(node.now + 0.09);
}

export function thud() {
  const node = envGain(0.16, 0.08);
  if (!node || !ctx) return;
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(140, node.now);
  osc.frequency.exponentialRampToValueAtTime(55, node.now + 0.14);
  osc.connect(node.gain);
  osc.start(node.now);
  osc.stop(node.now + 0.16);
}

export function stepSound() {
  const node = envGain(0.07, 0.025);
  if (!node || !ctx) return;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.06), ctx.sampleRate);
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
