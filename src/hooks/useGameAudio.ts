// Game Audio System using Web Audio API — all procedural

let audioCtx: AudioContext | null = null;
let bgMusicSource: AudioBufferSourceNode | null = null;
let bgGainNode: GainNode | null = null;
let isMusicPlaying = false;

const getCtx = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
};

export const playWoosh = () => {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.12);
  } catch {}
};

export const playGameOver = () => {
  try {
    const ctx = getCtx();
    [300, 250, 200].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.3);
    });
  } catch {}
};

export const playScore = () => {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain).connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
  } catch {}
};

// Fun, upbeat procedural music — major key arpeggios
const generateMusicBuffer = (ctx: AudioContext): AudioBuffer => {
  const sr = ctx.sampleRate;
  const duration = 4;
  const length = sr * duration;
  const buffer = ctx.createBuffer(1, length, sr);
  const data = buffer.getChannelData(0);

  // C major pentatonic fun melody
  const melody = [523.3, 587.3, 659.3, 784.0, 880.0, 784.0, 659.3, 587.3,
                   523.3, 440.0, 392.0, 440.0, 523.3, 659.3, 784.0, 880.0];
  const beatLen = sr * (duration / melody.length);

  for (let b = 0; b < melody.length; b++) {
    const freq = melody[b];
    const start = Math.floor(b * beatLen);
    for (let j = 0; j < beatLen && start + j < length; j++) {
      const t = j / sr;
      const env = Math.exp(-t * 5) * 0.07;
      // Main + octave harmony + slight detuned for richness
      data[start + j] += Math.sin(2 * Math.PI * freq * t) * env;
      data[start + j] += Math.sin(2 * Math.PI * freq * 2 * t) * env * 0.25;
      data[start + j] += Math.sin(2 * Math.PI * freq * 0.5 * t) * env * 0.15;
    }
  }
  return buffer;
};

export const startMusic = () => {
  try {
    const ctx = getCtx();
    if (isMusicPlaying) return;
    const buffer = generateMusicBuffer(ctx);
    bgMusicSource = ctx.createBufferSource();
    bgGainNode = ctx.createGain();
    bgMusicSource.buffer = buffer;
    bgMusicSource.loop = true;
    bgMusicSource.playbackRate.value = 1.0;
    bgGainNode.gain.value = 0.15;
    bgMusicSource.connect(bgGainNode).connect(ctx.destination);
    bgMusicSource.start();
    isMusicPlaying = true;
  } catch {}
};

export const stopMusic = () => {
  try { bgMusicSource?.stop(); } catch {}
  bgMusicSource = null;
  isMusicPlaying = false;
};

export const setMusicSpeed = (gameSpeed: number) => {
  if (bgMusicSource) {
    // Directly proportional: speed 3 → rate 1.0, speed 8 → rate 1.5, etc.
    const rate = 0.7 + (gameSpeed / BASE_SPD) * 0.3;
    bgMusicSource.playbackRate.value = Math.min(Math.max(rate, 0.8), 2.5);
  }
};

const BASE_SPD = 3;

export const setMusicVolume = (vol: number) => {
  if (bgGainNode) bgGainNode.gain.value = vol;
};

export const resumeAudioContext = () => {
  if (audioCtx?.state === "suspended") audioCtx.resume();
};
