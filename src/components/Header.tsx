import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Star Wars Characters</h1>
      <p className={styles.headerDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices.
      </p>
    </header>
  );
}
