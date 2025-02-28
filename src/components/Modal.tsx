import Image from "next/image";
import styles from "@/styles/Modal.module.css";
import { IoClose } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { ModalProps } from "@/types/ModalProps";

export default function Modal({ character, onClose }: ModalProps) {
  if (!character) return null;
  
  const normalizedName = character.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  const imageUrl = `/images/characters/${normalizedName}.jpg`;

  const shareMessage = `${character.name} - Star Wars\n
Planeta: ${character.homeworld}
Altura: ${character.height} cm
Peso: ${character.mass} kg
Gênero: ${character.gender}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar modal">
          <IoClose size={24} />
        </button>

        <Image
          src={imageUrl}
          alt={`Imagem de ${character.name}`}
          width={400}
          height={400}
          className={styles.modalImage}
          onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
        />

        <div className={styles.characterDetails}>
          <h2>{character.name}</h2>
          <p><strong>Planeta:</strong> {character.homeworld}</p>
          <p><strong>Altura:</strong> {character.height} cm</p>
          <p><strong>Peso:</strong> {character.mass} kg</p>
          <p><strong>Gênero:</strong> {character.gender}</p>
        </div>

        <div className={styles.shareContainer}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.shareButton} aria-label="Compartilhar no WhatsApp">
            <FaWhatsapp className={styles.shareIcon} />
          </a>
        </div>
      </div>
    </div>
  );
}
