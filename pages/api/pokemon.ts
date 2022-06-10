import type { NextApiRequest, NextApiResponse } from "next"
import { PokemonData, PokemonDataRaw } from "types"
import { formData } from "utils/pokemon"

type Error = {
  error: string
}
const baseURL = "https://pokeapi.co/api/v2/pokemon/"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonData | Error>
) {
  if (req.method === "PUT") {
    const pokemon = req.body.data
    if (!pokemon) return res.status(400).json({ error: "Wrong search info" })

    try {
      const headers = {
        method: "GET",
      }
      const data: PokemonDataRaw = await fetch(`${baseURL}${pokemon}`, headers)
        .then((res) => res.json())
        .then(async (data) => {
          const extraData = await fetch(data.species.url, headers).then((res) =>
            res.json()
          )
          return { ...data, ...extraData }
        })

      const dataToSend = await formData(data)
      return res.status(200).json(dataToSend)
    } catch (error) {
      return res.status(400).json({ error: "Wrong Data" })
    }
  }
  return res.status(400).json({ error: "Wrong search info" })
}
