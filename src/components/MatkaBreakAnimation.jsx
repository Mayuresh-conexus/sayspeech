import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatkaBreakAnimation = ({ state }) => {
  const isBroken = state === 'reveal_card' || state === 'grading' || state === 'completed';
  const isBreaking = state === 'breaking';

  const potVariants = {
    zooming: { rotate: 0, scale: 1 },
    swinging: { 
      rotate: [0, -15, 15, -10, 10, -5, 5, 0], 
      transition: { duration: 0.8, ease: "easeInOut" } 
    },
    stone_throw: { rotate: 0 },
    breaking: { scale: 1.1, opacity: 0, transition: { duration: 0.1 } }, // Slight bulge before disappearing
    broken: { opacity: 0 }
  };

  const stoneVariants = {
    hidden: { x: -400, y: -50, opacity: 0, scale: 0.5 },
    stone_throw: { 
      x: [-400, -20], 
      y: [-50, 40], 
      opacity: [0, 1, 1, 0],
      rotate: [0, 720],
      scale: [0.5, 1.2, 1, 0.5],
      transition: { duration: 0.4, ease: "easeIn" } 
    }
  };

  const shardVariants = {
    hidden: { opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 },
    breaking: (i) => {
      const angle = (Math.random() * Math.PI * 2);
      const distance = Math.random() * 200 + 80;
      return {
        opacity: [1, 1, 0],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance + 50,
        rotate: (Math.random() - 0.5) * 1080,
        scale: Math.random() * 1.5 + 0.5,
        transition: { duration: 0.9, ease: "easeOut" }
      };
    }
  };

  const dustVariants = {
    hidden: { opacity: 0, x: 0, y: 0, scale: 0 },
    breaking: (i) => {
      const angle = (Math.random() * Math.PI * 2);
      const distance = Math.random() * 150;
      return {
        opacity: [0, 0.8, 0],
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: [0, Math.random() * 3 + 1.5, 0],
        transition: { duration: 1.2, ease: "easeOut" }
      };
    }
  };

  return (
    <div className="relative w-[300px] h-[350px] flex items-center justify-center">
      
      {/* Spotlight Effect (Only active when zooming/swinging/stone) */}
      <AnimatePresence>
        {!isBroken && !isBreaking && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -top-10 w-96 h-[500px] bg-gradient-to-b from-white/40 via-yellow-200/20 to-transparent blur-3xl rounded-full z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Hanging Rope */}
      {!isBroken && !isBreaking && (
        <svg className="absolute -top-32 left-1/2 -translate-x-1/2 w-4 h-40 z-0" viewBox="0 0 10 100">
          <line x1="5" y1="0" x2="5" y2="100" stroke="#5c3317" strokeWidth="6" strokeDasharray="6,4" />
        </svg>
      )}

      {/* Stone */}
      <motion.div 
        className="absolute w-12 h-12 bg-slate-400 rounded-[40%] shadow-inner z-30"
        style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} // Irregular stone shape
        variants={stoneVariants}
        initial="hidden"
        animate={state === 'stone_throw' ? 'stone_throw' : 'hidden'}
      >
        <div className="w-full h-full rounded-full border-t-2 border-l-2 border-slate-200/50 border-b-4 border-slate-600/60" />
      </motion.div>

      {/* The Pot */}
      {!isBroken && (
        <motion.div
          className="relative z-20 origin-[50%_-100px]"
          variants={potVariants}
          initial="zooming"
          animate={state === 'breaking' ? 'breaking' : state}
        >
          {/* Increased size from 150 to 220 */}
          <svg width="220" height="220" viewBox="0 0 100 100" className="drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]">
            <defs>
              <radialGradient id="potGradMasterDetailed" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#f39c12" />
                <stop offset="50%" stopColor="#d35400" />
                <stop offset="90%" stopColor="#873600" />
                <stop offset="100%" stopColor="#512e0b" />
              </radialGradient>
              <filter id="clayTexture">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.1 0" in="noise" result="coloredNoise" />
                <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
              </filter>
            </defs>
            <g filter="url(#clayTexture)">
              <path d="M 35 10 L 65 10 L 60 25 L 40 25 Z" fill="url(#potGradMasterDetailed)" stroke="#5c3317" strokeWidth="2" />
              <ellipse cx="50" cy="10" rx="15" ry="4" fill="#6e2c00" stroke="#5c3317" strokeWidth="1" />
              <path d="M 40 25 C 0 25 -10 95 50 95 C 110 95 100 25 60 25 Z" fill="url(#potGradMasterDetailed)" stroke="#5c3317" strokeWidth="2" />
              {/* Decorative patterns */}
              <path d="M 18 45 Q 50 65 82 45" fill="none" stroke="#f1c40f" strokeWidth="3" strokeDasharray="5,4" />
              <path d="M 13 55 Q 50 75 87 55" fill="none" stroke="#e67e22" strokeWidth="2" />
              <path d="M 12 65 Q 50 85 88 65" fill="none" stroke="#f1c40f" strokeWidth="3" strokeDasharray="5,4" />
            </g>

            {/* Impact Cracks (Show only exactly when stone hits, right before disappearing) */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={state === 'breaking' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.05 }}
            >
              <path d="M 30 40 L 40 50 L 35 60 M 40 50 L 50 45 L 60 55 M 50 45 L 55 35" fill="none" stroke="#3e1a00" strokeWidth="2" />
            </motion.g>
          </svg>
        </motion.div>
      )}

      {/* Shards & Dust Explosion */}
      {(isBreaking || isBroken) && (
        <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
          {/* Dust clouds */}
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              custom={i}
              variants={dustVariants}
              initial="hidden"
              animate="breaking"
              className="absolute w-8 h-8 bg-[#f5cba7] rounded-full blur-xl"
            />
          ))}

          {/* Clay Shards */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`shard-${i}`}
              custom={i}
              variants={shardVariants}
              initial="hidden"
              animate="breaking"
              className="absolute w-12 h-12 bg-[#d35400] shadow-md border border-[#873600] rounded-sm"
              style={{
                clipPath: `polygon(${Math.random() * 50}% 0%, 100% ${Math.random() * 50}%, ${Math.random() * 50 + 50}% 100%, 0% ${Math.random() * 50 + 50}%)`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatkaBreakAnimation;
