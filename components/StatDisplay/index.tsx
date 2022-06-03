import styles from "./styles.module.css"

interface Iprops {
  name: string
  baseStats: number
}

export default function StatDisplay({ name, baseStats }: Iprops) {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>
      <span className={styles.value}>{baseStats}</span>
      <span className={styles.bar}>
        <svg viewBox="0 0 30 300">
          <path />
        </svg>
      </span>
    </div>
  )
}
