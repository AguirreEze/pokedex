import { useState } from "react"
import styles from "./styles.module.css"

interface Iprops {
  onClick: () => void
}

export default function ShinyButton({ onClick }: Iprops) {
  const [active, setActive] = useState(false)

  function handleClick() {
    setActive(!active)
    onClick()
  }

  return (
    <button type="button" onClick={handleClick} className={styles.button}>
      <svg height={21} width={21} xmlns="http://www.w3.org/2000/svg">
        <path
          d="m10.5 14.5-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z"
          fill={active ? "currentColor" : "black"}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
