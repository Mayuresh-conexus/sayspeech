import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useAdmin } from '../context/AdminContext';
import { motion } from 'framer-motion';
import { Star, Trophy, Home as HomeIcon, RotateCcw } from 'lucide-react';

const Reward = () => {
  const navigate = useNavigate();
  const { score, resetGame, targetSound, targetPosition } = useGame();
  const { activeStudentId, addRewardToStudent, saveGameHistory } = useAdmin();

  const total = score.correct + score.incorrect;
  const percentage = total > 0 ? Math.round((score.correct / total) * 100) : 0;
  
  // Calculate stars (3 stars = >90%, 2 stars = >60%, 1 star = else)
  let stars = 1;
  if (percentage >= 90) stars = 3;
  else if (percentage >= 60) stars = 2;

  const coinsEarned = score.correct * 5; // 5 coins per correct answer

  useEffect(() => {
    // Save progress when reward screen mounts
    if (activeStudentId && total > 0) {
      addRewardToStudent(activeStudentId, coinsEarned);
      saveGameHistory(activeStudentId, {
        sound: targetSound,
        position: targetPosition,
        score: score,
        stars: stars
      });
    }
  }, []); // Run once on mount

  const handlePlayAgain = () => {
    resetGame();
    navigate('/setup');
  };

  const handleHome = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl -top-40 -left-40 pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-yellow-300/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none"
      />

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="glass-panel p-10 rounded-[3rem] w-full max-w-xl flex flex-col items-center shadow-2xl relative z-10 text-center"
      >
        <Trophy size={80} className="text-yellow-300 mb-4 animate-bounce-slow" />
        
        <h1 className="text-5xl font-display font-bold mb-2">Great Job!</h1>
        <p className="text-xl text-white/80 font-bold mb-8">You finished the {targetSound} sound words.</p>

        {/* Stars */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3].map((starIdx) => (
            <motion.div
              key={starIdx}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: starIdx * 0.3, type: "spring" }}
            >
              <Star 
                size={70} 
                className={starIdx <= stars ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" : "text-white/30 fill-transparent"} 
              />
            </motion.div>
          ))}
        </div>

        {/* Score & Coins */}
        <div className="bg-white/20 p-6 rounded-3xl w-full mb-8 flex justify-around">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Score</span>
            <span className="text-4xl font-display font-bold text-green-300">{score.correct}/{total}</span>
          </div>
          {activeStudentId && (
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Coins Earned</span>
              <span className="text-4xl font-display font-bold text-yellow-300">+{coinsEarned} 🪙</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={handlePlayAgain}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-800 py-4 px-6 rounded-2xl text-xl font-bold shadow-lg transform transition hover:scale-105"
          >
            <RotateCcw size={24} />
            Play Again
          </button>
          <button
            onClick={handleHome}
            className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-4 px-6 rounded-2xl text-xl font-bold shadow-lg transform transition hover:scale-105"
          >
            <HomeIcon size={24} />
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Reward;
