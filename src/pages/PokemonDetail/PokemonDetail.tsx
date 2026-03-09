import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPokemonDetail } from '../../api/pokemonService';
import styles from './PokemonDetail.module.css';

export const PokemonDetail = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    const { data: pokemon, isLoading, isError } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => getPokemonDetail(name!),
        enabled: !!name,
    });

    if (isLoading) return <div className={styles.loading}>Cargando {name}...</div>;
    if (isError || !pokemon) return <div className={styles.error}>Pokémon no encontrado.</div>;

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                &larr; Volver
            </button>

            <div className={styles.card}>
                <div className={styles.header}>
                    <img
                        src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className={styles.image}
                    />
                    <div className={styles.idBadge}>#{pokemon.id.toString().padStart(3, '0')}</div>
                </div>

                <h1 className={styles.name}>{pokemon.name}</h1>

                <div className={styles.infoGrid}>
                    <div className={styles.section}>
                        <h3>Tipos</h3>
                        <div className={styles.badges}>
                            {pokemon.types.map(({ type, slot }) => (
                                <span key={slot} className={`type-${type.name} ${styles.badge}`}>
                                    {type.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h3>Habilidades</h3>
                        <div className={styles.badges}>
                            {pokemon.abilities.map(({ ability, slot, is_hidden }) => (
                                <span key={slot} className={`${styles.badge} ${is_hidden ? styles.hiddenBadge : ''}`}>
                                    {ability.name.replace('-', ' ')} {is_hidden && '★'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.statsSection}>
                    <h3>Estadísticas Base</h3>
                    <div className={styles.statsList}>
                        {pokemon.stats.map(({ stat, base_stat }) => (
                            <div key={stat.name} className={styles.statRow}>
                                <span className={styles.statName}>{stat.name.replace('-', ' ')}</span>
                                <div className={styles.statBarBg}>
                                    <div
                                        className={styles.statBarFill}
                                        style={{ width: `${Math.min(100, (base_stat / 255) * 100)}%` }}
                                    />
                                </div>
                                <span className={styles.statValue}>{base_stat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
