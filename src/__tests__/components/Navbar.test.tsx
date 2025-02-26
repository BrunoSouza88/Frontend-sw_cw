import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import Navbar from "@/components/Navbar";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [{ name: "Tatooine" }, { name: "Alderaan" }],
        }),
    })
  ) as jest.Mock;
});

describe("Navbar Component", () => {
  test("Renderiza corretamente com filtro inicial", async () => {
    await act(async () => {
      render(<Navbar selectedPlanet="All" setSelectedPlanet={() => {}} />);
    });

    expect(screen.getByLabelText("Selecionar planeta")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /limpar filtros e mostrar todos os personagens/i })
    ).toBeInTheDocument();
  });

  test("Altera o filtro quando o usuário seleciona um planeta", async () => {
    const mockSetSelectedPlanet = jest.fn();

    await act(async () => {
      render(<Navbar selectedPlanet="All" setSelectedPlanet={mockSetSelectedPlanet} />);
    });

    const dropdown = screen.getByLabelText("Selecionar planeta");

    await waitFor(() => expect(dropdown).not.toBeDisabled());

    await act(async () => {
      fireEvent.change(dropdown, { target: { value: "Tatooine" } });
    });

    await waitFor(() => {
      expect(mockSetSelectedPlanet).toHaveBeenCalledWith("Tatooine");
    });
  });

  test("Botão CLEAR ALL reseta o filtro", async () => {
    const mockSetSelectedPlanet = jest.fn();

    await act(async () => {
      render(<Navbar selectedPlanet="Tatooine" setSelectedPlanet={mockSetSelectedPlanet} />);
    });

    const clearButton = screen.getByRole("button", {
      name: /limpar filtros e mostrar todos os personagens/i,
    });

    await act(async () => {
      fireEvent.click(clearButton);
    });

    expect(mockSetSelectedPlanet).toHaveBeenCalledWith("All");
  });
});
