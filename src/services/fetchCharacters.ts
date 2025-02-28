import { Character } from "@/types/Character";
import { fetchPlanets } from "./fetchPlanets";

export const fetchCharacters = async (signal?: AbortSignal): Promise<Character[]> => {
  try {
    const response = await fetch("/api/proxy?endpoint=people", { signal });
    if (!response.ok) throw new Error("Erro ao buscar personagens.");
    
    const data = await response.json();
    const planetMap = await fetchPlanets();

    return data.results.map((char: Character) => {
      const planetIdMatch = char.homeworld?.match(/\/planets\/(\d+)\//);
      return {
        ...char,
        homeworld: planetIdMatch ? planetMap[planetIdMatch[1]] || "Desconhecido" : "Desconhecido",
      };
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        console.warn("Requisição cancelada.");
        return [];
      }
      console.error("Erro ao buscar personagens:", error.message);
    } else {
      console.error("Erro desconhecido ao buscar personagens", error);
    }
    return [];
  }
};
