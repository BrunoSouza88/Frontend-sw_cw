import { useState, useEffect } from "react";
import { fetchCharacters } from "@/services/swapiService";
import { Character } from "@/types";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const charData = await fetchCharacters();
      setCharacters(charData);
      setLoading(false);
    };

    loadCharacters();
  }, []);

  return { characters, loading };
}
