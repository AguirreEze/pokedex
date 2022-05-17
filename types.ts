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
