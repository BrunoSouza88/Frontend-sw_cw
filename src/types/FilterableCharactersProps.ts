import { Character } from "./Character";

export interface FilterableCharactersProps {
  characters: Character[];
  loading: boolean;
  selectedPlanet: string;
  onCharacterClick: (char: Character) => void;
}