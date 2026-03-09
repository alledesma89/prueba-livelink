import { useNavigate } from 'react-router-dom';
import type { Pokemon } from '../../types/pokemon';
import styles from './PokemonCard.module.css';

export const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card} onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
            <div className={styles.imageContainer}>
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className={styles.image}
                />
                <span className={styles.id}>#{pokemon.id.toString().padStart(3, '0')}</span>
            </div>
            <h2 className={styles.name}>{pokemon.name}</h2>
            <div className={styles.types}>
                {pokemon.types.map(({ type, slot }) => (
                    <span key={slot} className={`${styles.typeBadge} type-${type.name}`}>
                        {type.name}
                    </span>
                ))}
            </div>
        </div>
    );
};
