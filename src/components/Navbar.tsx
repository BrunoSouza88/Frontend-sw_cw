import { useEffect, useState } from "react";
import styles from "@/styles/Navbar.module.css";

interface NavbarProps {
  selectedPlanet: string;
  setSelectedPlanet: (planet: string) => void;
}

export default function Navbar({ selectedPlanet, setSelectedPlanet }: NavbarProps) {
  const [planets, setPlanets] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("/api/proxy?endpoint=planets");
        const data = await response.json();
        const planetNames = data.results.map((planet: { name: string }) => planet.name);
        setPlanets(["All", ...planetNames]); // Adiciona "All" como primeira opção
      } catch (error) {
        console.error("Erro ao buscar planetas:", error);
      }
    };

    fetchPlanets();
  }, []);

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
          {planets.map((planet, index) => (
            <option key={index} value={planet}>
              {planet}
            </option>
          ))}
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
