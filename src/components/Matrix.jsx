import React, { useState, useEffect } from 'react';
import './Matrix.css';

const Matrix = () => {
  // State to track clicked boxes and their order
  const [clickedBoxes, setClickedBoxes] = useState([]);
  // State to track which boxes should be orange
  const [orangeBoxes, setOrangeBoxes] = useState([]);

  const handleBoxClick = (boxId) => {
    if (!clickedBoxes.includes(boxId)) {
      const newClickedBoxes = [...clickedBoxes, boxId];
      setClickedBoxes(newClickedBoxes);
      
      // If this is the last box (9th box), trigger the sequence
      if (newClickedBoxes.length === 9) {
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

  const getBoxColor = (boxId) => {
    if (orangeBoxes.includes(boxId)) {
      return 'orange';
    }
    return clickedBoxes.includes(boxId) ? 'green' : 'white';
  };

  // Create 3x3 matrix data
  const matrix = Array(3).fill(null).map((_, rowIndex) =>
    Array(3).fill(null).map((_, colIndex) => rowIndex * 3 + colIndex)
  );

  return (
    <div className="matrix-container">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="matrix-row">
          {row.map((boxId) => (
            <div
              key={boxId}
              className="matrix-box"
              style={{ backgroundColor: getBoxColor(boxId) }}
              onClick={() => handleBoxClick(boxId)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix; 