import ShinyButton from "components/ShinyButton"
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
    getPokemon<PokemonData>(name as string)
      .then((res) => {
        if (isNumber.test(name as string)) {
          router.replace(`/pokemons/${res.name}`)
        }
        setData(res)
      })
      .catch((err) => router.replace("/"))
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
            <Image src={data.sprites.front_shiny} height={150} width={150} />
            <Image src={data.sprites.back_shiny} height={150} width={150} />
          </section>
        ) : (
          <section className={styles.sprite_display}>
            <Image src={data.sprites.front_default} height={150} width={150} />
            <Image src={data.sprites.back_default} height={150} width={150} />
          </section>
        )}
        <section className={styles.data_display}>
          <div className={styles.info_field}>
            <span className={styles.info_title}>base experience:</span>
            <span className={styles.info_data}>{data.base_experience}</span>
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>height:</span>
            <span className={styles.info_data}>{data.height}</span>
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>weight:</span>
            <span className={styles.info_data}>{data.weight}</span>
          </div>
          <div className={styles.info_field}>
            <span className={styles.info_title}>types:</span>
            {data.types.map((info) => (
              <span key={info.type.name} className={styles.info_data}>
                {info.type.name}
              </span>
            ))}
          </div>
          <div className={styles.info_list}>
            <span className={styles.info_title}>abilities:</span>
            {data.abilities.map((info) => (
              <span key={info.ability.name} className={styles.info_data}>
                {info.ability.name}
                {info.is_hidden && "(h)"}
              </span>
            ))}
          </div>
          <div className={styles.info_list}>
            <span className={styles.info_title}>stats:</span>
            {data.stats.map((info) => (
              <div className={styles.info_field}>
                <span key={info.stat.name} className={styles.stats_name}>
                  {info.stat.name}:
                </span>
                <span className={styles.stats_value}>{info.base_stat}</span>
              </div>
            ))}
          </div>
          <div className={styles.info_list}>
            <span className={styles.info_title}>held items:</span>
            {data.held_items.length ? (
              data.held_items.map((info) => (
                <span key={info.item.name} className={styles.info_data}>
                  {info.item.name}
                </span>
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