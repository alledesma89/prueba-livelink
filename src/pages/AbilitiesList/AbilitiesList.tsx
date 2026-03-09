import { useNavigate } from 'react-router-dom';
import { usePokemonAbilities } from '../../hooks/usePokemonAbilities';
import styles from './AbilitiesList.module.css';

export const AbilitiesList = () => {
    const { data: abilities, isLoading, isError } = usePokemonAbilities();
    const navigate = useNavigate();

    if (isError) return <div className={styles.error}>Error al cargar las habilidades.</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Habilidades de Pokémon</h1>
            <div className={styles.grid}>
                {isLoading ? (
                    Array.from({ length: 12 }).map((_, i) => (
                        <div key={`skeleton-${i}`} className={styles.skeletonAbility}></div>
                    ))
                ) : (
                    abilities?.map((ability) => (
                        <div
                            key={ability.name}
                            className={styles.abilityCard}
                            onClick={() => navigate(`/?ability=${ability.name}`)}
                        >
                            <h2>{ability.name.replace('-', ' ')}</h2>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AbilitiesList;
