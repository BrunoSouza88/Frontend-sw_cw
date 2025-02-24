import { Character, Planet } from "@/types/swapi";

const BASE_PROXY_URL = "/api/proxy";

/**
 * Busca os planetas e cria um mapa de IDs para nomes.
 */
export const fetchPlanets = async (): Promise<Record<string, string>> => {
  try {
    const response = await fetch(`${BASE_PROXY_URL}?endpoint=planets`);
    if (!response.ok) {
      throw new Error("Erro ao buscar planetas.");
    }

    const data = await response.json();
    const planetMap: Record<string, string> = {};

    data.results.forEach((planet: Planet) => {
      const planetIdMatch = planet.url.match(/\/planets\/(\d+)\//);
      if (planetIdMatch) {
        planetMap[planetIdMatch[1]] = planet.name;
      }
    });

    return planetMap;
  } catch (error) {
    console.error(error);
    return {};
  }
};

/**
 * Busca personagens e associa os planetas correspondentes.
 */
export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(`${BASE_PROXY_URL}?endpoint=people`);
    if (!response.ok) {
      throw new Error("Erro ao buscar personagens.");
    }

    const data = await response.json();
    const planetMap = await fetchPlanets();

    const charactersWithPlanets = data.results.map((char: Character) => {
      const planetIdMatch = char.homeworld?.match(/\/planets\/(\d+)\//);
      const planetName = planetIdMatch ? planetMap[planetIdMatch[1]] || "Desconhecido" : "Desconhecido";
      return { ...char, homeworld: planetName };
    });

    return charactersWithPlanets;
  } catch (error) {
    console.error(error);
    return [];
  }
};
