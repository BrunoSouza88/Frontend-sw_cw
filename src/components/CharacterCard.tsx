import Image from "next/image";
import styles from "@/styles/CharacterCard.module.css";
import { CharacterCardProps } from "@/types/CharacterCardProps";
import { defaultImage } from "@/utils/defaultImage";
import { normalizeName } from "@/utils/normalizeName";

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const imageUrl = `/images/characters/${normalizeName(character.name)}.jpg`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick();
    }
  };

  return (
    <article
      className={styles.characterCard}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-labelledby={`character-${normalizeName(character.name)}`}
      aria-label={`Clique para ver mais detalhes sobre ${character.name}`}
    >
      <Image
        src={imageUrl}
        alt={`Retrato de ${character.name} de Star Wars`}
        width={300}
        height={300}
        className={styles.characterImage}
        onError={defaultImage}
      />
      <div className={styles.characterInfo}>
        <h3 id={`character-${normalizeName(character.name)}`} className={styles.characterName}>
          {character.name}
        </h3>
        <h5 className={styles.characterPlanet}>{character.homeworld}</h5>
        <div className={styles.characterAttributes}>
          <p>Altura • {character.height} cm</p>
          <p>Peso • {character.mass} kg</p>
          <p>Gênero • {character.gender}</p>
        </div>
      </div>
    </article>
  );
}
