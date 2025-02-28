import { Character } from "./Character";

export interface CharacterListProps {
  characters: Character[];
  visibleCount: number;
  loading: boolean;
  onCharacterClick: (char: Character) => void;
}