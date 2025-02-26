import { useState, useEffect } from "react";

export function usePlanets() {
  const [planets, setPlanets] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("https://swapi.dev/api/planets/");
        const data = await response.json();

        const planetNames = data.results?.map((planet: { name: string }) => planet.name) || [];

        setPlanets(["All", ...planetNames]);
      } catch (error) {
        console.error("Erro ao buscar planetas:", error);
        setPlanets(["All"]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return { planets, loading };
}
