import { useNavigate } from 'react-router-dom';
import { usePokemonTypes } from '../../hooks/usePokemonTypes';
import styles from './TypesList.module.css';

export const TypesList = () => {
    const { data: types, isLoading, isError } = usePokemonTypes();
    const navigate = useNavigate();

    if (isError) return <div className={styles.error}>Error al cargar los tipos.</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tipos de Pokémon</h1>
            <div className={styles.grid}>
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <div key={`skeleton-${i}`} className={styles.skeletonType}></div>
                    ))
                ) : (
                    types?.map((type) => (
                        <div
                            key={type.name}
                            className={`${styles.typeCard} type-${type.name}`}
                            onClick={() => navigate(`/?type=${type.name}`)}
                        >
                            <h2>{type.name}</h2>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TypesList;
