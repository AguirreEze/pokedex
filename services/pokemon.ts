const baseURL = "https://pokeapi.co/api/v2/pokemon/"

export function getPokemonList<T>(): Promise<T> {
  const headers = {
    method: "GET",
  }
  return fetch(baseURL, headers).then((res) => res.json())
}
