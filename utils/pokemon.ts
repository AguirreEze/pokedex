import {
  PokemonAbilitiesRaw,
  PokemonData,
  PokemonDataRaw,
  PokemonHeldItemsRaw,
  PokemonSpritesRaw,
  PokemonStatsRaw,
  PokemonTypeRaw,
} from "types"

export const formData = async (data: PokemonDataRaw): Promise<PokemonData> => {
  return {
    name: data.name,
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    sprites: filterSprites(data.sprites),
    abilities: await filterAbilities(data.abilities),
    stats: filterStats(data.stats),
    types: await filterTypes(data.types),
    heldItems: await filterHeldItems(data.held_items),
  }
}

const filterAbilities = (ablilities: PokemonAbilitiesRaw[]) => {
  const arrOfPromises = ablilities.map((ability) => {
    return fetch(ability.ability.url)
      .then((res) => res.json())
      .then((res) => {
        return {
          name: ability.ability.name,
          description: res.effect_entries.find(
            (elem: any) => elem.language.name === "en"
          ).short_effect,
          isHidden: ability.is_hidden,
          slot: ability.slot,
        }
      })
  })
  return Promise.all(arrOfPromises)
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
          slot: type.slot,
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
          effect: itemData.effect_entries.find(
            (elem: any) => elem.language.name === "en"
          ).short_effect,
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
