import Image from "next/image";
import styles from "@/styles/CharacterCard.module.css";
import { Character } from "@/types/swapi";

interface CharacterCardProps {
  character: Character;
  onClick: () => void; // Nova propriedade para abrir o modal
}

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const normalizedName = character.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const imageUrl = `/images/characters/${normalizedName}.jpg`;

  return (
    <article className={styles.characterCard} onClick={onClick} tabIndex={0} role="button">
      <Image
        src={imageUrl}
        alt={`Imagem de ${character.name}`}
        width={300}
        height={300}
        className={styles.characterImage}
        onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
      />
      <div className={styles.characterInfo}>
        <h3 className={styles.characterName}>{character.name}</h3>
        <h5 className={styles.characterPlanet}>{character.homeworld}</h5>
        <div className={styles.characterAttributes}>
          <p>Altura: {character.height} cm</p>
          <p>Peso: {character.mass} kg</p>
          <p>Gênero: {character.gender}</p>
        </div>
      </div>
    </article>
  );
}
