import Image from "next/image";
import styles from "@/styles/CharacterCard.module.css";
import { CharacterCardProps } from "@/types/CharacterCardProps";
import { defaultImage } from "@/utils/defaultImage";
import { normalizeName } from "@/utils/normalizeName";

export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  const imageUrl = `/images/characters/${normalizeName(character.name)}.jpg`;

  return (
    <article className={styles.characterCard} onClick={onClick} tabIndex={0} role="button">
      <Image
        src={imageUrl}
        alt={`Retrato de ${character.name} de Star Wars`}
        width={300}
        height={300}
        className={styles.characterImage}
        onError={defaultImage}
      />
      <div className={styles.characterInfo}>
        <h3 className={styles.characterName}>{character.name}</h3>
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