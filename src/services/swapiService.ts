import { Character, Planet } from "@/types/swapi";

const BASE_URL = "https://swapi.dev/api";

/**
 * Busca o nome do planeta a partir da URL.
 */
export const fetchPlanetName = async (planetUrl: string): Promise<string> => {
  try {
    const response = await fetch(planetUrl);
    if (!response.ok) {
      throw new Error("Erro ao buscar planeta.");
    }
    const data: Planet = await response.json();
    return data.name;
  } catch (error) {
    console.error(error);
    return "Desconhecido";
  }
};

/**
 * Busca todos os personagens e substitui `homeworld` pelo nome real do planeta.
 */
export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${BASE_URL}/people/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar personagens.");
    }
    const data = await response.json();

    // Buscar nome do planeta para cada personagem
    const charactersWithPlanets = await Promise.all(
      data.results.map(async (char: Character) => {
        const planetName = await fetchPlanetName(char.homeworld);
        return { ...char, homeworld: planetName };
      })
    );

    return charactersWithPlanets;
  } catch (error) {
    console.error(error);
    return [];
  }
};
