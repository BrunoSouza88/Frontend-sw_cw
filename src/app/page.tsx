"use client";

import { useState } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { Character } from "@/types/Character";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import FilterableCharacters from "@/components/FilterableCharacters";
import "../styles/global.css";

export default function Home() {
  const { characters, loading } = useCharacters();
  const [selectedPlanet, setSelectedPlanet] = useState<string>("All");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div className="container">
      <Header />
      <Navbar selectedPlanet={selectedPlanet} setSelectedPlanet={setSelectedPlanet} />
      <main>
        <FilterableCharacters 
          characters={characters} 
          loading={loading} 
          selectedPlanet={selectedPlanet} 
          onCharacterClick={setSelectedCharacter} 
        />
      </main>
      {selectedCharacter && (
        <Modal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}
    </div>
  );
}
