import styles from "./styles.module.css"

interface Iprops {
  children: string
  type: "button" | "submit"
  className?: string
  disabled?: boolean
  onClick: () => void
}

export default function Button({
  children,
  type,
  className,
  onClick,
  disabled,
}: Iprops) {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
