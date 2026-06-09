import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatkaBreakAnimation from './MatkaBreakAnimation';
import ImageRevealCard from './ImageRevealCard';
import { playSound } from '../utils/audioPlayer';
import Confetti from 'react-confetti';

const FocusMatka = ({ word, onGrade, onClose }) => {
  const [sequence, setSequence] = useState('zooming');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Sequence Logic
    let timeouts = [];

    // 1. Zoom to center takes 500ms (handled by framer layout transition, but we wait)
    timeouts.push(setTimeout(() => {
      setSequence('swinging');
      playSound('creak');
      
      // 2. Swing: 400ms
      timeouts.push(setTimeout(() => {
        setSequence('stone_throw');
        playSound('throw');
        
        // 3. Stone throw: 400ms
        timeouts.push(setTimeout(() => {
          setSequence('breaking');
          playSound('break');
          setTimeout(() => playSound('dust'), 200); // Dust sound shortly after break
          
          // 4. Break sequence: 800ms
          timeouts.push(setTimeout(() => {
            setSequence('reveal_card');
            
            // 5. Card reveal: 500ms
            timeouts.push(setTimeout(() => {
              setSequence('grading');
            }, 500));

          }, 800));

        }, 400));

      }, 400));

    }, 500));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleGrade = (isCorrect) => {
    if (isCorrect) {
      playSound('correct');
      setShowConfetti(true);
      setTimeout(() => {
        onGrade(isCorrect);
        onClose();
      }, 2500); // Wait for confetti before closing
    } else {
      playSound('incorrect');
      setTimeout(() => {
        onGrade(isCorrect);
        onClose();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Dark Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        onClick={() => { /* Prevent closing on click outside during animation */ }}
      />

      {/* Screen Shake Container during breaking */}
      <motion.div
        className="relative z-10 w-full max-w-md h-[500px] flex items-center justify-center"
        animate={sequence === 'breaking' ? { x: [-10, 10, -10, 10, 0], y: [-5, 5, -5, 5, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Glow behind the pot */}
        <AnimatePresence>
          {sequence === 'breaking' && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 m-auto w-64 h-64 bg-yellow-400/40 blur-3xl rounded-full"
            />
          )}
        </AnimatePresence>

        {/* The Matka that flew to the center via layoutId */}
        <motion.div 
          layoutId={`matka-${word.tileId}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <MatkaBreakAnimation state={sequence} />
        </motion.div>

        {/* The Erupting Image Reveal Card */}
        <ImageRevealCard 
          word={word} 
          state={sequence} 
          onGrade={handleGrade} 
        />

        {/* Success Confetti */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <Confetti 
              width={600} 
              height={600} 
              recycle={false} 
              numberOfPieces={200} 
              gravity={0.2}
              initialVelocityY={20}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FocusMatka;
