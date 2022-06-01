import type { NextApiRequest, NextApiResponse } from "next"
import { ApiResponseType, SearchType } from "types"

type Error = {
  error: string
}

const PokemonPerPage = 20
const baseURL = "https://pokeapi.co/api/v2/pokemon"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseType | Error>
) {
  if (req.method === "PUT") {
    const searchInfo: SearchType = req.body.data
    if (!searchInfo) return res.status(400).json({ error: "Wrong search info" })
    const params = {
      offset: `${PokemonPerPage * searchInfo.page - PokemonPerPage}`,
      limit: `${PokemonPerPage}`,
    }
    const urlParams = new URLSearchParams(params).toString()
    const headers = {
      method: "GET",
    }
    try {
      const data = await fetch(baseURL + "?" + urlParams, headers).then((res) =>
        res.json()
      )
      return res.status(200).json(data)
    } catch {
      return res.status(400).json({ error: "Wrong Data" })
    }
  }
  return res.status(400).json({ error: "Wrong search info" })
}
