import styles from "@/styles/SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={styles.skeletonImage}></div>
      <div className={`${styles.skeletonText} ${styles.skeletonTitle}`}></div>
      <div className={`${styles.skeletonText} ${styles.skeletonSubtitle}`}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );
}
