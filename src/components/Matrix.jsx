import React, { useState, useEffect } from 'react';
import './Matrix.css';

const Matrix = () => {
  // State to track clicked boxes and their order
  const [clickedBoxes, setClickedBoxes] = useState([]);
  // State to track which boxes should be orange
  const [orangeBoxes, setOrangeBoxes] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleBoxClick = (boxId) => {
    if (!clickedBoxes.includes(boxId) && !isComplete) {
      const newClickedBoxes = [...clickedBoxes, boxId];
      setClickedBoxes(newClickedBoxes);
      
      if (newClickedBoxes.length === 9) {
        setIsComplete(true);
        startSequence(newClickedBoxes);
      }
    }
  };

  const startSequence = (boxes) => {
    // Reset orange boxes
    setOrangeBoxes([]);
    
    // Show orange colors one by one with delay
    boxes.forEach((boxId, index) => {
      setTimeout(() => {
        setOrangeBoxes(prev => [...prev, boxId]);
      }, index * 500); // 500ms delay between each box
    });
  };

  const resetGame = () => {
    setClickedBoxes([]);
    setOrangeBoxes([]);
    setIsComplete(false);
  };

  const getBoxColor = (boxId) => {
    if (orangeBoxes.includes(boxId)) {
      return '#d35400';  // darker orange
    }
    return clickedBoxes.includes(boxId) ? '#27ae60' : '#1a2634';  // darker green and dark background
  };

  // Create 3x3 matrix data
  const matrix = Array(3).fill(null).map((_, rowIndex) =>
    Array(3).fill(null).map((_, colIndex) => rowIndex * 3 + colIndex)
  );

  return (
    <div className="game-container">
      <h1>Matrix Click Game</h1>
      <p className="instructions">
        Click the boxes in any order. After clicking all boxes, 
        watch them turn orange in your click sequence!
      </p>
      <div className="progress-info">
        Boxes clicked: {clickedBoxes.length} / 9
      </div>
      <div className="matrix-container">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="matrix-row">
            {row.map((boxId) => (
              <div
                key={boxId}
                className={`matrix-box ${clickedBoxes.includes(boxId) ? 'clicked' : ''} 
                           ${orangeBoxes.includes(boxId) ? 'orange' : ''}`}
                style={{ backgroundColor: getBoxColor(boxId) }}
                onClick={() => handleBoxClick(boxId)}
              >
                {clickedBoxes.includes(boxId) && !orangeBoxes.includes(boxId) && 
                  <span className="click-number">{clickedBoxes.indexOf(boxId) + 1}</span>
                }
              </div>
            ))}
          </div>
        ))}
      </div>
      {isComplete && (
        <button className="reset-button" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default Matrix; 