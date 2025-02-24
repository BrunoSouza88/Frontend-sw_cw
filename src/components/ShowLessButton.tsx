import styles from "@/styles/ShowLessButton.module.css";

interface ShowLessButtonProps {
  onClick: () => void;
}

export default function ShowLessButton({ onClick }: ShowLessButtonProps) {
  return (
    <button className={`${styles.button} ${styles.showLess}`} onClick={onClick} aria-label="Mostrar menos personagens">
      SHOW LESS
    </button>
  );
}
