import { useState, useEffect } from 'react';
import PokemonDisplay from './Pokemon';

const Timer = () => {
  const totalTime = 0.25 * 60;
  const [seconds, setSeconds] = useState(totalTime);
  const [isActive, setIsActive] = useState(false);
  const [showPokemon, setShowPokemon] = useState(false);

  const percentage = (totalTime - seconds) / totalTime;
  const imageOpacity = 0.5 + percentage * 0.5;

  const toggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setSeconds(totalTime);
      setShowPokemon(false);
    }
  };

  const reset = () => {
    setSeconds(totalTime);
    setIsActive(false);
    setShowPokemon(false);
  };

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && seconds > 0) {
      interval = window.setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds <= 0) {
      setIsActive(false);
      setShowPokemon(true);
    }
    return () => clearInterval(interval!);
  }, [isActive, seconds]);

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
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div>
        Time Remaining: {Math.floor(seconds / 60)}:
        {seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}
      </div>
      <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      {showPokemon ? <PokemonDisplay /> : null}
    </div>
  );
};

export default Timer;
