import Link from "next/link"
import { PokemonResultType } from "types"
import styles from "./styles.module.css"

interface Iprops {
  data: PokemonResultType
}

export default function SearchResult({ data }: Iprops) {
  return (
    <Link href={`/pokemons/${data.name}`}>
      <li className={styles.item}>
        <a>{data.name}</a>
      </li>
    </Link>
  )
}
