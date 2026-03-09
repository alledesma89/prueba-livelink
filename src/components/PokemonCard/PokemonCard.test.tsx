import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { PokemonCard } from './PokemonCard';
import type { Pokemon } from '../../types/pokemon';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('PokemonCard', () => {
    const mockPokemon = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        types: [
            { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/1/' } },
            { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
        ],
        abilities: [],
        stats: [],
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            other: {
                'official-artwork': {
                    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
                }
            }
        }
    } as Pokemon;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the pokemon name and types correctly', () => {
        // Arrange
        render(<PokemonCard pokemon={mockPokemon} />);

        // Act
        const nameElement = screen.getByText('bulbasaur');
        const grassTypeElement = screen.getByText('grass');
        const poisonTypeElement = screen.getByText('poison');

        // Assert
        expect(nameElement).toBeInTheDocument();
        expect(grassTypeElement).toBeInTheDocument();
        expect(poisonTypeElement).toBeInTheDocument();
    });

    it('navigates to the pokemon detail page when clicked', () => {
        // Arrange
        render(<PokemonCard pokemon={mockPokemon} />);
        const nameElement = screen.getByText('bulbasaur');

        // Act
        // Click on the name element, which should bubble up to the card container
        fireEvent.click(nameElement);

        // Assert
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/pokemon/bulbasaur');
    });
});
