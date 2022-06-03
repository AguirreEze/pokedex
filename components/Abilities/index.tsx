import { useState } from "react"
import { PokemonData } from "types"
import styles from "./styles.module.css"

interface Iprops {
  info: PokemonData["abilities"][0]
}

export default function Abilities({ info }: Iprops) {
  const [show, setShow] = useState(false)
  return (
    <section className={styles.container}>
      <button onClick={() => setShow(!show)} className={styles.button}>
        <span>{info.name}</span>
        {info.isHidden && <span>(h)</span>}
        <div className={show ? styles.arrow_down : styles.arrow_up}>
          <span>{">"}</span>
        </div>
      </button>
      {show && <span className={styles.description}>{info.description}</span>}
    </section>
  )
}
