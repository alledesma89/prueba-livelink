import { useState, useEffect } from 'react';
import type { Pokemon } from './types/pokemon';
import { getPokemon, getRandomPokemonId } from './services/api';
import './App.css';

export const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      setError(null);

      const randomId = getRandomPokemonId();
      const currentPokemon = await getPokemon(randomId);

      setPokemon(currentPokemon);
    } catch (err) {
      setError('Error al cargar el Pokémon. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  return (
    <div className="app-container">
      <main className="glass-panel">
        <header className="header">
          <h1>Pokédex Explorer</h1>
          <p>Descubre el mundo Pokémon</p>
        </header>

        {loading && (
          <div className="skeleton-loader">
            <div className="spinner"></div>
            <p>Buscando Pokémon salvaje...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button className="primary-btn" onClick={fetchRandomPokemon}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && pokemon && (
          <div className="pokemon-card fade-in">
            <div className="pokemon-image-container">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokemon-image floating"
              />
              <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
            </div>

            <h2 className="pokemon-name">{pokemon.name}</h2>

            <div className="badges-container">
              {pokemon.types.map(({ type, slot }) => (
                <span key={slot} className={`type-badge type-${type.name}`}>
                  {type.name}
                </span>
              ))}
            </div>

            <div className="stats-grid">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="stat-row">
                  <span className="stat-name">{stat.name.replace('-', ' ')}</span>
                  <div className="stat-bar-container">
                    <div
                      className="stat-bar-fill"
                      style={{ width: `${Math.min(100, (base_stat / 255) * 100)}%` }}
                    />
                  </div>
                  <span className="stat-value">{base_stat}</span>
                </div>
              ))}
            </div>

            <div className="abilities-section">
              <h3>Habilidades</h3>
              <div className="badges-container">
                {pokemon.abilities.map(({ ability, slot, is_hidden }) => (
                  <span key={slot} className={`ability-badge ${is_hidden ? 'hidden-ability' : ''}`}>
                    {ability.name.replace('-', ' ')}
                    {is_hidden && <span className="hidden-icon">★</span>}
                  </span>
                ))}
              </div>
            </div>

            <button className="primary-btn pulse" onClick={fetchRandomPokemon}>
              Buscar Otro Pokémon
            </button>
          </div>
        )}
      </main>

      <div className="background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </div>
  );
};

export default App;
