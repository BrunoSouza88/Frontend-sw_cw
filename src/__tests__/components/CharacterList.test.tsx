import { render, screen } from "@testing-library/react";
import CharacterList from "@/components/CharacterList";
import { Character } from "@/types/swapi";

describe("CharacterList Component", () => {
  test("Exibe SkeletonCards enquanto carrega", () => {
    render(<CharacterList characters={[]} visibleCount={8} loading={true} onCharacterClick={() => {}} />);
    
    const skeletons = document.querySelectorAll(".skeletonCard");
    expect(skeletons.length).toBe(8);
  });

  test("Renderiza os personagens corretamente com informações visíveis", () => {
    const mockCharacters: Character[] = [
      {
        name: "R5-D4",
        homeworld: "Tatooine",
        height: "97",
        mass: "32",
        gender: "n/a",
      },
      { 
        name: "Luke Skywalker", 
        homeworld: "Tatooine", 
        height: "172",
        mass: "77",
        gender: "male",
      }
    ];

    render(<CharacterList characters={mockCharacters} visibleCount={2} loading={false} onCharacterClick={() => {}} />);

    expect(screen.getByText("R5-D4")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    const planetElements = screen.getAllByText("Tatooine");
    expect(planetElements.length).toBe(2);

    expect(screen.getByText((content) => content.includes("Altura") && content.includes("97"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Peso") && content.includes("32"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Gênero") && content.includes("n/a"))).toBeInTheDocument();

    expect(screen.getByText((content) => content.includes("Altura") && content.includes("172"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Peso") && content.includes("77"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Gênero") && content.includes("male"))).toBeInTheDocument();
  });
});
