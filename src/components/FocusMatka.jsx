import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatkaBreakAnimation from './MatkaBreakAnimation';
import ImageRevealCard from './ImageRevealCard';
import { playSound } from '../utils/audioPlayer';
import Confetti from 'react-confetti';

const FocusMatka = ({ word, onGrade, onClose }) => {
  const [sequence, setSequence] = useState('focusing');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Sequence Logic
    let timeouts = [];

    // 1. Zoom to center takes 500ms (handled by framer layout transition, but we wait)
    timeouts.push(setTimeout(() => {
      setSequence('anticipation');
      playSound('creak');
      
      // 2. Anticipation swing: 300ms
      timeouts.push(setTimeout(() => {
        setSequence('stone_throw');
        playSound('throw');
        
        // 3. Stone throw: 400ms
        timeouts.push(setTimeout(() => {
          setSequence('impact');
          playSound('hit');
          
          // 4. Impact flash/shake: 150ms
          timeouts.push(setTimeout(() => {
            setSequence('breaking');
            playSound('break');
            setTimeout(() => playSound('dust'), 200);
            
            // 5. Break sequence: 700ms
            timeouts.push(setTimeout(() => {
              setSequence('reveal_card');
              
              // 6. Card reveal: 600ms
              timeouts.push(setTimeout(() => {
                setSequence('grading');
              }, 600));

            }, 700));

          }, 150));

        }, 400));

      }, 300));

    }, 500));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleGrade = (isCorrect) => {
    setSequence(isCorrect ? 'submit_correct' : 'submit_incorrect');
    
    if (isCorrect) {
      playSound('correct');
      setShowConfetti(true);
      setTimeout(() => {
        setSequence('closing');
        setTimeout(() => {
          onGrade(isCorrect);
          onClose();
        }, 500); // Wait for closing animation
      }, 2000); // Wait before closing
    } else {
      playSound('incorrect');
      setTimeout(() => {
        setSequence('closing');
        setTimeout(() => {
          onGrade(isCorrect);
          onClose();
        }, 500); // Wait for closing animation
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Dark Backdrop */}
      <motion.div 
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={sequence === 'closing' ? { opacity: 0, backdropFilter: "blur(0px)" } : { opacity: 1, backdropFilter: "blur(8px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-slate-900/45"
        onClick={() => { /* Prevent closing on click outside during animation */ }}
      />

      {/* Screen Shake Container during impact */}
      <motion.div
        className="relative z-10 w-full max-w-md h-[500px] flex items-center justify-center"
        animate={sequence === 'impact' ? { x: [-10, 10, -8, 8, 0], y: [-5, 5, -4, 4, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 0.15 }}
      >
        {/* Glow behind the pot */}
        <AnimatePresence>
          {(sequence === 'impact' || sequence === 'breaking') && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 m-auto w-64 h-64 bg-yellow-400/80 blur-3xl rounded-full"
            />
          )}
        </AnimatePresence>

        {/* The Matka that flew to the center via layoutId */}
        <motion.div 
          layoutId={`matka-${word.tileId}`}
          className="absolute inset-0 flex items-center justify-center"
          animate={sequence === 'closing' ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
            <Confetti 
              width={window.innerWidth} 
              height={window.innerHeight} 
              recycle={false} 
              numberOfPieces={300} 
              gravity={0.25}
              initialVelocityY={25}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FocusMatka;
