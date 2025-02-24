"use client";

import { useEffect, useState } from "react";
import { fetchCharacters } from "@/services/swapiService";
import { Character } from "@/types/swapi";
import CharacterCard from "@/components/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
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
      <Header />
      <Navbar selectedPlanet={selectedPlanet} setSelectedPlanet={setSelectedPlanet} planets={planets} />

      <main>
        <section className="section" aria-labelledby="characters-title">
          <h2 id="characters-title" className="section-title">Todos os Personagens</h2>

          <div className="characters-grid">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
              : filteredCharacters.length > 0 ? (
                  filteredCharacters.slice(0, visibleCount).map((char, index) => (
                    <CharacterCard key={index} character={char} index={index} />
                  ))
                ) : (
                  <p className="no-characters">Nenhum personagem encontrado.</p>
                )}
          </div>

          <div className="load-more-container">
            {visibleCount < filteredCharacters.length && (
              <button
                className="load-more-button"
                onClick={loadMore}
                aria-label="Carregar mais personagens"
              >
                CARREGAR MAIS
              </button>
            )}

            {visibleCount > 8 && visibleCount >= filteredCharacters.length && (
              <button
                className="load-more-button show-less"
                onClick={showLess}
                aria-label="Mostrar menos personagens"
              >
                MOSTRAR MENOS
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
