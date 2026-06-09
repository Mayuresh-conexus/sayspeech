import React from 'react';

export const TreeBranch = ({ children }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center my-4 md:my-8">
      {/* The thick wooden branch */}
      <svg className="w-full h-8 md:h-12 overflow-visible z-20 drop-shadow-xl" preserveAspectRatio="none" viewBox="0 0 1000 40">
        <defs>
          <linearGradient id="branchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="40%" stopColor="#A0522D" />
            <stop offset="80%" stopColor="#5C3317" />
            <stop offset="100%" stopColor="#3E1A00" />
          </linearGradient>
        </defs>
        {/* Slightly curved main branch */}
        <path d="M-50,20 Q500,0 1050,20 L1050,40 Q500,20 -50,40 Z" fill="url(#branchGrad)" />
        {/* Bark texture lines */}
        <path d="M-20,25 Q300,10 600,25" fill="none" stroke="#3E1A00" strokeWidth="2" strokeDasharray="30, 10, 10, 5" opacity="0.6" />
        <path d="M400,30 Q700,15 1020,30" fill="none" stroke="#3E1A00" strokeWidth="2" strokeDasharray="20, 5, 40, 10" opacity="0.6" />
        {/* Little leaves sprouting */}
        <path d="M200,15 Q210,0 220,15 Z" fill="#2ECC71" />
        <path d="M800,18 Q815,-5 830,18 Z" fill="#27AE60" />
      </svg>
      
      {/* Container for the 5 Matkas hanging off this branch */}
      <div className="relative z-10 w-full flex justify-around px-2 md:px-8 -mt-6 md:-mt-8">
        {children}
      </div>
    </div>
  );
};
