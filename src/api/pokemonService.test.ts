import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPokemonList } from './pokemonService';

describe('pokemonService', () => {
    beforeEach(() => {
        // Arrange: Reset the mock before each test
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    describe('getPokemonList', () => {
        it('fetches and processes the pokemon list correctly from PokeAPI', async () => {
            // Arrange
            const mockResponse = {
                count: 1302,
                next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
                previous: null,
                results: [
                    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
                ]
            };

            (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: true,
                json: async () => mockResponse
            });

            // Act
            const limit = 20;
            const offset = 0;
            const result = await getPokemonList({ limit, offset });

            // Assert
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
                undefined
            );
            expect(result).toEqual(mockResponse);
        });

        it('throws an error if the fetch request fails', async () => {
            // Arrange
            (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });

            // Act & Assert
            await expect(getPokemonList()).rejects.toThrow('API error: 404 Not Found');
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
    });
});
