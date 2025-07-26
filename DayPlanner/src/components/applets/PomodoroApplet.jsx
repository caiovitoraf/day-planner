import React, { useState, useEffect } from 'react';
import './PomodoroApplet.css';

function PomodoroApplet({ id, content, onContentChange }) {
  const [mode, setMode] = useState('work');
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(content.workTime * 60);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(seconds => seconds - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setIsActive(false);
      const newMode = mode === 'work' ? 'break' : 'work';
      setMode(newMode);
      setSecondsLeft(
        newMode === 'work' ? content.workTime * 60 : content.breakTime * 60
      );
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, mode, content]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(mode === 'work' ? content.workTime * 60 : content.breakTime * 60);
  };

  const totalSeconds = (mode === 'work' ? content.workTime : content.breakTime) * 60;
  const progressPercentage = (secondsLeft / totalSeconds) * 100;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  return (
    <div className="pomodoro-container-rect">
      <div className="timer-main-content">
        <div className="timer-display-rect">
          <span className="time-left-rect">{displayTime}</span>
          <span className="current-mode-rect">{mode === 'work' ? 'Foco' : 'Descanso'}</span>
        </div>
        
        <div className="timer-controls-rect">
          <button className="control-button-rect" onClick={toggleTimer}>
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          <button className="reset-button-rect" onClick={resetTimer}>
            &#8634;
          </button>
        </div>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${100 - progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default PomodoroApplet;