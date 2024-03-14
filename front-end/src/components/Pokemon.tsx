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
  const [userId, setUserId] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/current_user');
      const data = await response.json();
      if (data.googleId) {
        setUserId(data.googleId);
      } else {
        console.error('No user ID found');
      }
    } catch (error) {
      console.error('Failed to fetch user info: ', error);
    }
  };

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
    fetchCurrentUser();
    fetchRandomPokemon();
  }, []);

  useEffect(() => {
    if (pokemon) {
      console.log(pokemon);
    }
  }, [pokemon]);

  const addPokemonToUser = async (pokemonId: number) => {
    console.log('fire addPokemonToUser');
    if (!userId) return;

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
