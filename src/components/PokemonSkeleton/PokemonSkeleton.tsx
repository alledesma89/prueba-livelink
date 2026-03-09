import styles from './PokemonSkeleton.module.css';

export const PokemonSkeleton = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonImageContainer}>
                <div className={`${styles.skeletonImage} ${styles.pulse}`}></div>
                <div className={`${styles.skeletonId} ${styles.pulse}`}></div>
            </div>
            <div className={`${styles.skeletonTitle} ${styles.pulse}`}></div>
            <div className={styles.skeletonTypes}>
                <div className={`${styles.skeletonBadge} ${styles.pulse}`}></div>
                <div className={`${styles.skeletonBadge} ${styles.pulse}`}></div>
            </div>
        </div>
    );
};
