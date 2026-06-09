import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScoreBoard = ({ score, totalTiles, targetSound, targetPosition }) => {
  const navigate = useNavigate();
  const remaining = totalTiles - (score.correct + score.incorrect);

  return (
    <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 mt-4 glass-panel px-6 py-4 rounded-3xl z-20 relative">
      <button 
        onClick={() => navigate('/setup')}
        className="flex items-center gap-2 font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={24} />
        Exit Game
      </button>
      
      <div className="text-center flex-1">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-800 dark:text-white">
          Target: <span className="text-pink-500">{targetSound}</span> - <span className="text-cyan-500">{targetPosition}</span>
        </h2>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/40 border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-2 rounded-2xl font-bold shadow-sm">
          <CheckCircle size={24} /> 
          <span className="text-xl">{score.correct}</span>
        </div>
        <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/40 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-2 rounded-2xl font-bold shadow-sm">
          <XCircle size={24} /> 
          <span className="text-xl">{score.incorrect}</span>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-2xl font-bold shadow-sm">
          <LayoutGrid size={24} /> 
          <span className="text-xl">{remaining}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
