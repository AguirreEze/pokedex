export interface PokemonSearchType {
  name: string
  url: string
}

export interface ApiResponseType {
  count: number
  next?: string
  previous?: string
  results: PokemonSearchType[]
}

export interface PokemonData {
  name: string
  id: number
  height: number
  weight: number
  ablilities: {
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
    back_femae: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_femae: string
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
