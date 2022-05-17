import Button from "components/Button"
import { SearchContext } from "components/SearchProvider"
import { useContext } from "react"
import styles from "./styles.module.css"

export default function Pagination() {
  const { state, dispatch } = useContext(SearchContext)

  const handleClickPrevious = () => {
    dispatch({ type: "PAGE_DOWN" })
  }

  const handleClickNext = () => {
    dispatch({ type: "PAGE_UP" })
  }

  return (
    <footer className={styles.footer}>
      <Button
        type="button"
        className={`${styles.button1}`}
        onClick={handleClickPrevious}
        disabled={state.page === 1}
      >
        {"<"}
      </Button>
      <span className={styles.page}>{state.page}</span>
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
