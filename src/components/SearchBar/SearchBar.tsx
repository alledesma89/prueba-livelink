import { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch]);

    return (
        <div className={styles.searchContainer}>
            <input
                type="text"
                placeholder="Buscar Pokémon por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
        </div>
    );
};
