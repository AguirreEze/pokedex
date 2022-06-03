import styles from "./styles.module.css"

interface Iprops {
  text: string
}

export default function Title({ text }: Iprops) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{text}</h2>
    </div>
  )
}
