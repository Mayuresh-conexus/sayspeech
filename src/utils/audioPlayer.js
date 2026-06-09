// Advanced Web Audio API synthesizer for fallback sound effects if MP3s aren't available

let audioCtx;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const createNoiseBuffer = () => {
  const bufferSize = audioCtx.sampleRate * 2.0; // 2 seconds
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

export const playSound = (type) => {
  try {
    initAudio();
    const t = audioCtx.currentTime;

    switch (type) {
      case 'swing': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.4);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.2);
        gain.gain.linearRampToValueAtTime(0, t + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
        break;
      }

      case 'creak': {
        // Rope creak
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.linearRampToValueAtTime(150, t + 0.3);
        
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.1, t + 0.1);
        gain.gain.linearRampToValueAtTime(0, t + 0.3);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
        break;
      }
      
      case 'throw': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(100, t + 0.2);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.4, t + 0.05);
        gain.gain.linearRampToValueAtTime(0, t + 0.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
        break;
      }
      
      case 'break': {
        // Complex crash with low impact and high noise
        const noise = audioCtx.createBufferSource();
        noise.buffer = createNoiseBuffer();
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2000, t);
        filter.frequency.linearRampToValueAtTime(500, t + 0.5);
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(1.0, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start(t);

        const osc = audioCtx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, t);
        osc.frequency.exponentialRampToValueAtTime(20, t + 0.2);
        const oscGain = audioCtx.createGain();
        oscGain.gain.setValueAtTime(0.8, t);
        oscGain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
        osc.connect(oscGain);
        oscGain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.2);
        break;
      }

      case 'dust': {
        // Soft noise
        const noise = audioCtx.createBufferSource();
        noise.buffer = createNoiseBuffer();
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, t);
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.linearRampToValueAtTime(0, t + 0.4);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start(t);
        break;
      }
      
      case 'correct': {
        const playDing = (freq, time, dur) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, time);
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.5, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, time + dur);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(time);
          osc.stop(time + dur);
        };
        playDing(523.25, t, 0.4); // C5
        playDing(659.25, t + 0.1, 0.4); // E5
        playDing(1046.50, t + 0.2, 0.6); // C6
        break;
      }
      
      case 'incorrect': {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, t);
        osc.frequency.linearRampToValueAtTime(120, t + 0.4);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.3, t + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
        break;
      }

      case 'celebration': {
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
        notes.forEach((freq, i) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          const time = t + i * 0.1;
          osc.frequency.setValueAtTime(freq, time);
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.4, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(time);
          osc.stop(time + 0.4);
        });
        break;
      }
    }
  } catch (e) {
    console.error("Audio playback failed:", e);
  }
};
