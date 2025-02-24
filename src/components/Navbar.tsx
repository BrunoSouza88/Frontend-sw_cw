interface NavbarProps {
  selectedPlanet: string;
  setSelectedPlanet: (planet: string) => void;
  planets: string[];
}

export default function Navbar({ selectedPlanet, setSelectedPlanet, planets }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="filter-container">
        <label htmlFor="planetFilter" className="filter-label">Filter By:</label>
        <select
          id="planetFilter"
          value={selectedPlanet}
          onChange={(e) => setSelectedPlanet(e.target.value)}
          className="filter-dropdown"
        >
          {planets.map((planet, index) => (
            <option key={index} value={planet}>
              {planet}
            </option>
          ))}
        </select>
      </div>

      <button className="button-clear" onClick={() => setSelectedPlanet("All")}>
        Clear All
      </button>
    </nav>
  );
}
