import React from 'react';
import MatkaCard from './MatkaCard';

export const PotBoard = ({ tiles, activeWord, onMatkaClick }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-4">
      {/* 
        Responsive Grid:
        - Mobile: 2 columns
        - Tablet (sm): 3 columns (or 5 depending on width, we'll use 5 for md+)
        - Desktop (lg): 5 columns
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-12 w-full max-w-5xl mx-auto px-4 place-items-center relative">
        
        {/* Repeating wooden branch background applied to each row using absolute pseudo-elements or we can just draw lines behind the rows. 
            Since Grid handles the layout, drawing a simple line behind each row is trickier without subgrid, 
            so we'll attach the rope to a thin CSS wood bar at the top of each MatkaCard instead. 
        */}
        
        {tiles.map((word, index) => (
          <MatkaCard 
            key={word.tileId} 
            word={word}
            index={index}
            onClick={() => onMatkaClick(word)}
            isHidden={activeWord?.tileId === word.tileId}
          />
        ))}

      </div>
    </div>
  );
};
