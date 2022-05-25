export interface PokemonResultType {
  name: string
  url: string
}

export interface ApiResponseType {
  count: number
  next?: string
  previous?: string
  results: PokemonResultType[]
}

export interface SearchType {
  page: number
}

export interface PokemonData {
  name: string
  height: number
  weight: number
  baseExperience: number
  sprites: {
    backDefault: string
    frontDefault: string
    backShiny: string
    frontShint: string
  }
  abilities: {
    name: string
    isHidden: boolean
    slot: number
  }[]
  stats: {
    name: string
    effort: number
    baseStats: number
  }[]
  types: {
    name: string
    slot: number
    doubleDamageFrom: string[]
    doubleDamageTo: string[]
    halfDamageFrom: string[]
    halfDamageTo: string[]
    noDamageFrom: string[]
    noDamageTo: string[]
  }[]
  heldItems: {
    name: string
    effect: string
  }[]
}

export interface PokemonDataRaw {
  name: string
  id: number
  height: number
  weight: number
  abilities: PokemonAbilitiesRaw[]
  held_items: PokemonHeldItemsRaw[]
  base_experience: number
  stats: PokemonStatsRaw[]
  types: PokemonTypesRaw[]
  sprites: PokemonSpritesRaw
  moves: {
    move: {
      name: string
      url: string
    }
    version_group_details: []
  }
  forms: {
    name: string
    url: string
  }[]
}

export interface PokemonAbilitiesRaw {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonTypesRaw {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStatsRaw {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonHeldItemsRaw {
  item: {
    name: string
    url: string
  }
  version_details: []
}

export interface PokemonSpritesRaw {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}
