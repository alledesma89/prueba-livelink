import { useState, useMemo } from 'react';
import type { Pokemon } from '../types/pokemon';

export const usePokemonFilters = (pokemonList: Pokemon[] | undefined) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedAbility, setSelectedAbility] = useState<string | null>(null);

    const filteredPokemon = useMemo(() => {
        if (!pokemonList) return [];

        return pokemonList.filter((pokemon) => {
            const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType ? pokemon.types.some(t => t.type.name === selectedType) : true;
            const matchesAbility = selectedAbility ? pokemon.abilities.some(a => a.ability.name === selectedAbility) : true;

            return matchesSearch && matchesType && matchesAbility;
        });
    }, [pokemonList, searchTerm, selectedType, selectedAbility]);

    const availableTypes = useMemo(() => {
        if (!pokemonList) return [];
        const typesSet = new Set<string>();
        pokemonList.forEach(p => {
            p.types.forEach(t => typesSet.add(t.type.name));
        });
        return Array.from(typesSet).sort();
    }, [pokemonList]);

    return {
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        selectedAbility,
        setSelectedAbility,
        filteredPokemon,
        availableTypes,
    };
};
