import Image from "next/image";
import { Character } from "@/types/swapi";
import styles from "@/styles/CharacterCard.module.css";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className={styles.characterCard} aria-labelledby={`char-${character.name}`}>
      <Image
        src={`/images/characters/${character.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
        alt={`Imagem de ${character.name}`}
        width={300}
        height={300}
        className={styles.characterImage}
        onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
      />
      <div className={styles.characterInfo}>
        <h3 id={`char-${character.name}`}>{character.name}</h3>
        <h5>{character.homeworld}</h5>
        <p>Altura • {character.height} cm</p>
        <p>Peso • {character.mass} kg</p>
        <p>Gênero • {character.gender}</p>
      </div>
    </article>
  );
}
