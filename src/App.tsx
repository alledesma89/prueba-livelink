import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const PokemonGrid = lazy(() => import('./pages/PokemonGrid/PokemonGrid'));
const PokemonDetail = lazy(() => import('./pages/PokemonDetail/PokemonDetail'));

export const App = () => {
  return (
    <div className="app-container">
      <Suspense
        fallback={
          <div className="skeleton-loader">
            <div className="spinner"></div>
            <p>Preparando la Pokédex...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PokemonGrid />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </Suspense>

      <div className="background-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
    </div>
  );
};

export default App;
