"use client";

import { useEffect, useState } from "react";
import { fetchCharacters } from "@/services/swapiService";
import { Character } from "@/types/swapi";
import Image from "next/image";
import "../styles/global.css";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [planets, setPlanets] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setTimeout(async () => {
        const charData = await fetchCharacters();

        const uniquePlanets = Array.from(new Set(charData.map((char) => char.homeworld)))
          .filter((planet) => planet !== undefined && planet !== null)
          .sort();

        setCharacters(charData);
        setPlanets(["All", ...uniquePlanets]);
        setLoading(false);
      }, 2000);
    };

    loadData();
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const showLess = () => {
    setVisibleCount(8);
  };

  const filteredCharacters =
    selectedPlanet === "All"
      ? characters
      : characters.filter((char) => char.homeworld === selectedPlanet);

  return (
    <div className="container">
      <header className="header">
        <h1 className="header-title">Star Wars Characters</h1>
        <p className="header-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices.
        </p>
      </header>
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

        <button
          className="button-clear"
          onClick={() => setSelectedPlanet("All")}
        >
          Clear All
        </button>
      </nav>
      <section className="section">
        <h2 className="section-title">All Characters</h2>
        <div className="characters-grid">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="character-card skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text skeleton-title"></div>
                  <div className="skeleton-text skeleton-subtitle"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                  <div className="skeleton-text"></div>
                </div>
              ))
            : filteredCharacters.length > 0 ? (
                filteredCharacters.slice(0, visibleCount).map((char, index) => (
                  <article key={index} className="character-card">
                    <Image
                      src={`/images/characters/${char.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                      alt={char.name}
                      width={300}
                      height={300}
                      className="character-image"
                      onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
                    />
                    <div className="character-info">
                      <h3>{char.name}</h3>
                      <h5>{char.homeworld}</h5>
                      <p>Height • {char.height}</p>
                      <p>Mass • {char.mass}</p>
                      <p>Gender • {char.gender}</p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="no-characters">Nenhum personagem encontrado.</p>
              )}
        </div>

        <div className="load-more-container">
          {visibleCount < filteredCharacters.length && (
            <button className="load-more-button" onClick={loadMore}>
              LOAD MORE
            </button>
          )}

          {visibleCount > 8 && visibleCount >= filteredCharacters.length && (
            <button className="load-more-button show-less" onClick={showLess}>
              SHOW LESS
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
