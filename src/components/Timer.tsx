import { useState, useEffect } from 'react';

interface TimerProps {
  onTimerComplete: () => void;
  resetDisplay: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimerComplete, resetDisplay }) => {
  const totalTime = 0.25 * 60;
  const [seconds, setSeconds] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);

  const percentage = (totalTime - seconds) / totalTime;
  const imageOpacity = 0.5 + percentage * 0.5;

  const toggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setSeconds(totalTime);
    } else {
      resetDisplay();
    }
  };

  const reset = () => {
    setSeconds(totalTime);
    setIsActive(false);
    resetDisplay();
  };

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds <= 0 && isActive) {
      setIsActive(false);
      onTimerComplete();
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds, onTimerComplete, resetDisplay]);

  return (
    <div>
      <div
        className="image-container"
        style={{
          opacity: imageOpacity,
        }}
      >
        <img
          src="/images/timerball.png"
          alt="Progress"
          style={{
            objectFit: 'cover',
            width: '50%',
            height: '50%',
          }}
        />
      </div>
      <div>
        Time Remaining: {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Timer;
