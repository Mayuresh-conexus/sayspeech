import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WordTreasures = ({ collectedWords }) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Purple Title Pill */}
      <div className="bg-[#9b59b6] text-white px-6 py-1.5 rounded-full shadow-md text-sm font-bold tracking-wide -mb-3 relative z-10">
        Collected Words
      </div>
      
      {/* White Glass Tray */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-white flex flex-row items-center justify-center gap-4 min-h-[120px] overflow-x-auto custom-scrollbar">
        {collectedWords.length === 0 ? (
          <p className="text-slate-400 font-medium italic">Break pots to collect words!</p>
        ) : (
          <AnimatePresence>
            {collectedWords.map((word) => (
              <motion.div
                key={word.tileId}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-3 min-w-[100px] aspect-square"
              >
                {/* Image / Text Area */}
                <div className="flex-1 flex items-center justify-center">
                  {word.imageData ? (
                    <img src={word.imageData} className="w-12 h-12 object-contain drop-shadow-sm" />
                  ) : (
                    <span className="text-4xl drop-shadow-sm">{word.image}</span>
                  )}
                </div>
                {/* Word Label */}
                <span className="font-bold text-slate-700 text-sm capitalize mt-1">{word.word}</span>
                
                {/* Star Badge */}
                {word.grade === 'correct' && (
                  <div className="absolute -top-2 -right-2 text-[#FFD700] drop-shadow-md text-xl bg-white rounded-full leading-none">
                    ⭐
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};
