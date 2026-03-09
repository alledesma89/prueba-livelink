import { useQuery } from '@tanstack/react-query';
import { getAbilities } from '../api/pokemonService';

export const usePokemonAbilities = () => {
    return useQuery({
        queryKey: ['pokemonAbilities'],
        queryFn: async () => {
            const temp = await getAbilities({ limit: 100 });
            return temp.results;
        },
    });
};
