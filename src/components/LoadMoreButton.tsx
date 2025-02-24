import styles from "@/styles/LoadMoreButton.module.css"

interface LoadMoreButtonProps {
  onClick: () => void;
}

export default function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <button className={styles.button} onClick={onClick} aria-label="Carregar mais personagens">
      LOAD MORE
    </button>
  );
}
