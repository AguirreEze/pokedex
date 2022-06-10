import { PokemonData, PokemonDataRaw } from "types"

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

const filterAbilities = (ablilities: PokemonDataRaw["abilities"]) => {
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

const filterTypes = (types: PokemonDataRaw["types"]) => {
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
  return Promise.all(arrOfPromises).then(calculateTypeIntersaction)
}

const filterStats = (stats: PokemonDataRaw["stats"]) => {
  return stats.map((stat) => {
    return {
      name: stat.stat.name,
      effort: stat.effort,
      baseStats: stat.base_stat,
    }
  })
}

const filterHeldItems = (heldItems: PokemonDataRaw["held_items"]) => {
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

const filterSprites = (sprites: PokemonDataRaw["sprites"]) => {
  return {
    backDefault: sprites.back_default,
    frontDefault: sprites.front_default,
    backShiny: sprites.back_shiny,
    frontShiny: sprites.front_shiny,
  }
}

interface DataType {
  name: string
  slot: number
  doubleDamageFrom: string[]
  doubleDamageTo: string[]
  halfDamageFrom: string[]
  halfDamageTo: string[]
  noDamageFrom: string[]
  noDamageTo: string[]
}

const calculateTypeIntersaction = (data: DataType[]) => {
  if (data.length === 1) {
    return {
      names: [
        {
          name: data[0].name,
          slot: data[0].slot,
        },
      ],
      weakTo: data[0].doubleDamageFrom,
      stronglyWeakTo: [],
      resistantTo: data[0].halfDamageFrom,
      stronglyResistantTo: [],
      inmuneTo: data[0].noDamageFrom,
    }
  }

  const inmuneTo = getInmunities(data)
  const weakness = data.map((type) => type.doubleDamageFrom).flat()
  const strengths = data.map((type) => type.halfDamageFrom).flat()

  const [weakTo, stronglyWeakTo] = intersectArrays(weakness, inmuneTo)
  const [resistantTo, stronglyResistantTo] = intersectArrays(
    strengths,
    inmuneTo
  )

  return {
    names: getNameAndSlot(data),
    weakTo: removeRepeats(weakTo, resistantTo),
    stronglyWeakTo,
    resistantTo: removeRepeats(resistantTo, weakTo),
    stronglyResistantTo,
    inmuneTo,
  }
}

const getNameAndSlot = (data: { name: string; slot: number }[]) => {
  return data.map((type) => {
    return {
      name: type.name,
      slot: type.slot,
    }
  })
}

const getInmunities = (data: DataType[]) => {
  return data
    .map((type) => type.noDamageFrom)
    .flat()
    .reduce((acc: string[], curr) => {
      if (!acc.includes(curr)) return [...acc, curr]
      return acc
    }, [])
}

const intersectArrays = (data: string[], inmuneTo: string[]) => {
  const weakness = data.filter((type) => !inmuneTo.includes(type))

  const tierUp = weakness.filter(
    (item, index) => weakness.indexOf(item) !== index
  )
  const sameTier = weakness.filter((type) => !tierUp.includes(type))

  return [sameTier, tierUp]
}

const removeRepeats = (arr1: string[], arr2: string[]) => {
  return arr1.filter((elem) => !arr2.includes(elem))
}
