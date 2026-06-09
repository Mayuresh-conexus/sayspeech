import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const ProgressStars = ({ totalTiles, completedTiles }) => {
  return (
    <div className="bg-[#FFF9E6]/90 backdrop-blur-sm px-8 py-3 rounded-full border-4 border-[#FFF1C5] shadow-lg flex flex-col items-center">
      <span className="text-[#A0522D] font-bold text-sm uppercase tracking-widest mb-1">Your Progress</span>
      <div className="flex gap-2">
        {Array.from({ length: totalTiles }).map((_, index) => {
          const isFilled = index < completedTiles;
          return (
            <motion.div
              key={index}
              initial={false}
              animate={isFilled ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Star 
                size={28} 
                className={`transition-colors duration-300 ${
                  isFilled 
                    ? 'fill-yellow-400 text-yellow-500 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' 
                    : 'fill-slate-200 text-slate-300'
                }`} 
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
