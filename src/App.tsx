import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const PokemonGrid = lazy(() => import('./pages/PokemonGrid/PokemonGrid'));
const PokemonDetail = lazy(() => import('./pages/PokemonDetail/PokemonDetail'));
const TypesList = lazy(() => import('./pages/TypesList/TypesList'));
const AbilitiesList = lazy(() => import('./pages/AbilitiesList/AbilitiesList'));

export const App = () => {
  return (
    <div className="app-container">
      <nav className="main-nav">
        <a href="/">Pokédex</a>
        <a href="/types">Tipos</a>
        <a href="/abilities">Habilidades</a>
      </nav>

      <Suspense
        fallback={
          <div className="skeleton-loader">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PokemonGrid />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/types" element={<TypesList />} />
          <Route path="/abilities" element={<AbilitiesList />} />
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
