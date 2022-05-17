import { PokemonSearchType } from "types"
import styles from "./styles.module.css"

interface Iprops {
  data: PokemonSearchType
}

export default function SearchResult({ data }: Iprops) {
  return <li className={styles.item}>{data.name}</li>
}
