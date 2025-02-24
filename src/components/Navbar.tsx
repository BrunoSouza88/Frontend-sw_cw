import styles from "@/styles/Navbar.module.css";

interface NavbarProps {
  selectedPlanet: string;
  setSelectedPlanet: (planet: string) => void;
}

export default function Navbar({ selectedPlanet, setSelectedPlanet }: NavbarProps) {
  return (
    <nav className={styles.navbar} aria-label="Filtro de personagens">
      <div className={styles.filterContainer}>
        <label htmlFor="planetFilter" className={styles.filterLabel}>Filter By:</label>
        <select
          id="planetFilter"
          value={selectedPlanet}
          onChange={(e) => setSelectedPlanet(e.target.value)}
          className={styles.filterDropdown}
          aria-label="Selecionar planeta"
        >
          <option value="All">All</option>
          <option value="Tatooine">Tatooine</option>
          <option value="Naboo">Naboo</option>
        </select>
      </div>

      <button
        className={styles.buttonClear}
        onClick={() => setSelectedPlanet("All")}
        aria-label="Limpar filtros e mostrar todos os personagens"
      >
        CLEAR ALL
      </button>
    </nav>
  );
}
