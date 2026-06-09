import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, FINISHED
  const [targetSound, setTargetSound] = useState('');
  const [targetPosition, setTargetPosition] = useState('');
  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const initializeGame = (sound, position, wordsList) => {
    setTargetSound(sound);
    setTargetPosition(position);
    setScore({ correct: 0, incorrect: 0 });
    
    // Select up to 10 random words
    const shuffled = [...wordsList].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, 10).map((word, index) => ({
      ...word,
      tileId: `tile_${index}`,
      isBroken: false,
      isGraded: false,
      grade: null // 'correct' or 'incorrect'
    }));

    // If we don't have enough words, duplicate some to make 10
    while (selectedWords.length > 0 && selectedWords.length < 10) {
      const randomExisting = selectedWords[Math.floor(Math.random() * selectedWords.length)];
      selectedWords.push({
        ...randomExisting,
        tileId: `tile_${selectedWords.length}`,
        isBroken: false,
        isGraded: false,
        grade: null
      });
    }

    setTiles(selectedWords);
    setGameState('PLAYING');
  };

  const breakTile = (tileId) => {
    setTiles(prev => prev.map(t => t.tileId === tileId ? { ...t, isBroken: true } : t));
  };

  const gradeTile = (tileId, isCorrect) => {
    setTiles(prev => {
      const newTiles = prev.map(t => 
        t.tileId === tileId ? { ...t, isGraded: true, grade: isCorrect ? 'correct' : 'incorrect' } : t
      );
      
      // Check if game is finished
      if (newTiles.every(t => t.isGraded)) {
        setTimeout(() => setGameState('FINISHED'), 500); // Small delay before finishing
      }
      return newTiles;
    });

    setScore(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }));
  };

  const resetGame = () => {
    setGameState('IDLE');
    setTargetSound('');
    setTargetPosition('');
    setTiles([]);
    setScore({ correct: 0, incorrect: 0 });
  };

  return (
    <GameContext.Provider value={{
      gameState,
      targetSound,
      targetPosition,
      tiles,
      score,
      initializeGame,
      breakTile,
      gradeTile,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};
