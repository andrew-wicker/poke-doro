import { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

const PokemonDisplay = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const totalPokemon = 898;
        const randomId = Math.floor(Math.random() * totalPokemon) + 1;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        const data: Pokemon = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch Pokemon: ', error);
      }
    };

    fetchRandomPokemon();
  }, []);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h3>{pokemon.name}</h3>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
      />
    </div>
  );
};

export default PokemonDisplay;
