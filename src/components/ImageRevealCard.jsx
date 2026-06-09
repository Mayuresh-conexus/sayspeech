import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle } from 'lucide-react';
import Confetti from 'react-confetti';

const ImageRevealCard = ({ word, onGrade, state }) => {
  const isRevealed = state === 'reveal_card' || state === 'grading';

  useEffect(() => {
    if (state === 'reveal_card') {
      setTimeout(() => {
        playWordAudio();
      }, 500); // Play audio slightly after it pops up
    }
  }, [state]);

  const playWordAudio = () => {
    if (word.audioData) {
      const audio = new Audio(word.audioData);
      audio.play().catch(e => console.log('Audio playback prevented:', e));
    } else if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word.word);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AnimatePresence>
      {isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          
          {/* Golden Portal Background (Spinning Rays) */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ 
              scale: { type: 'spring', bounce: 0.5, duration: 1 }, 
              opacity: { duration: 0.5 },
              rotate: { repeat: Infinity, duration: 20, ease: 'linear' }
            }}
            className="absolute w-[600px] h-[600px] -z-10 flex items-center justify-center"
          >
            <div className="w-full h-full bg-[radial-gradient(circle,rgba(250,204,21,0.4)_0%,transparent_70%)] rounded-full blur-xl absolute" />
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
              <defs>
                <radialGradient id="portalGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g fill="url(#portalGrad)">
                {Array.from({ length: 12 }).map((_, i) => (
                  <polygon key={i} points="50,50 40,0 60,0" transform={`rotate(${i * 30} 50 50)`} />
                ))}
              </g>
            </svg>
          </motion.div>

          {/* Sparkles Confetti burst just behind the card */}
          <Confetti 
            width={800} 
            height={800} 
            recycle={false} 
            numberOfPieces={100} 
            gravity={0.1}
            initialVelocityY={15}
            colors={['#FFD700', '#FFA500', '#FFF8DC', '#FFFFFF']} // Gold/Sparkle colors
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
          />

          {/* The Actual Reward Card */}
          <motion.div 
            // Emerges from the "inside" of the pot (y: 150) to the center (y: -20)
            initial={{ scale: 0.2, opacity: 0, y: 150 }}
            animate={{ scale: 1, opacity: 1, y: -20 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, mass: 1.2 }}
            className="pointer-events-auto flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border-[6px] border-yellow-400 p-6 w-80 md:w-96 glow-ring"
          >
            
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl flex items-center justify-center overflow-hidden mb-6 shadow-inner border-4 border-white/60"
            >
              {word.imageData ? (
                <img src={word.imageData} alt={word.word} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
              ) : (
                <span className="text-8xl md:text-9xl drop-shadow-lg">{word.image}</span>
              )}
            </motion.div>

            <div className="flex items-center gap-4 mb-6 w-full justify-center bg-slate-100 dark:bg-slate-700 rounded-2xl py-3 px-4">
              <h3 className="text-3xl md:text-4xl font-display font-black text-slate-800 dark:text-white uppercase tracking-wider truncate">
                {word.word}
              </h3>
              <button 
                onClick={(e) => { e.stopPropagation(); playWordAudio(); }}
                className="p-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-full shadow-md transition-transform hover:scale-110 active:scale-95"
                aria-label="Play Audio"
              >
                <Volume2 size={28} />
              </button>
            </div>

            <AnimatePresence>
              {state === 'grading' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                  className="flex gap-4 w-full"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); onGrade(true); }}
                    className="flex-1 flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white py-4 rounded-2xl font-black text-xl shadow-[0_8px_0_rgb(21,128,61)] active:shadow-[0_0px_0_rgb(21,128,61)] active:translate-y-2 transition-all"
                  >
                    <CheckCircle size={32} />
                    CORRECT
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onGrade(false); }}
                    className="flex-1 flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 text-white py-4 rounded-2xl font-black text-xl shadow-[0_8px_0_rgb(185,28,28)] active:shadow-[0_0px_0_rgb(185,28,28)] active:translate-y-2 transition-all"
                  >
                    <XCircle size={32} />
                    INCORRECT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageRevealCard;
