import { useState, useEffect, useRef } from "react";
import { fetchCharacters } from "@/services/fetchCharacters";
import { Character } from "@/types/Character";

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isFetched = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadCharacters = async () => {
      if (isFetched.current) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const charData = await fetchCharacters(signal);
        if (!signal.aborted) {
          setCharacters(charData);
          isFetched.current = true;
        }
      } catch (err) {
        if (!signal.aborted) {
          console.error("Erro ao buscar personagens:", err);
          setError("Erro ao carregar personagens. Tente novamente.");
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadCharacters();

    return () => controller.abort(); // Cancela a requisição se o componente desmontar
  }, []);

  return { characters, loading, error };
}
