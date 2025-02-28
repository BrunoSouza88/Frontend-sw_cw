import styles from "@/styles/Button.module.css";
import { ShowLessButtonProps } from "@/types/ShowLessButtonProps";

export default function ShowLessButton({ onClick }: ShowLessButtonProps) {
  return (
    <button className={`${styles.button} ${styles.showLess}`} onClick={onClick} aria-label="Mostrar menos personagens">
      SHOW LESS
    </button>
  );
}
