# Pokémon App

Web application for browsing and discovering Pokémon, built with a modern React stack. This project demonstrates rigorous front-end architecture, efficient data fetching strategies, and clean UI/UX components.

## Arquitectura

La aplicación adopta una arquitectura modular en capas bien delimitadas para asegurar la mantenibilidad y facilitar la escritura de pruebas:

- **Pages**: Contenedores principales (ej: `PokemonList`, `PokemonDetail`) que orquestan el diseño de la ruta correspondiente.
- **Components**: Componentes puramente presentacionales y reutilizables (ej: `PokemonCard`, `PokemonGrid`). Independientes de la lógica de red.
- **Hooks**: Lógica de negocio extraída en hooks personalizados (asistidos por TanStack Query) para abstraer el ciclo de vida y la mutación de datos.
- **Services**: Capa de infraestructura encapsulada (`pokemonService`) responsable del fetching de datos hacia la PokeAPI, aplicando una clara separación de la presentación.

## Stack Tecnológico

- **Vite**: Entorno de desarrollo rápido y empaquetador en producción.
- **TypeScript**: Tipado sólido estático para prevenir bugs de forma temprana.
- **TanStack Query (React Query)**: Gestión avanzada del estado de red.
- **React Router**: Para el manejo de ruteo de la Single Page Application (SPA).
- **Vitest & React Testing Library**: Setup de pruebas ligeras y enfocadas en el DOM con soporte directo a Vite.

## Decisiones Técnicas

- **Gestión de Caché con TanStack Query**: Implementado intencionadamente para evitar fetching manual con `useEffect`. Elimina el `waterfall` de request redundantes, gestiona automáticamente múltiples estados (`isLoading`, `isError`) y mantiene en caché la información solicitada sin reescribir la memoria.
- **Debounce para Protección de API**: Al implementar la búsqueda en tiempo real, se introdujo una directiva Debounce para retrasar la llamada a la ruta de búsqueda. Protegemos así los rate limits de PokeAPI limitando disparos secuenciales de teclas.
- **Skeleton Loaders vs. Spinners**: Se prefirieron UI Skeletons sobre Spinners convencionales. Los skeletons pre-reservan el espacio (anulando o reduciendo el "Layout Shift") y psicologicamente reducen la percepción del tiempo de espera para el usuario, brindando una sensación de respuesta más fluida.
- **Patrón Arrange-Act-Assert (AAA)**: Las pruebas unitarias continúan este patrón industrial, limitando confusiones y forzando a concentrar la configuración, la ejecución, y las aserciones de manera sistemática.

## Instrucciones

### Instalación

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

### Pruebas

Para validar la correcta funcionalidad de la capa de componentes y servicios, ejecuta la suite de testing:

```bash
npm test
```
