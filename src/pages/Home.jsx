import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Play, Mic, Star } from 'lucide-react';
import Confetti from 'react-confetti';
import { Parrot, Monkey, Elephant } from '../components/StoryCharacters';

const Home = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-[100dvh] w-full bg-storybook relative overflow-x-hidden flex flex-col items-center justify-center py-10 md:py-0">

      {/* Background Environment Layers */}
      <div className="sun-rays opacity-50" />

      <div className="hill-layer-2" />
      <div className="hill-layer-1" />
      <div className="sand-layer" />

      {/* Floating Clouds */}
      <motion.div
        animate={{ x: [-200, windowSize.width + 200] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="cloud w-48 h-16 top-[10%] left-0"
      />
      <motion.div
        animate={{ x: [-200, windowSize.width + 200] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear", delay: -10 }}
        className="cloud w-32 h-10 top-[20%] left-0 opacity-60"
      />
      <motion.div
        animate={{ x: [-200, windowSize.width + 200] }}
        transition={{ repeat: Infinity, duration: 45, ease: "linear", delay: -20 }}
        className="cloud w-64 h-20 top-[5%] left-0 opacity-80"
      />

      {/* Ambient Sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-10">
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={40}
          gravity={0.02}
          colors={['#ffffff', '#fffbd1', '#fef08a']}
          wind={0.01}
          drawShape={ctx => {
            ctx.beginPath();
            ctx.arc(0, 0, Math.random() * 3 + 1, 0, 2 * Math.PI);
            ctx.fill();
          }}
        />
      </div>

      {/* --- Characters --- */}

      {/* Monkey Hanging on Vine (Top Right) */}
      <div className="absolute top-0 right-[5%] md:right-[15%] z-20">
        <Monkey />
      </div>

      {/* Elephant on Grass (Bottom Right) */}
      <div className="absolute bottom-[10%] right-[10%] md:right-[20%] z-20">
        <Elephant />
      </div>

      {/* --- Central Parchment --- */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative z-30 w-[90%] max-w-3xl mt-[-5%]"
      >
        {/* Parrot perched on top left of parchment */}
        <div className="absolute -top-24 -left-10 md:-left-20 z-40 transform scale-75 md:scale-100">
          <Parrot />
        </div>

        {/* The Parchment Board */}
        <div className="bg-[#FFF9E6] border-[8px] border-[#FFF1C5] rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col items-center text-center">

          {/* Titles */}
          <h1 className="text-5xl md:text-7xl font-display font-black text-[#22A094] mb-2 storybook-text-shadow leading-tight">
            BREAK & SAY
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-[#E67E22] mb-8 font-nunito tracking-wide">
            The Fun Articulation Game
          </h2>

          {/* Feature List */}
          {/* <div className="flex flex-col gap-4 text-left w-full max-w-sm mx-auto mb-10">
            <div className="flex items-center gap-4 bg-white/50 px-6 py-3 rounded-full shadow-sm">
              <div className="bg-pink-100 p-2 rounded-full text-pink-500"><Mic size={24} /></div>
              <span className="text-lg font-bold text-slate-700">Practice Speech Sounds</span>
            </div>
            <div className="flex items-center gap-4 bg-white/50 px-6 py-3 rounded-full shadow-sm">
              <div className="bg-orange-100 p-2 rounded-full text-orange-500 text-2xl">🏺</div>
              <span className="text-lg font-bold text-slate-700">Break Surprise Matkas</span>
            </div>
            <div className="flex items-center gap-4 bg-white/50 px-6 py-3 rounded-full shadow-sm">
              <div className="bg-yellow-100 p-2 rounded-full text-yellow-500"><Star size={24} className="fill-yellow-500" /></div>
              <span className="text-lg font-bold text-slate-700">Earn Rewards</span>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mt-4">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/setup')}
              className="relative group bg-gradient-to-b from-[#FFD100] to-[#FF9900] text-[#7A3E00] px-8 py-5 rounded-full font-black text-2xl shadow-[0_8px_0_#CC7A00] active:shadow-[0_0px_0_#CC7A00] active:translate-y-2 transition-all flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 rounded-full border-4 border-white/30 group-hover:border-white/50 transition-colors pointer-events-none" />
              <Play fill="currentColor" size={28} />
              START GAME
            </motion.button>

            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin')}
              className="relative group bg-gradient-to-b from-[#A569BD] to-[#8E44AD] text-white px-8 py-5 rounded-full font-black text-xl shadow-[0_8px_0_#6C3483] active:shadow-[0_0px_0_#6C3483] active:translate-y-2 transition-all flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors pointer-events-none" />
              <Settings size={24} />
              THERAPIST PORTAL
            </motion.button> */}

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
