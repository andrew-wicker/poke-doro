import { useState } from 'react';
import Timer from './Timer';
import PokemonDisplay from './Pokemon';

const Pokedoro = () => {
  const [showPokemon, setShowPokemon] = useState(false);

  const handleTimerComplete = () => {
    setShowPokemon(true);
  };

  const resetDisplay = () => {
    setShowPokemon(false);
  };

  return (
    <div>
      {showPokemon && <PokemonDisplay />}
      <Timer
        onTimerComplete={handleTimerComplete}
        resetDisplay={resetDisplay}
      />
    </div>
  );
};

export default Pokedoro;
