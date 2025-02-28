import { Character } from "./Character";

export interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  className?: string;
}