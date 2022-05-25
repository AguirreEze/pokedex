import { SearchType } from "types"

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
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: pokemon }),
  }
  return fetch(`/api/pokemon`, headers).then((res) => res.json())
}
