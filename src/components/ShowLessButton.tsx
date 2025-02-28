import styles from "@/styles/Button.module.css";
import { ShowLessButtonProps } from "@/types/ShowLessButtonProps";

export default function ShowLessButton({ onClick, disabled }: ShowLessButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles.showLess}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Mostrar menos personagens"
      aria-disabled={disabled}
    >
      SHOW LESS
    </button>
  );
}
