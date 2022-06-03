import { useState } from "react"
import styles from "./styles.module.css"

interface Iprops {
  name: string
  description: string
}

export default function ComboDescription({ name, description }: Iprops) {
  const [show, setShow] = useState(false)
  return (
    <section className={styles.container}>
      <button onClick={() => setShow(!show)} className={styles.button}>
        <span>{name}</span>
        <div className={show ? styles.arrow_down : styles.arrow_up}>
          <span>{">"}</span>
        </div>
      </button>
      {show && <span className={styles.description}>{description}</span>}
    </section>
  )
}
