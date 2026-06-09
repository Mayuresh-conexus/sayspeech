import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, RotateCcw, Home as HomeIcon } from 'lucide-react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useAdmin } from '../context/AdminContext';
import { playSound } from '../utils/audioPlayer';

const GameCompletionModal = ({ isVisible }) => {
  const navigate = useNavigate();
  const { score, resetGame, targetSound, targetPosition } = useGame();
  const { activeStudentId, addRewardToStudent, saveGameHistory } = useAdmin();
  
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const total = score.correct + score.incorrect;
  const percentage = total > 0 ? Math.round((score.correct / total) * 100) : 0;
  
  let stars = 1;
  if (percentage >= 90) stars = 3;
  else if (percentage >= 60) stars = 2;

  const coinsEarned = score.correct * 5;

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isVisible) {
      playSound('celebration');
      if (activeStudentId && total > 0) {
        addRewardToStudent(activeStudentId, coinsEarned);
        saveGameHistory(activeStudentId, {
          sound: targetSound,
          position: targetPosition,
          score: score,
          stars: stars
        });
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handlePlayAgain = () => {
    resetGame();
    navigate('/setup');
  };

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-hidden">
        
        {/* Confetti Explosion */}
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          recycle={true}
          numberOfPieces={400}
          gravity={0.15}
        />

        <motion.div 
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 md:p-12 rounded-[3rem] w-full max-w-2xl flex flex-col items-center shadow-2xl relative z-10 text-center border-4 border-yellow-300"
        >
          <Trophy size={100} className="text-yellow-300 mb-6 animate-bounce-slow drop-shadow-lg" />
          
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-md">
            Excellent!
          </h2>
          <p className="text-2xl text-white/90 font-bold mb-8">
            You smashed all the {targetSound} words!
          </p>

          {/* Stars */}
          <div className="flex gap-4 mb-10">
            {[1, 2, 3].map((starIdx) => (
              <motion.div
                key={starIdx}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: starIdx * 0.3 + 0.5, type: "spring" }}
              >
                <Star 
                  size={80} 
                  className={starIdx <= stars ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]" : "text-white/20 fill-transparent"} 
                />
              </motion.div>
            ))}
          </div>

          {/* Score & Coins */}
          <div className="bg-white/20 p-6 rounded-3xl w-full mb-10 flex justify-around border border-white/30 backdrop-blur-md">
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-white/80 uppercase tracking-widest mb-1">Final Score</span>
              <span className="text-5xl font-display font-bold text-green-300">{score.correct}/{total}</span>
            </div>
            {activeStudentId && (
              <div className="flex flex-col items-center border-l-2 border-white/20 pl-8">
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest mb-1">Coins Earned</span>
                <span className="text-5xl font-display font-bold text-yellow-300">+{coinsEarned} 🪙</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 w-full">
            <button
              onClick={handlePlayAgain}
              className="flex-1 flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-slate-800 py-5 px-6 rounded-2xl text-2xl font-bold shadow-xl transform transition hover:scale-105 active:scale-95"
            >
              <RotateCcw size={28} />
              Play Again
            </button>
            <button
              onClick={handleHome}
              className="flex-1 flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-purple-600 py-5 px-6 rounded-2xl text-2xl font-bold shadow-xl transform transition hover:scale-105 active:scale-95"
            >
              <HomeIcon size={28} />
              Home
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GameCompletionModal;
