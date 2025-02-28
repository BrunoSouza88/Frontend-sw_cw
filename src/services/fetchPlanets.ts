import { Planet } from "@/types/Planet";

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
    console.error("Erro ao buscar planetas:", error);
    return {};
  }
};
