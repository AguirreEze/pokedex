import type { NextApiRequest, NextApiResponse } from "next"
import { PokemonDataRaw } from "types"
import { formData } from "utils/pokemon"

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
    const data: PokemonDataRaw = await fetch(
      `${baseURL}${pokemon}`,
      headers
    ).then((res) => res.json())

    const dataToSend = await formData(data)

    return res.status(200).json(dataToSend)
  }
  return res.status(400).json({ error: "Wrong search info" })
}
