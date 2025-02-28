import { LoadMoreButtonProps } from "@/types/LoadMoreButtonProps"
import styles from "@/styles/Button.module.css";

export default function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <button className={styles.button} onClick={onClick} aria-label="Carregar mais personagens">
      LOAD MORE
    </button>
  );
}
