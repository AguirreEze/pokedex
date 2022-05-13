import styles from "./styles.module.css"

interface Iprops {
  children: string
  type: "button" | "submit"
  className?: string
  onClick: () => void
}

export default function Button({ children, type, className, onClick }: Iprops) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
