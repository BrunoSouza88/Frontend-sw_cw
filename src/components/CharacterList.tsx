import { Character } from "@/types/swapi";
import CharacterCard from "@/components/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard";
import styles from "@/styles/CharacterList.module.css";

interface CharacterListProps {
  characters: Character[];
  visibleCount: number;
  loading: boolean;
  onCharacterClick: (char: Character) => void;
}

export default function CharacterList({ characters, visibleCount, loading, onCharacterClick }: CharacterListProps) {
  return (
    <div className={`${styles.charactersGrid} fading-in`}>
      {loading
        ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        : characters.slice(0, visibleCount).map((char, index) => (
            <CharacterCard key={index} character={char} onClick={() => onCharacterClick(char)} />
          ))}
    </div>
  );
}
