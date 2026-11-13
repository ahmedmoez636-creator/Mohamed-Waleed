// Web Audio API procedural sound effects + Arabic/English Speech Synthesis

let audioCtx: AudioContext | null = null;
let isMutedGlobal = false;

type SpeechListener = (caption: string | null) => void;
const speechListeners = new Set<SpeechListener>();
let captionTimer: number | null = null;

export function subscribeSpeechCaption(listener: SpeechListener) {
  speechListeners.add(listener);
  return () => {
    speechListeners.delete(listener);
  };
}

function emitCaption(text: string | null) {
  if (captionTimer) {
    window.clearTimeout(captionTimer);
    captionTimer = null;
  }
  speechListeners.forEach((fn) => fn(text));
  if (text) {
    captionTimer = window.setTimeout(() => {
      speechListeners.forEach((fn) => fn(null));
    }, 3400);
  }
}

export function setAudioMuted(muted: boolean) {
  isMutedGlobal = muted;
  if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function getAudioMuted(): boolean {
  return isMutedGlobal;
}

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', delay = 0, volume = 0.14) {
  if (isMutedGlobal) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playClickSound() {
  playTone(540, 0.07, 'triangle', 0, 0.09);
}

export function playPopSound() {
  playTone(680, 0.09, 'sine', 0, 0.11);
}

export function playSuccessSound() {
  playTone(523.25, 0.12, 'triangle', 0, 0.15);
  playTone(659.25, 0.12, 'triangle', 0.09, 0.15);
  playTone(783.99, 0.18, 'triangle', 0.18, 0.16);
  playTone(1046.5, 0.28, 'sine', 0.27, 0.14);
}

export function playGentleTryAgainSound() {
  // Soft encouraging double-note — never harsh or punitive
  playTone(392, 0.14, 'sine', 0, 0.09);
  playTone(440, 0.16, 'sine', 0.11, 0.08);
}

export function playLevelUpSound() {
  const notes = [523.25, 587.33, 659.25, 783.99, 1046.5];
  notes.forEach((n, idx) => {
    playTone(n, 0.2, 'triangle', idx * 0.08, 0.15);
  });
}

export function playBoxOpenSound() {
  const notes = [440, 554.37, 659.25, 880, 1108.73];
  notes.forEach((n, idx) => {
    playTone(n, 0.22, 'sine', idx * 0.09, 0.16);
  });
}

export function playAnimalPattern(animalId: string) {
  if (isMutedGlobal) return;
  switch (animalId) {
    case 'cat':
      playTone(660, 0.18, 'sine', 0, 0.14);
      playTone(520, 0.25, 'sine', 0.16, 0.12);
      break;
    case 'dog':
      playTone(220, 0.1, 'sawtooth', 0, 0.08);
      playTone(260, 0.12, 'sawtooth', 0.14, 0.08);
      break;
    case 'lion':
      playTone(140, 0.3, 'sawtooth', 0, 0.1);
      playTone(110, 0.35, 'sawtooth', 0.15, 0.09);
      break;
    case 'cow':
      playTone(165, 0.45, 'triangle', 0, 0.15);
      break;
    case 'duck':
      playTone(480, 0.08, 'square', 0, 0.07);
      playTone(460, 0.08, 'square', 0.11, 0.07);
      playTone(480, 0.1, 'square', 0.22, 0.07);
      break;
    case 'rooster':
      playTone(587, 0.1, 'triangle', 0, 0.12);
      playTone(740, 0.12, 'triangle', 0.12, 0.12);
      playTone(880, 0.25, 'triangle', 0.26, 0.14);
      break;
    case 'sheep':
      playTone(330, 0.12, 'triangle', 0, 0.1);
      playTone(350, 0.12, 'triangle', 0.12, 0.1);
      playTone(330, 0.15, 'triangle', 0.24, 0.1);
      break;
    case 'frog':
      playTone(210, 0.09, 'sine', 0, 0.14);
      playTone(290, 0.12, 'sine', 0.12, 0.14);
      break;
    default:
      playTone(440, 0.2, 'triangle', 0, 0.12);
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakText(text: string, lang: 'ar' | 'en' = 'ar', rate = 0.92) {
  emitCaption(text);
  if (isMutedGlobal) return;
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    if (lang === 'ar') {
      const arVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith('ar-eg')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
      if (arVoice) utter.voice = arVoice;
      utter.lang = arVoice?.lang || 'ar-EG';
    } else {
      const enVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith('en-us')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('en'));
      if (enVoice) utter.voice = enVoice;
      utter.lang = enVoice?.lang || 'en-US';
    }

    utter.rate = rate;
    utter.pitch = 1.08;
    window.speechSynthesis.speak(utter);
  } catch {
    // Graceful silent fallback when browser speech synthesis is unavailable
  }
}

export function speakArabic(text: string, rate = 0.92) {
  speakText(text, 'ar', rate);
}

export function speakEnglish(text: string, rate = 0.88) {
  speakText(text, 'en', rate);
}

const ENCOURAGEMENTS = [
  'برافو يا محمد! أنت بطل رائع!',
  'ممتاز يا محمد! إجابة صحيحة!',
  'شاطر جداً يا محمد! استمر يا بطل!',
  'أحسنت يا محمد وليد! نجمة جديدة لك!',
  'رائع! دماغك ذكية جداً يا محمد!',
];

export function speakEncouragement() {
  const phrase = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
  playSuccessSound();
  speakArabic(phrase);
  return phrase;
}
