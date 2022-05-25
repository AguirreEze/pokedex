import type { NextApiRequest, NextApiResponse } from "next"
import { PokemonData } from "types"
type Data = {
  name: string
}
type Error = {
  error: string
}
const baseURL = "https://pokeapi.co/api/v2/pokemon/"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  if (req.method === "PUT") {
    const pokemon = req.body.data
    if (!pokemon) return res.status(400).json({ error: "Wrong search info" })
    const headers = {
      method: "GET",
    }
    const data: PokemonData = await fetch(`${baseURL}${pokemon}`, headers).then(
      (res) => res.json()
    )

    return res.status(200).json(data)
  }
  return res.status(400).json({ error: "Wrong search info" })
}
