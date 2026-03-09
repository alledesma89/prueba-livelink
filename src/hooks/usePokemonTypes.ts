import { useQuery } from '@tanstack/react-query';
import { getTypes } from '../api/pokemonService';

export const usePokemonTypes = () => {
    return useQuery({
        queryKey: ['pokemonTypes'],
        queryFn: async () => {
            const temp = await getTypes({ limit: 50 });
            return temp.results;
        },
    });
};
