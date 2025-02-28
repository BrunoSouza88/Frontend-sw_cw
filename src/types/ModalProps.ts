import { Character } from "./Character";

export interface ModalProps {
  character: Character | null;
  onClose: () => void;
}