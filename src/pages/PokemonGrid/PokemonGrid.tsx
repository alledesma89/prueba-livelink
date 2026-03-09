import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePokemonList } from '../../hooks/usePokemonList';
import { usePokemonFilters } from '../../hooks/usePokemonFilters';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { PokemonSkeleton } from '../../components/PokemonSkeleton/PokemonSkeleton';
import styles from './PokemonGrid.module.css';

export const PokemonGrid = () => {
    const { data: pokemonList, isLoading, isError } = usePokemonList();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialType = searchParams.get('type');
    const initialAbility = searchParams.get('ability');

    const {
        setSearchTerm,
        selectedType,
        setSelectedType,
        selectedAbility,
        setSelectedAbility,
        filteredPokemon,
        availableTypes,
    } = usePokemonFilters(pokemonList);

    useEffect(() => {
        if (initialType && initialType !== selectedType) {
            setSelectedType(initialType);
        }
    }, [initialType, setSelectedType]);

    useEffect(() => {
        if (initialAbility && initialAbility !== selectedAbility) {
            setSelectedAbility(initialAbility);
        }
    }, [initialAbility, setSelectedAbility]);

    const handleTypeChange = (type: string | null) => {
        setSelectedType(type);
        const newParams = new URLSearchParams(searchParams);
        if (type) {
            newParams.set('type', type);
        } else {
            newParams.delete('type');
        }
        setSearchParams(newParams);
    };

    const clearAbilityFilter = () => {
        setSelectedAbility(null);
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('ability');
        setSearchParams(newParams);
    };

    if (isError) return <div className={styles.error}>Error al cargar los datos.</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Pokédex Explorer</h1>

            <SearchBar onSearch={setSearchTerm} />

            {selectedAbility && (
                <div className={styles.filtersContainer}>
                    <p className={styles.filterNotice}>
                        Filtrando por habilidad: <strong>{selectedAbility}</strong>
                        <button onClick={clearAbilityFilter} className={styles.clearBtn}>✕</button>
                    </p>
                </div>
            )}

            {!isLoading && availableTypes.length > 0 && (
                <div className={styles.filtersContainer}>
                    <button
                        className={`${styles.filterButton} ${selectedType === null ? styles.activeFilter : ''}`}
                        onClick={() => handleTypeChange(null)}
                    >
                        Todos
                    </button>
                    {availableTypes.map(type => (
                        <button
                            key={type}
                            className={`${styles.filterButton} type-${type} ${selectedType === type ? styles.activeFilter : ''}`}
                            onClick={() => handleTypeChange(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            )}

            <div className={`${styles.grid} ${!isLoading ? styles.fadeIn : ''}`}>
                {isLoading ? (
                    Array.from({ length: 12 }).map((_, i) => (
                        <PokemonSkeleton key={`skeleton-${i}`} />
                    ))
                ) : filteredPokemon.length > 0 ? (
                    filteredPokemon.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                ) : (
                    <div className={styles.noResults}>
                        <p>No se han encontrado Pokémon.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PokemonGrid;
