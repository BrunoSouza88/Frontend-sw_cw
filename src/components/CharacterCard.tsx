import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/CharacterCard.module.css";
import Modal from "@/components/Modal";

interface CharacterCardProps {
  character: {
    name: string;
    homeworld: string;
    height: string;
    mass: string;
    gender: string;
  };
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const normalizedName = character.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const imageUrl = `/images/characters/${normalizedName}.jpg`;

  return (
    <>
      <div className={styles.characterCard}>
        <Image
          src={imageUrl}
          alt={character.name}
          width={300}
          height={200}
          className={styles.characterImage}
          onClick={() => setModalOpen(true)}
          style={{ cursor: "pointer" }}
          onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
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
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        character={character}
      />
    </>
  );
}
