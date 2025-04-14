import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  
  const handleNext = () => {
    if (progress < 100) {
      setProgress(prev => Math.min(prev + 25, 100));
    } else {
      setProgress(0);
    }
  };
  
  const getProgressColor = () => {
    if (progress <= 25) return '#ff4d4f'; // Червоний для 25%
    if (progress <= 50) return '#faad14'; // Жовтий для 50%
    if (progress <= 75) return '#52c41a'; // Зелений для 75%
    return '#1890ff'; // Синій для 100%
  };
  
  return (
    <div className="progress-container">
      <h2>Прогрес: {progress}%</h2>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{
            width: `${progress}%`,
            backgroundColor: getProgressColor(),
            transition: 'width 0.5s ease, background-color 0.5s ease'
          }}
        ></div>
      </div>
      <button className="next-button" onClick={handleNext}>
        {progress < 100 ? 'Next +25%' : 'Reset to 0%'}
      </button>
    </div>
  );
};

export default ProgressBar;