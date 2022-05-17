import { SearchType } from "types"

const baseURL = "https://pokeapi.co/api/v2/pokemon?"

export function getPokemonList<T>(search: SearchType): Promise<T> {
  const params = {
    offset: `${20 * search.page - 20}`,
    limit: "20",
  }
  const urlParams = new URLSearchParams(params).toString()
  const headers = {
    method: "GET",
  }
  return fetch(baseURL + urlParams, headers).then((res) => res.json())
}
