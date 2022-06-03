import ComboDescription from "components/ComboDescription"
import ShinyButton from "components/ShinyButton"
import StatDisplay from "components/StatDisplay"
import Title from "components/Title"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getPokemon } from "services/pokemon"
import { PokemonData } from "types"
import styles from "./styles.module.css"

const isNumber = /^[0-9]+$/

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default function PokemonPage() {
  const router = useRouter()
  const [data, setData] = useState<PokemonData>()
  const [shiny, setShiny] = useState<boolean>(false)

  useEffect(() => {
    if (!router.isReady) return
    const { name } = router.query
    if (typeof name === "string") {
      getPokemon<PokemonData>(name.toLowerCase())
        .then((res) => {
          if (isNumber.test(name)) {
            router.replace(`/pokemons/${res.name}`)
          }
          setData(res)
        })
        .catch((err) => router.replace("/"))
    } else {
      router.replace("/")
    }
  }, [router.isReady])

  const handleShiny = () => {
    setShiny(!shiny)
  }

  if (!data) return <h1>loading...</h1>
  return (
    <>
      <Head>
        <title>{capitalize(data.name)} | Pokedex</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.pokemon_name}>{data.name}</h1>
        <ShinyButton onClick={handleShiny} className={styles.shiny_button} />
        {shiny ? (
          <section className={styles.sprite_display}>
            <Image src={data.sprites.frontShiny} height={150} width={150} />
            <Image src={data.sprites.backShiny} height={150} width={150} />
          </section>
        ) : (
          <section className={styles.sprite_display}>
            <Image src={data.sprites.frontDefault} height={150} width={150} />
            <Image src={data.sprites.backDefault} height={150} width={150} />
          </section>
        )}
        <section className={styles.data_display}>
          <Title text="general" />
          <div className={styles.info_field}>
            <span className={styles.info_title}>base experience:</span>
            <span className={styles.info_data}>{data.baseExperience}</span>
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>height:</span>
            <span className={styles.info_data}>{data.height}</span>
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>weight:</span>
            <span className={styles.info_data}>{data.weight}</span>
          </div>
          <Title text="types" />
          <div className={styles.info_field}>
            <span className={styles.info_title}>types:</span>
            {data.types.names.map((info) => (
              <span key={info.name} className={styles.info_data}>
                {info.name}
              </span>
            ))}
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>weakness:</span>
            {data.types.resistantTo.length === 0 ? (
              <span className={styles.info_data}>none</span>
            ) : (
              data.types.weakTo.map((info) => (
                <span key={info} className={styles.info_data}>
                  {info}
                </span>
              ))
            )}
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>strong weakness:</span>
            {data.types.stronglyWeakTo.length === 0 ? (
              <span className={styles.info_data}>none</span>
            ) : (
              data.types.stronglyWeakTo.map((info) => (
                <span key={info} className={styles.info_data}>
                  {info}
                </span>
              ))
            )}
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>resistances:</span>
            {data.types.resistantTo.length === 0 ? (
              <span className={styles.info_data}>none</span>
            ) : (
              data.types.resistantTo.map((info) => (
                <span key={info} className={styles.info_data}>
                  {info}
                </span>
              ))
            )}
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>strong resistances:</span>
            {data.types.stronglyResistantTo.length === 0 ? (
              <span className={styles.info_data}>none</span>
            ) : (
              data.types.stronglyResistantTo.map((info) => (
                <span key={info} className={styles.info_data}>
                  {info}
                </span>
              ))
            )}
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>inmunities:</span>
            {data.types.inmuneTo.length === 0 ? (
              <span className={styles.info_data}>none</span>
            ) : (
              data.types.inmuneTo.map((info) => (
                <span key={info} className={styles.info_data}>
                  {info}
                </span>
              ))
            )}
          </div>
          <div className={styles.info_list}>
            <Title text="abilities" />
            {data.abilities.map((info) => (
              <ComboDescription
                key={info.name}
                name={info.isHidden ? `${info.name}(h)` : info.name}
                description={info.description}
              />
            ))}
          </div>
          <div className={styles.info_list}>
            <Title text="stats" />
            {data.stats.map((info) => (
              <StatDisplay
                key={info.name}
                name={info.name}
                baseStats={info.baseStats}
              />
            ))}
          </div>
          <div className={styles.info_list}>
            <Title text="held items" />
            {data.heldItems.length ? (
              data.heldItems.map((info) => (
                <ComboDescription
                  key={info.name}
                  name={info.name}
                  description={info.effect}
                />
              ))
            ) : (
              <span className={styles.info_data}>none</span>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
