import { render, screen, fireEvent, act } from "@testing-library/react";
import CharacterCard from "@/components/CharacterCard";
import { Character } from "@/types/swapi";

describe("CharacterCard Component", () => {
  const mockCharacter: Character = {
    name: "R5-D4",
    homeworld: "Tatooine",
    height: "97",
    mass: "32",
    gender: "n/a",
  };

  test("Renderiza corretamente com as informações do personagem", async () => {
    await act(async () => {
      render(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    });

    expect(screen.getByText("R5-D4")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText("Altura • 97 cm")).toBeInTheDocument();
    expect(screen.getByText("Peso • 32 kg")).toBeInTheDocument();
    expect(screen.getByText("Gênero • n/a")).toBeInTheDocument();
  });

  test("Chama a função onClick ao clicar no card", async () => {
    const mockOnClick = jest.fn();
    await act(async () => {
      render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    });

    const characterCard = screen.getByRole("button");
    fireEvent.click(characterCard);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("Exibe a imagem correta do personagem", async () => {
    await act(async () => {
      render(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    });
  
    const characterImage = screen.getByRole("img", { name: /Retrato de R5-D4 de Star Wars/i });
    
    expect(characterImage).toBeInTheDocument();
    expect(characterImage).toHaveAttribute("src", expect.stringContaining("r5-d4.jpg"));
  });    

  test("Dispara a função onClick ao clicar no card", async () => {
    const mockOnClick = jest.fn();
    
    await act(async () => {
      render(<CharacterCard character={mockCharacter} onClick={mockOnClick} />);
    });
    
    const characterCard = screen.getByRole("button");
    fireEvent.click(characterCard);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });  

  test("Usa a imagem padrão quando a original falha ao carregar", async () => {
    await act(async () => {
      render(<CharacterCard character={mockCharacter} onClick={() => {}} />);
    });
    
    const characterImage = await screen.findByRole("img", { name: /Retrato de R5-D4 de Star Wars/i });
  
    fireEvent.error(characterImage);
  
    expect(characterImage).toHaveAttribute("src", expect.stringContaining("default.jpg"));
  });
});
