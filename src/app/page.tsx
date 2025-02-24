"use client";

import { useState, useEffect } from "react";
import { fetchCharacters } from "@/services/swapiService";
import { Character } from "@/types/swapi";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import CharacterCard from "@/components/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import ShowLessButton from "@/components/ShowLessButton";
import { useSectionTitle } from "@/hooks/useSectionTitle";
import "../styles/global.css";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const charData = await fetchCharacters();
      setCharacters(charData);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredCharacters =
    selectedPlanet === "All"
      ? characters
      : characters.filter((char) => char.homeworld === selectedPlanet);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const showLess = () => {
    setVisibleCount(8);
  };

  const title = useSectionTitle(selectedPlanet);

  return (
    <div className="container">
      <Header />
      <Navbar selectedPlanet={selectedPlanet} setSelectedPlanet={setSelectedPlanet} />

      <main>
        <section className="section">
          <h2 className="section-title">{title}</h2>

          <div className="characters-grid">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
              : filteredCharacters.slice(0, visibleCount).map((char, index) => (
                  <CharacterCard key={index} character={char} />
                ))}
          </div>

          {!loading && (
            <div className="load-more-container">
              {visibleCount < filteredCharacters.length ? (
                <LoadMoreButton onClick={loadMore} />
              ) : (
                visibleCount > 8 && <ShowLessButton onClick={showLess} />
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
