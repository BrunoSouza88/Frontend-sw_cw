export interface LoadButtonsProps {
  visibleCount: number;
  totalCharacters: number;
  setVisibleCount: (count: number | ((prev: number) => number)) => void;
}