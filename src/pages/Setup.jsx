import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useAdmin } from '../context/AdminContext';
import { availableSounds, positions } from '../data/sampleWords';
import { ArrowLeft, PlayCircle } from 'lucide-react';

const Setup = () => {
  const navigate = useNavigate();
  const { initializeGame } = useGame();
  const { allWords } = useAdmin();
  
  const [selectedSound, setSelectedSound] = useState('P');
  const [selectedPosition, setSelectedPosition] = useState('Initial');

  const handleStart = () => {
    // Filter words matching criteria
    const filteredWords = allWords.filter(
      w => w.sound === selectedSound && w.position === selectedPosition
    );

    if (filteredWords.length === 0) {
      alert(`No words found for Sound: ${selectedSound}, Position: ${selectedPosition}. Please add custom words or choose another combination.`);
      return;
    }

    initializeGame(selectedSound, selectedPosition, filteredWords);
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glass-panel p-8 rounded-3xl w-full max-w-2xl relative shadow-2xl border-t-4 border-t-cyan-400 border-b-4 border-b-pink-400">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full transition-colors text-slate-600 dark:text-slate-300"
          aria-label="Go Back"
        >
          <ArrowLeft size={24} />
        </button>

        <h2 className="text-4xl font-display font-bold text-center text-slate-800 dark:text-white mb-8 mt-2">
          Game Setup
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Sound Selection */}
          <div className="flex flex-col gap-4">
            <label className="text-xl font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
              <span className="bg-cyan-100 dark:bg-cyan-900/50 p-2 rounded-lg">1</span> Select Sound
            </label>
            <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto p-2 border-2 border-slate-100 dark:border-slate-700 rounded-xl">
              {availableSounds.map(sound => (
                <button
                  key={sound}
                  onClick={() => setSelectedSound(sound)}
                  className={`py-2 rounded-lg font-bold text-lg transition-all ${
                    selectedSound === sound 
                      ? 'bg-cyan-500 text-white shadow-md transform scale-105' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {sound}
                </button>
              ))}
            </div>
          </div>

          {/* Position Selection */}
          <div className="flex flex-col gap-4">
            <label className="text-xl font-bold text-pink-500 dark:text-pink-400 flex items-center gap-2">
              <span className="bg-pink-100 dark:bg-pink-900/50 p-2 rounded-lg">2</span> Select Position
            </label>
            <div className="flex flex-col gap-3">
              {positions.map(pos => (
                <button
                  key={pos}
                  onClick={() => setSelectedPosition(pos)}
                  className={`py-4 rounded-xl font-bold text-xl transition-all ${
                    selectedPosition === pos 
                      ? 'bg-pink-500 text-white shadow-md transform scale-105' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white py-5 px-8 rounded-2xl text-2xl font-bold shadow-xl transform transition hover:scale-105 active:scale-95"
        >
          <PlayCircle size={32} />
          LET'S PLAY
        </button>

      </div>
    </div>
  );
};

export default Setup;
