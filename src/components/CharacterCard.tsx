import Image from "next/image";
import { Character } from "@/types/swapi";

interface CharacterCardProps {
  character: Character;
  index: number;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className="character-card">
      <Image
        src={`/images/characters/${character.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
        alt={character.name}
        width={300}
        height={300}
        className="character-image"
        onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
      />
      <div className="character-info">
        <h3>{character.name}</h3>
        <h5>{character.homeworld}</h5>
        <p>Height • {character.height}</p>
        <p>Mass • {character.mass}</p>
        <p>Gender • {character.gender}</p>
      </div>
    </article>
  );
}
