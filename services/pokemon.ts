import { SearchType } from "types"

const PokemonPerPage = 20

const baseURL = "https://pokeapi.co/api/v2/pokemon"

export function getPokemonList<T>(search: SearchType): Promise<T> {
  const request = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: search }),
  }

  return fetch("/api/pokemon-list", request).then((res) => res.json())
}

export function getPokemon<T>(pokemon: string): Promise<T> {
  const headers = {
    method: "GET",
  }
  return fetch(`${baseURL}/${pokemon}`, headers).then((res) => res.json())
}
