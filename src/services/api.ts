import type { Pokemon } from '../types/pokemon';

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (idOrName: string | number): Promise<Pokemon> => {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${idOrName}`);

    if (!response.ok) {
        throw new Error('Failed to fetch Pokémon');
    }

    const data = await response.json();
    return data;
};

export const getRandomPokemonId = (maxId = 151): number => {
    return Math.floor(Math.random() * maxId) + 1;
};
