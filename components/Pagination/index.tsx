import Button from "components/Button"
import { useState } from "react"
import styles from "./styles.module.css"

export default function Pagination() {
  const [page, setPage] = useState<number>(1)

  const handleClickPrevious = () => {}

  const handleClickNext = () => {}

  return (
    <footer className={styles.footer}>
      <Button
        type="button"
        className={`${styles.button1}`}
        onClick={handleClickPrevious}
      >
        {"<"}
      </Button>
      <span className={styles.page}>{page}</span>
      <Button
        type="button"
        className={`${styles.button2}`}
        onClick={handleClickNext}
      >
        {">"}
      </Button>
    </footer>
  )
}
