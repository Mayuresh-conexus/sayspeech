import React from 'react';
import { motion } from 'framer-motion';

export const Monkey = ({ className }) => (
  <motion.div 
    className={`relative ${className} w-32 md:w-48 aspect-square`}
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
  >
    <div className="w-full h-full bg-white rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-4 border-white/80 overflow-hidden flex items-center justify-center pointer-events-auto">
      <img 
        src="/assets/mascot_monkey.png" 
        alt="Monkey Mascot" 
        className="w-[90%] h-[90%] object-contain"
      />
    </div>
  </motion.div>
);

// We keep the old components if they are used elsewhere, or just export Monkey.
export const Parrot = () => null;
export const Elephant = () => null;
