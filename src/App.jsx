import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Setup from './pages/Setup';
import Game from './pages/Game';
import Admin from './pages/Admin';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('break-say-theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('break-say-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('break-say-theme', 'light');
    }
  }, [darkMode]);

  return (
    <AdminProvider>
      <GameProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-slate-800 shadow-md text-slate-800 dark:text-yellow-400 hover:scale-110 transition-transform z-50"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/game" element={<Game />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </BrowserRouter>
      </GameProvider>
    </AdminProvider>
  );
}

export default App;
