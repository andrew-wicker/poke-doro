import { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  id: number;
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
  const [pokemonId, setPokemonId] = useState<number | null>(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const totalPokemon = 898;
        const randomId = Math.floor(Math.random() * totalPokemon) + 1;
        setPokemonId(randomId);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        const data: Pokemon = await response.json();
        setPokemon(data);
        if (pokemonId) addPokemonToUser(pokemonId);
      } catch (error) {
        console.error('Failed to fetch Pokemon: ', error);
      }
    };

    fetchRandomPokemon();
  }, []);

  useEffect(() => {
    if (pokemon) {
      console.log(pokemon);
    }
  }, [pokemon]);

  const addPokemonToUser = async (pokemonId: number) => {
    const userId = '101141148224628755450'; //add userId

    try {
      const response = await fetch('http://localhost:3000/api/addPokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, pokemonId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add Pokemon to user');
      }
      console.log('Pokemon added successfully');
    } catch (error) {
      console.error(error);
    }
  };

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
