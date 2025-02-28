import { Character, Planet } from "@/types/swapi";

let cachedPlanets: Record<string, string> = {};

export const fetchPlanets = async (): Promise<Record<string, string>> => {
  if (Object.keys(cachedPlanets).length) return cachedPlanets;
  try {
    const response = await fetch("/api/proxy?endpoint=planets");
    if (!response.ok) throw new Error("Erro ao buscar planetas.");
    const data = await response.json();
    cachedPlanets = data.results.reduce((acc: Record<string, string>, planet: Planet) => {
      const planetIdMatch = planet.url.match(/\/planets\/(\d+)\//);
      if (planetIdMatch) acc[planetIdMatch[1]] = planet.name;
      return acc;
    }, {});
    return cachedPlanets;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch("/api/proxy?endpoint=people");
    if (!response.ok) throw new Error("Erro ao buscar personagens.");
    const data = await response.json();
    const planetMap = await fetchPlanets();

    return data.results.map((char: Character) => {
      const planetIdMatch = char.homeworld?.match(/\/planets\/(\d+)\//);
      return { ...char, homeworld: planetIdMatch ? planetMap[planetIdMatch[1]] || "Desconhecido" : "Desconhecido" };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};