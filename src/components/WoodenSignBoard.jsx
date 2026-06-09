import React from 'react';
import { motion } from 'framer-motion';

export const WoodenSignBoard = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Ropes hanging the sign */}
      <div className="flex justify-between w-3/4 -mb-2 z-0">
        <svg width="10" height="30" viewBox="0 0 10 30"><line x1="5" y1="0" x2="5" y2="30" stroke="#5c3317" strokeWidth="4" strokeDasharray="4,2" /></svg>
        <svg width="10" height="30" viewBox="0 0 10 30"><line x1="5" y1="0" x2="5" y2="30" stroke="#5c3317" strokeWidth="4" strokeDasharray="4,2" /></svg>
      </div>
      
      {/* The Sign */}
      <div className="wood-panel px-4 py-2 md:px-6 md:py-3 flex flex-col items-center z-10 min-w-[200px] md:min-w-[250px]">
        {title && (
          <h1 className="text-2xl md:text-4xl font-display font-black text-[#F1C40F] wood-shadow tracking-wider text-center">
            {title}
          </h1>
        )}
        {subtitle && (
          <h2 className="text-sm md:text-lg font-bold text-[#F39C12] mt-1 wood-shadow text-center">
            {subtitle}
          </h2>
        )}
        {children && (
          <div className="mt-4 w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export const WoodenButton = ({ icon: Icon, label, onClick, highlight = false }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative group flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 ${
        highlight 
          ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 border-yellow-700 text-yellow-900 shadow-[0_4px_0_#9a6c00]' 
          : 'bg-gradient-to-b from-[#A0522D] to-[#8B4513] border-[#3E1A00] text-[#F5DEB3] shadow-[0_4px_0_#3E1A00]'
      } active:translate-y-1 active:shadow-none transition-all w-full mb-3`}
    >
      {Icon && <Icon size={20} className={highlight ? 'text-yellow-900' : 'text-[#F5DEB3]'} />}
      <span className="font-bold text-lg">{label}</span>
    </motion.button>
  );
};
