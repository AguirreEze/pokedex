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
  general: {
    name: string
    height: number
    weight: number
    baseExperience: number
    isBaby: boolean
    isLegendary: boolean
    isMythical: boolean
    hasGenderDifferences: boolean
    baseHappiness: string
    captureRate: number
    generation: string
    dexEntries: {
      entry: string
      version: string
    }[]
    pokedexIndex: {
      index: number
      pokedex: string
    }[]
    varieties: {
      isDefault: boolean
      name: string
      id: string
    }[]
  }
  breeding: {
    genderRate: number
    eggGroups: string[]
    hatchCounter: number
  }
  sprites: {
    backDefault: string
    frontDefault: string
    backShiny: string
    frontShiny: string
  }
  abilities: {
    name: string
    description: string
    isHidden: boolean
    slot: number
  }[]
  stats: {
    name: string
    effort: number
    baseStats: number
  }[]
  types: {
    names: {
      name: string
      slot: number
    }[]
    weakTo: string[]
    stronglyWeakTo: string[]
    resistantTo: string[]
    stronglyResistantTo: string[]
    inmuneTo: string[]
  }
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
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  has_gender_differences: boolean
  gender_rate: number
  base_happiness: string
  capture_rate: number
  hatch_counter: number
  egg_groups: {
    name: string
    url: string
  }[]
  evolvution_chain: {
    url: string
  }
  generation: {
    name: string
    url: string
  }
  flavor_text_entries: {
    flavor_text: string
    version: {
      name: string
    }
  }[]
  pokedex_numbers: {
    entry_number: number
    pokedex: {
      name: string
    }
  }[]
  varieties: {
    is_default: boolean
    pokemon: {
      name: string
      url: string
    }
  }[]
  abilities: {
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }[]
  held_items: {
    item: {
      name: string
      url: string
    }
    version_details: []
  }[]
  base_experience: number
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  sprites: {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
  }
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
