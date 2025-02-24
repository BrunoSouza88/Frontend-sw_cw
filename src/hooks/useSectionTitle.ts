import { useMemo } from "react";

export function useSectionTitle(selectedPlanet: string) {
  return useMemo(() => {
    return selectedPlanet === "All"
      ? "All Characters"
      : `Characters from ${selectedPlanet}`;
  }, [selectedPlanet]);
}
