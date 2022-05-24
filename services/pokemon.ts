import { SearchType } from "types"

const PokemonPerPage = 20

const baseURL = "https://pokeapi.co/api/v2/pokemon?"

export function getPokemonList<T>(search: SearchType): Promise<T> {
  const params = {
    offset: `${PokemonPerPage * search.page - PokemonPerPage}`,
    limit: `${PokemonPerPage}`,
  }
  const urlParams = new URLSearchParams(params).toString()
  const headers = {
    method: "GET",
  }
  return fetch(baseURL + urlParams, headers).then((res) => res.json())
}

export function getPokemon<T>(pokemon: string): Promise<T> {
  const headers = {
    method: "GET",
  }
  return fetch(`${baseURL}${pokemon}`, headers).then((res) => res.json())
}
