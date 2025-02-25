import { useState } from "react";
import { Character } from "@/types/swapi";
import { useSectionTitle } from "@/hooks/useSectionTitle";
import CharacterList from "@/components/CharacterList";
import LoadButtons from "@/components/LoadButtons";
import styles from "@/styles/FilterableCharacters.module.css";

interface FilterableCharactersProps {
  characters: Character[];
  loading: boolean;
  selectedPlanet: string;
  onCharacterClick: (char: Character) => void;
}

export default function FilterableCharacters({ 
  characters, 
  loading, 
  selectedPlanet, 
  onCharacterClick 
}: FilterableCharactersProps) {
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const title = useSectionTitle(selectedPlanet);
  const filteredCharacters = characters.filter((char) => selectedPlanet === "All" || char.homeworld === selectedPlanet);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <CharacterList 
        characters={filteredCharacters} 
        visibleCount={visibleCount} 
        loading={loading} 
        onCharacterClick={onCharacterClick} 
      />
      {!loading && (
        <LoadButtons 
          visibleCount={visibleCount} 
          totalCharacters={filteredCharacters.length} 
          setVisibleCount={setVisibleCount} 
        />
      )}
    </section>
  );
}
