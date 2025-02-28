import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/Modal.module.css";
import { IoClose } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { ModalProps } from "@/types/ModalProps";
import { normalizeName } from "@/utils/normalizeName";

export default function Modal({ character, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!character) return;

    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [character, onClose]);

  if (!character) return null;

  const imageUrl = `/images/characters/${normalizeName(character.name)}.jpg`

  const shareMessage = `${character.name} - Star Wars\n
Planeta: ${character.homeworld}
Altura: ${character.height} cm
Peso: ${character.mass} kg
Gênero: ${character.gender}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
      tabIndex={-1}
      ref={modalRef}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <IoClose size={24} />
        </button>

        <Image
          src={imageUrl}
          alt={`Imagem de ${character.name}`}
          width={400}
          height={400}
          className={styles.modalImage}
          onError={(e) => (e.currentTarget.src = "/images/characters/default.jpg")}
          priority
        />

        <div className={styles.characterDetails}>
          <h2 id="modal-title">{character.name}</h2>
          <p><strong>Planeta:</strong> {character.homeworld}</p>
          <p><strong>Altura:</strong> {character.height} cm</p>
          <p><strong>Peso:</strong> {character.mass} kg</p>
          <p><strong>Gênero:</strong> {character.gender}</p>
        </div>

        <div className={styles.shareContainer}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.shareButton}
            aria-label={`Compartilhar informações de ${character.name} no WhatsApp`}
          >
            <FaWhatsapp className={styles.shareIcon} />
          </a>
        </div>
      </div>
    </div>
  );
}
