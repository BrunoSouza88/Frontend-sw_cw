"use client";

import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import CharacterCard from "@/components/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import ShowLessButton from "@/components/ShowLessButton";
import "../styles/global.css";

export default function Home() {
  const { characters, loading } = useCharacters();
  const [selectedPlanet, setSelectedPlanet] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const filteredCharacters =
    selectedPlanet === "All"
      ? characters
      : characters.filter((char) => char.homeworld === selectedPlanet);

  const loadMore = () => setVisibleCount((prev) => prev + 8);
  const showLess = () => setVisibleCount(8);

  return (
    <div className="container">
      <Header />
      <Navbar selectedPlanet={selectedPlanet} setSelectedPlanet={setSelectedPlanet} />

      <main>
        <section className="section">
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
