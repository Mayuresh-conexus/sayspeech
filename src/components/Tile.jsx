import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tile = ({ index, isBroken, isGraded, grade, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants for breaking effect
  const tileVariants = {
    idle: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: [0, -2, 2, -2, 0], transition: { duration: 0.3 } },
    break: { 
      scale: [1, 1.2, 0], 
      rotate: [0, 15, -15, 45, -45, 90], 
      opacity: [1, 1, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  if (isBroken) {
    return (
      <div className="w-full aspect-square rounded-2xl bg-slate-200/50 dark:bg-slate-800/50 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 transition-all">
        {isGraded ? (
          <div className="flex flex-col items-center justify-center animate-bounce-slow">
            {grade === 'correct' ? (
              <span className="text-5xl">✅</span>
            ) : (
              <span className="text-5xl">❌</span>
            )}
          </div>
        ) : (
          <span className="text-4xl opacity-50">✨</span>
        )}
      </div>
    );
  }

  // Pre-defined vibrant colors for the tiles
  const colors = [
    'bg-red-400 border-red-500 shadow-red-200 dark:shadow-red-900/20',
    'bg-blue-400 border-blue-500 shadow-blue-200 dark:shadow-blue-900/20',
    'bg-green-400 border-green-500 shadow-green-200 dark:shadow-green-900/20',
    'bg-yellow-400 border-yellow-500 shadow-yellow-200 dark:shadow-yellow-900/20',
    'bg-purple-400 border-purple-500 shadow-purple-200 dark:shadow-purple-900/20',
    'bg-pink-400 border-pink-500 shadow-pink-200 dark:shadow-pink-900/20',
    'bg-indigo-400 border-indigo-500 shadow-indigo-200 dark:shadow-indigo-900/20',
    'bg-orange-400 border-orange-500 shadow-orange-200 dark:shadow-orange-900/20',
    'bg-teal-400 border-teal-500 shadow-teal-200 dark:shadow-teal-900/20',
    'bg-cyan-400 border-cyan-500 shadow-cyan-200 dark:shadow-cyan-900/20',
  ];

  const colorClass = colors[index % colors.length];

  return (
    <motion.button
      className={`w-full aspect-square rounded-2xl border-b-8 shadow-xl text-white font-display text-4xl flex items-center justify-center cursor-pointer ${colorClass}`}
      variants={tileVariants}
      initial="idle"
      whileHover="hover"
      animate={isBroken ? "break" : "idle"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={isBroken}
      aria-label={`Tile ${index + 1}`}
    >
      <span className="drop-shadow-md">{index + 1}</span>
    </motion.button>
  );
};

export default Tile;
