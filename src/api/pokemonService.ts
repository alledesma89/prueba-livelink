import { apiClient } from './apiClient';
import type {
    Pokemon,
    PaginatedResponse,
    NamedAPIResource,
    Type,
    Ability
} from '../types/pokemon';

interface PaginationParams {
    limit?: number;
    offset?: number;
}

export const getPokemonList = async ({ limit = 20, offset = 0 }: PaginationParams = {}): Promise<PaginatedResponse<NamedAPIResource>> => {
    return apiClient<PaginatedResponse<NamedAPIResource>>(`/pokemon?limit=${limit}&offset=${offset}`);
};

export const getPokemonDetail = async (idOrName: string | number): Promise<Pokemon> => {
    return apiClient<Pokemon>(`/pokemon/${idOrName}`);
};

export const getTypes = async ({ limit = 50, offset = 0 }: PaginationParams = {}): Promise<PaginatedResponse<Type>> => {
    return apiClient<PaginatedResponse<Type>>(`/type?limit=${limit}&offset=${offset}`);
};

export const getAbilities = async ({ limit = 50, offset = 0 }: PaginationParams = {}): Promise<PaginatedResponse<Ability>> => {
    return apiClient<PaginatedResponse<Ability>>(`/ability?limit=${limit}&offset=${offset}`);
};
