"use client";

import { useState, useEffect } from "react";
import { fetchCharacters } from "@/services/swapiService";
import { Character } from "@/types/swapi";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import FilterableCharacters from "@/components/FilterableCharacters";
import "../styles/global.css";

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const charData = await fetchCharacters();
      setCharacters(charData);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="container">
      <Header />
      <Navbar selectedPlanet={selectedPlanet} setSelectedPlanet={setSelectedPlanet} />
      <main>
        <FilterableCharacters 
          characters={characters} 
          loading={loading} 
          selectedPlanet={selectedPlanet} 
          onCharacterClick={(char) => setSelectedCharacter(char)} 
        />
      </main>
      {selectedCharacter && (
        <Modal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}
    </div>
  );
}
