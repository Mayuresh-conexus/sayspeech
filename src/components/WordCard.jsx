import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle } from 'lucide-react';

const WordCard = ({ word, onGrade, onClose }) => {
  
  // Attempt to play text-to-speech automatically when card opens (if supported)
  useEffect(() => {
    playAudio();
  }, [word]);

  const playAudio = () => {
    if (word.audioData) {
      // If it's a custom uploaded audio file (base64 or URL)
      const audio = new Audio(word.audioData);
      audio.play().catch(e => console.log('Audio playback prevented:', e));
    } else if ('speechSynthesis' in window) {
      // Fallback to browser TTS for default words
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.9; // Slightly slower for articulation
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -50 }}
          className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl border-4 border-cyan-400 flex flex-col items-center gap-6 relative"
        >
          {/* Image Area */}
          <div className="w-48 h-48 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center border-4 border-dashed border-slate-300 dark:border-slate-500 overflow-hidden shadow-inner">
            {word.imageData ? (
               <img src={word.imageData} alt={word.word} className="w-full h-full object-cover" />
            ) : (
               <span className="text-8xl">{word.image}</span>
            )}
          </div>

          {/* Word Text & Audio */}
          <div className="flex items-center gap-4">
            <h2 className="text-5xl font-display font-bold text-slate-800 dark:text-white capitalize tracking-wide">
              {word.word}
            </h2>
            <button 
              onClick={playAudio}
              className="p-3 bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-900/50 dark:hover:bg-cyan-800 text-cyan-600 dark:text-cyan-400 rounded-full transition-transform hover:scale-110 active:scale-95"
              aria-label="Play pronunciation"
            >
              <Volume2 size={32} />
            </button>
          </div>

          <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />

          {/* Therapist Controls */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-center text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Therapist Grading</p>
            <div className="flex gap-4">
              <button
                onClick={() => onGrade(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg shadow-green-500/30 transition-transform active:scale-95"
              >
                <CheckCircle size={28} />
                Correct
              </button>
              <button
                onClick={() => onGrade(false)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg shadow-red-500/30 transition-transform active:scale-95"
              >
                <XCircle size={28} />
                Incorrect
              </button>
            </div>
          </div>
          
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WordCard;
