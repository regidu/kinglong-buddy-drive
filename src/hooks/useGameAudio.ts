// Game Audio System using Web Audio API
// All sounds are procedurally generated - no external files needed for SFX

let audioCtx: AudioContext | null = null;
let bgMusicSource: AudioBufferSourceNode | null = null;
let bgGainNode: GainNode | null = null;
let isMusicPlaying = false;

const getCtx = () => {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
};

// --- Procedural SFX ---

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

// --- Background Music (procedural looping melody) ---

const generateMusicBuffer = (ctx: AudioContext): AudioBuffer => {
  const sampleRate = ctx.sampleRate;
  const duration = 8; // 8 second loop
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  // Pentatonic scale frequencies for a Chinese-inspired melody
  const notes = [261.6, 293.7, 329.6, 392.0, 440.0, 523.3, 587.3, 659.3];
  const beatDuration = sampleRate * 0.25; // 16th notes at ~120bpm

  for (let beat = 0; beat < duration / 0.25; beat++) {
    const noteFreq = notes[beat % notes.length];
    const startSample = Math.floor(beat * beatDuration);
    for (let j = 0; j < beatDuration && startSample + j < length; j++) {
      const t = j / sampleRate;
      const envelope = Math.exp(-t * 6) * 0.08;
      data[startSample + j] += Math.sin(2 * Math.PI * noteFreq * t) * envelope;
      // Add a subtle harmony
      data[startSample + j] += Math.sin(2 * Math.PI * noteFreq * 1.5 * t) * envelope * 0.3;
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
  try {
    bgMusicSource?.stop();
  } catch {}
  bgMusicSource = null;
  isMusicPlaying = false;
};

export const setMusicSpeed = (gameSpeed: number) => {
  if (bgMusicSource) {
    // Map game speed (3-10) to playback rate (1.0-1.8)
    const rate = 1.0 + (gameSpeed - 3) * 0.1;
    bgMusicSource.playbackRate.value = Math.min(rate, 2.0);
  }
};

export const resumeAudioContext = () => {
  if (audioCtx?.state === "suspended") audioCtx.resume();
};
