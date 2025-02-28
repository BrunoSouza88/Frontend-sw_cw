import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header} role="banner" aria-labelledby="header-title" aria-describedby="header-description">
      <h1 id="header-title" className={styles.headerTitle}>Star Wars Characters</h1>
      <p id="header-description" className={styles.headerDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices.
      </p>
    </header>
  );
}
