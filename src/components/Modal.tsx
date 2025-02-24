import Image from "next/image";
import styles from "@/styles/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: {
    name: string;
    homeworld: string;
    height: string;
    mass: string;
    gender: string;
  };
}

export default function Modal({ isOpen, onClose, character }: ModalProps) {
  if (!isOpen) return null;

  // Gerando o nome correto da imagem
  const normalizedName = character.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const imageUrl = `/images/characters/${normalizedName}.jpg`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <Image
          src={imageUrl}
          alt={character.name}
          width={400} // Ajuste para tamanho maior
          height={300} // Ajuste para manter proporção melhor
          className={styles.modalImage}
          onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
        />
        <div className={styles.characterDetails}>
          <h2>{character.name}</h2>
          <p>Planeta: {character.homeworld}</p>
          <p>Altura: {character.height} cm</p>
          <p>Peso: {character.mass} kg</p>
          <p>Gênero: {character.gender}</p>
        </div>
      </div>
    </div>
  );
}
