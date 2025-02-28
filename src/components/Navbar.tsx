import { useEffect, useState, useRef } from "react";
import { usePlanets } from "@/hooks/usePlanets";
import styles from "@/styles/Navbar.module.css";
import { NavbarProps } from "@/types/NavbarProps";

export default function Navbar({ selectedPlanet, setSelectedPlanet }: NavbarProps) {
  const { planets, loading } = usePlanets();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const clearButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsFilterActive(selectedPlanet !== "All");
    
    if (selectedPlanet !== "All") {
      clearButtonRef.current?.focus();
    }
  }, [selectedPlanet]);

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
          disabled={loading}
          aria-live="polite"
        >
          <option value="All">All</option>
          {planets
            .filter((planet) => planet !== "All")
            .map((planet, index) => (
              <option key={index} value={planet}>
                {planet}
              </option>
            ))}
          <option value="Desconhecido">Desconhecido</option>
        </select>
      </div>

      <button
        ref={clearButtonRef}
        className={`${styles.buttonClear} ${isFilterActive ? styles.active : ""}`}
        onClick={() => setSelectedPlanet("All")}
        aria-label="Limpar filtros e mostrar todos os personagens"
      >
        CLEAR ALL
      </button>
    </nav>
  );
}
