import { usePokemonList } from '../../hooks/usePokemonList';
import { PokemonCard } from '../../components/PokemonCard/PokemonCard';
import styles from './PokemonGrid.module.css';

export const PokemonGrid = () => {
    const { data: pokemonList, isLoading, isError } = usePokemonList();

    if (isLoading) return <div className={styles.loading}>Cargando Pokémon...</div>;
    if (isError) return <div className={styles.error}>Error al cargar los datos.</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Pokédex Explorer</h1>
            <div className={styles.grid}>
                {pokemonList?.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default PokemonGrid;
