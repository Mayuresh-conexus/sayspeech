import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import FocusMatka from '../components/FocusMatka';
import GameCompletionModal from '../components/GameCompletionModal';
import { WordTreasures } from '../components/WordTreasures';
import { Monkey } from '../components/StoryCharacters';
import { PotBoard } from '../components/PotBoard';

const Game = () => {
  const navigate = useNavigate();
  const { gameState, tiles, score, targetSound, targetPosition, gradeTile } = useGame();
  
  const [activeWord, setActiveWord] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    if (gameState === 'IDLE') {
      navigate('/setup');
    }
  }, [gameState, navigate]);

  useEffect(() => {
    if (tiles.length > 0 && tiles.every(t => t.isGraded)) {
      const timer = setTimeout(() => {
        setShowCompletionModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCompletionModal(false);
    }
  }, [tiles]);

  const handleMatkaClick = (word) => {
    if (activeWord) return; 
    setActiveWord(word);
  };

  const handleGrade = (isCorrect) => {
    gradeTile(activeWord.tileId, isCorrect);
  };

  if (gameState === 'IDLE') return null;

  const completedWords = tiles.filter(t => t.isGraded);
  const remaining = tiles.length - completedWords.length;

  return (
    <div className="min-h-[100dvh] w-full relative overflow-hidden flex flex-col font-nunito select-none bg-slate-900">
      
      {/* Immersive High-Res Generated Background */}
      <img 
        src="/assets/bg_village.png" 
        alt="Village Background" 
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-90"
      />

      {/* --- HEADER --- */}
      <header className="relative z-30 flex justify-between items-start px-4 md:px-8 pt-6 w-full max-w-[1800px] mx-auto">
        {/* Exit Button */}
        <button 
          onClick={() => navigate('/setup')} 
          className="flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-white text-[#9b59b6] hover:scale-105 transition-transform"
        >
          <ArrowLeft size={24} strokeWidth={3} />
          <span className="text-[10px] md:text-xs font-bold text-slate-500 mt-0.5">Exit</span>
        </button>

        {/* Center Premium Status Card */}
        <div className="bg-white/95 backdrop-blur-xl px-4 md:px-8 py-2 md:py-3 rounded-[2.5rem] shadow-[0_12px_40px_rgb(0,0,0,0.15)] border-2 border-white flex items-center gap-4 md:gap-8 mx-2 max-w-full overflow-x-auto custom-scrollbar">
          
          {/* Target Sound */}
          <div className="flex flex-col border-r-2 border-slate-100 pr-4 md:pr-8 min-w-fit">
            <span className="text-slate-400 text-xs md:text-sm font-bold text-center">Target Sound</span>
            <div className="flex items-end gap-2 justify-center">
              <span className="text-3xl md:text-4xl font-black text-[#5e35b1] leading-none">{targetSound}</span>
              <span className="text-[#5e35b1] text-sm md:text-xl font-bold mb-0.5">- {targetPosition}</span>
            </div>
          </div>

          {/* Correct */}
          <div className="flex flex-col items-center border-r-2 border-slate-100 pr-4 md:pr-8 min-w-fit">
            <div className="flex items-center gap-1.5">
              <span className="text-yellow-400 text-2xl md:text-3xl drop-shadow-sm">⭐</span>
              <span className="text-2xl md:text-3xl font-black text-green-600 leading-none">{score.correct}</span>
            </div>
            <span className="text-green-600 text-xs md:text-sm font-bold mt-1">Correct</span>
          </div>

          {/* Incorrect */}
          <div className="flex flex-col items-center border-r-2 border-slate-100 pr-4 md:pr-8 min-w-fit">
            <div className="flex items-center gap-1.5">
              <div className="bg-red-500 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-bold shadow-sm text-sm md:text-xl">✕</div>
              <span className="text-2xl md:text-3xl font-black text-red-500 leading-none">{score.incorrect}</span>
            </div>
            <span className="text-red-500 text-xs md:text-sm font-bold mt-1">Incorrect</span>
          </div>

          {/* Remaining */}
          <div className="flex flex-col items-center min-w-fit">
            <div className="flex items-center gap-1.5">
              <div className="text-[#9b59b6] text-2xl md:text-3xl drop-shadow-sm">🏺</div>
              <span className="text-2xl md:text-3xl font-black text-[#8e44ad] leading-none">{remaining}</span>
            </div>
            <span className="text-[#8e44ad] text-xs md:text-sm font-bold mt-1">Remaining</span>
          </div>

        </div>

        {/* Help Button */}
        <button className="flex flex-col items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-white text-[#9b59b6] hover:scale-105 transition-transform">
          <HelpCircle size={24} strokeWidth={3} />
          <span className="text-[10px] md:text-xs font-bold text-slate-500 mt-0.5">Help</span>
        </button>
      </header>

      {/* --- MAIN GAMEPLAY AREA --- */}
      <main className="relative z-20 flex-1 flex flex-col md:flex-row items-center justify-center w-full max-w-[1600px] mx-auto px-4 mt-6 md:mt-0 py-8">
        
        {/* Mascot Area */}
        <div className="w-full md:w-[20%] lg:w-[15%] flex justify-center md:justify-end items-center relative h-[150px] md:h-full z-30 pointer-events-none md:pr-8">
          <div className="relative">
            <Monkey className="transform scale-90 md:scale-100 lg:scale-110 drop-shadow-2xl" />
            <div className="absolute -top-4 -right-16 md:-top-10 md:-right-24 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-[2rem] rounded-bl-md shadow-2xl border-2 border-white z-10 whitespace-nowrap bubble-tail">
              <p className="font-bold text-slate-700 text-sm md:text-lg">Find the <span className="text-[#5e35b1] font-black">{targetSound}</span> words!</p>
            </div>
          </div>
        </div>

        {/* --- CENTRAL GAME BOARD CONTAINER --- */}
        <div className="flex-1 w-full flex items-center justify-center relative">
          <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border-[6px] border-white/60 shadow-[0_30px_60px_rgba(0,0,0,0.2)] p-6 md:p-12 w-full relative overflow-hidden">
             
             {/* Decorative inner glow/overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

             <div className="relative z-10">
               <PotBoard tiles={tiles} activeWord={activeWord} onMatkaClick={handleMatkaClick} />
             </div>
          </div>
        </div>
        
        {/* Right Spacer for balance */}
        <div className="hidden md:block md:w-[20%] lg:w-[15%] pointer-events-none"></div>
      </main>

      {/* --- BOTTOM TRAY --- */}
      <footer className="relative z-30 w-full px-4 pb-6 md:pb-8 mt-auto max-w-[1600px] mx-auto">
        <WordTreasures collectedWords={completedWords} />
      </footer>

      {/* ANIMATION OVERLAY */}
      <AnimatePresence>
        {activeWord && (
          <FocusMatka 
            word={activeWord} 
            onGrade={handleGrade} 
            onClose={() => setActiveWord(null)} 
          />
        )}
      </AnimatePresence>

      <GameCompletionModal isVisible={showCompletionModal} />
    </div>
  );
};

export default Game;
