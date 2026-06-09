import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle } from 'lucide-react';

const ImageRevealCard = ({ word, onGrade, state }) => {
  const isRevealed = ['reveal_card', 'grading', 'submit_correct', 'submit_incorrect', 'closing'].includes(state);

  useEffect(() => {
    if (state === 'reveal_card') {
      setTimeout(() => {
        playWordAudio();
      }, 600); // Play audio after reveal finishes
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

  const cardVariants = {
    hidden: { scale: 0.6, opacity: 0, y: 150 },
    reveal: { 
      scale: 1, 
      opacity: 1, 
      y: -20,
      transition: { 
        type: "spring", stiffness: 120, damping: 18, mass: 1.2,
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    },
    submit_correct: { 
      scale: 1.05, 
      y: -20, 
      boxShadow: "0 0 60px rgba(74, 222, 128, 0.8)",
      transition: { type: "spring", stiffness: 200, damping: 10 } 
    },
    submit_incorrect: { 
      scale: [1, 0.95, 1.05, 1], 
      y: -20,
      transition: { duration: 0.4 } 
    },
    closing: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    reveal: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
  };

  // Provide a safe animated state to the main card
  let animateState = 'reveal';
  if (state === 'submit_correct') animateState = 'submit_correct';
  if (state === 'submit_incorrect') animateState = 'submit_incorrect';
  if (state === 'closing') animateState = 'closing';

  return (
    <AnimatePresence>
      {isRevealed && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          
          {/* Golden Portal Background (Spinning Rays) */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={state === 'closing' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1, rotate: 360 }}
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

          {/* The Actual Reward Card */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate={animateState}
            exit="closing"
            className={`pointer-events-auto flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border-[6px] p-6 w-80 md:w-96 glow-ring relative overflow-hidden ${
              state === 'submit_correct' ? 'border-green-400 bg-green-50' : 
              state === 'submit_incorrect' ? 'border-red-400 bg-red-50' : 
              'border-yellow-400'
            }`}
          >
            {/* Success/Error Color Overlay flash */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: state === 'submit_correct' ? 0.2 : state === 'submit_incorrect' ? 0.2 : 0 }}
              className={`absolute inset-0 z-0 pointer-events-none ${state === 'submit_correct' ? 'bg-green-500' : 'bg-red-500'}`}
            />

            <motion.div 
              variants={itemVariants}
              className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-700 dark:to-slate-600 rounded-3xl flex items-center justify-center overflow-hidden mb-6 shadow-inner border-4 border-white/60 z-10 relative"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center"
              >
                {word.imageData ? (
                  <img src={word.imageData} alt={word.word} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="text-8xl md:text-9xl drop-shadow-lg">{word.image}</span>
                )}
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6 w-full justify-center bg-slate-100 dark:bg-slate-700 rounded-2xl py-3 px-4 z-10 relative">
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
            </motion.div>

            <AnimatePresence>
              {(state === 'grading' || state === 'reveal_card') && (
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-4 w-full z-10 relative"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); onGrade(true); }}
                    disabled={state === 'reveal_card'} // Disable clicking before grading state is fully active
                    className="flex-1 flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 text-white py-4 rounded-2xl font-black text-xl shadow-[0_8px_0_rgb(21,128,61)] active:shadow-[0_0px_0_rgb(21,128,61)] active:translate-y-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_8px_0_rgb(21,128,61)]"
                  >
                    <CheckCircle size={32} />
                    CORRECT
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onGrade(false); }}
                    disabled={state === 'reveal_card'}
                    className="flex-1 flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 text-white py-4 rounded-2xl font-black text-xl shadow-[0_8px_0_rgb(185,28,28)] active:shadow-[0_0px_0_rgb(185,28,28)] active:translate-y-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_8px_0_rgb(185,28,28)]"
                  >
                    <XCircle size={32} />
                    INCORRECT
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Checkmark overlay for correct submit */}
            <AnimatePresence>
              {state === 'submit_correct' && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                >
                  <CheckCircle size={120} className="text-green-500 bg-white rounded-full drop-shadow-2xl" />
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
