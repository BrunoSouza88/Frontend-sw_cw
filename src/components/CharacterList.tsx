import { CharacterListProps } from "@/types/CharacterListProps";
import CharacterCard from "@/components/CharacterCard";
import SkeletonCard from "@/components/SkeletonCard";
import styles from "@/styles/CharacterList.module.css";

export default function CharacterList({ characters, visibleCount, loading, onCharacterClick }: CharacterListProps) {
  return (
    <div
      className={`${styles.charactersGrid} fading-in`}
      role="region"
      aria-label="Lista de personagens de Star Wars"
      aria-live="polite"
      aria-busy={loading}
    >
      {loading
        ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
        : characters.slice(0, visibleCount).map((char, index) => (
            <CharacterCard key={index} character={char} onClick={() => onCharacterClick(char)} />
          ))}
    </div>
  );
}
