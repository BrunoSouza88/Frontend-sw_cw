import { LoadButtonsProps } from "@/types/LoadButtonsProps"
import LoadMoreButton from "@/components/LoadMoreButton";
import ShowLessButton from "@/components/ShowLessButton";
import styles from "@/styles/LoadButtons.module.css";

export default function LoadButtons({ visibleCount, totalCharacters, setVisibleCount }: LoadButtonsProps) {
  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const showLess = () => {
    setVisibleCount(8);
  };

  return (
    <div className={styles.loadMoreContainer}>
      {visibleCount < totalCharacters ? (
        <LoadMoreButton onClick={loadMore} />
      ) : (
        visibleCount > 8 && <ShowLessButton onClick={showLess} />
      )}
    </div>
  );
}
