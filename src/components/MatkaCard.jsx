import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MatkaCard = ({ word, index, onClick, isHidden }) => {
  const [isSelected, setIsSelected] = useState(false);
  const isCorrect = word.grade === 'correct';

  const handleClick = () => {
    if (isSelected) return;
    setIsSelected(true);
    setTimeout(() => {
      onClick();
      setIsSelected(false);
    }, 300);
  };

  return (
    <div className={`relative w-[clamp(90px,25vw,140px)] md:w-[clamp(120px,15vw,160px)] aspect-square flex flex-col items-center justify-center ${isHidden ? 'opacity-0 pointer-events-none' : ''}`}>
        
        <motion.div
          layoutId={`matka-${word.tileId}`}
          animate={isSelected ? { scale: 1.08, rotate: [-2, 2, -1, 1, 0], boxShadow: "0 0 30px rgba(250, 204, 21, 0.6)" } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={!isSelected ? { scale: 1.05, y: -5 } : {}}
          whileTap={!isSelected ? { scale: 0.95 } : {}}
          onClick={handleClick}
          className="relative w-full h-full cursor-pointer bg-white rounded-[2rem] shadow-[0_8px_20px_rgba(0,0,0,0.1)] border-4 border-white/50 flex flex-col items-center justify-center overflow-hidden group"
        >
          {/* Inner inset shadow for 3D effect */}
          <div className="absolute inset-0 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.05)] rounded-[2rem] pointer-events-none"></div>

          {/* High-Quality Generated Pot Image */}
          <img 
            src={word.isGraded ? "/assets/asset_matka_broken.png" : "/assets/asset_matka.png"} 
            alt="Matka Pot" 
            className={`w-[85%] h-[85%] object-contain drop-shadow-md transition-all ${!word.isGraded && 'group-hover:drop-shadow-xl'}`} 
          />

          {/* Clean Card Number or Revealed Content */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none w-full px-2">
             {!word.isGraded ? (
               <span className="text-4xl md:text-5xl font-display font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                 {index !== undefined ? index + 1 : ''}
               </span>
             ) : (
               <div className="flex flex-col items-center -mt-4">
                 {word.imageData ? (
                    <img src={word.imageData} className="w-10 h-10 object-contain drop-shadow-sm mb-1" alt={word.word} />
                  ) : (
                    <span className="text-3xl drop-shadow-sm leading-none mb-1">{word.image}</span>
                 )}
                 <span className="text-sm font-bold text-slate-800 bg-white/80 px-2 rounded-full shadow-sm capitalize max-w-full truncate">
                   {word.word}
                 </span>
               </div>
             )}
          </div>

          {/* Status Badge */}
          {word.isGraded && (
            <div className={`absolute -right-2 -top-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white ${isCorrect ? 'bg-green-500' : 'bg-red-500'} z-10`}>
              {isCorrect ? '⭐' : '✕'}
            </div>
          )}
        </motion.div>
    </div>
  );
};

export default MatkaCard;
