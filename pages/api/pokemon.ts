import type { NextApiRequest, NextApiResponse } from "next"
import {
  PokemonAbilitiesRaw,
  PokemonDataRaw,
  PokemonHeldItemsRaw,
  PokemonSpritesRaw,
  PokemonStatsRaw,
  PokemonTypesRaw as PokemonTypeRaw,
} from "types"
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
    console.log(dataToSend)

    return res.status(200).json(data)
  }
  return res.status(400).json({ error: "Wrong search info" })
}

const formData = async (data: PokemonDataRaw) => {
  return {
    name: data.name,
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    sprites: filterSprites(data.sprites),
    ablilities: filterAbilities(data.abilities),
    stats: filterStats(data.stats),
    types: await filterTypes(data.types),
    heldItems: await filterHeldItems(data.held_items),
  }
}

const filterAbilities = (ablilities: PokemonAbilitiesRaw[]) => {
  return ablilities.map((ability) => {
    return {
      name: ability.ability.name,
      isHidden: ability.is_hidden,
      slot: ability.slot,
    }
  })
}

const getName = (object: any) => {
  return object.name
}

const filterTypes = (types: PokemonTypeRaw[]) => {
  const arrOfPromises = types.map((type) => {
    return fetch(type.type.url)
      .then((res) => res.json())
      .then((typeData) => {
        return {
          name: type.type.name,
          stot: type.slot,
          doubleDamageFrom:
            typeData.damage_relations.double_damage_from.map(getName),
          doubleDamageTo:
            typeData.damage_relations.double_damage_to.map(getName),
          halfDamageFrom:
            typeData.damage_relations.half_damage_from.map(getName),
          halfDamageTo: typeData.damage_relations.half_damage_to.map(getName),
          noDamageFrom: typeData.damage_relations.no_damage_from.map(getName),
          noDamageTo: typeData.damage_relations.no_damage_to.map(getName),
        }
      })
  })
  return Promise.all(arrOfPromises)
}

const filterStats = (stats: PokemonStatsRaw[]) => {
  return stats.map((stat) => {
    return {
      name: stat.stat.name,
      effort: stat.effort,
      baseStats: stat.base_stat,
    }
  })
}

const filterHeldItems = (heldItems: PokemonHeldItemsRaw[]) => {
  if (heldItems.length === 0) return []
  const arrOfPromises = heldItems.map(async (item) => {
    return fetch(item.item.url)
      .then((res) => res.json())
      .then((itemData) => {
        return {
          name: item.item.name,
          effect: itemData.effect_entries[0].short_effect,
        }
      })
  })
  return Promise.all(arrOfPromises)
}

const filterSprites = (sprites: PokemonSpritesRaw) => {
  return {
    backDefault: sprites.back_default,
    frontDefault: sprites.front_default,
    backShiny: sprites.back_shiny,
    frontShiny: sprites.front_shiny,
  }
}
