import { useQuery } from '@tanstack/react-query';
import { getPokemonList, getPokemonDetail } from '../api/pokemonService';
import type { Pokemon } from '../types/pokemon';

export const usePokemonList = () => {
    return useQuery<Pokemon[], Error>({
        queryKey: ['pokemonList'],
        queryFn: async () => {
            const listResponse = await getPokemonList({ limit: 20 });
            const detailedPokemon = await Promise.all(
                listResponse.results.map(({ name }) => getPokemonDetail(name))
            );
            return detailedPokemon;
        },
    });
};
