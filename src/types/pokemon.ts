export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Type extends NamedAPIResource {}
export interface Ability extends NamedAPIResource {}
export interface Stat extends NamedAPIResource {}

export interface PokemonType {
  slot: number;
  type: Type;
}

export interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: Ability;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: Stat;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}
