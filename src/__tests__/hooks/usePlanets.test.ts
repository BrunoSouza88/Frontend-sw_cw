import { renderHook, waitFor } from "@testing-library/react";
import { usePlanets } from "@/hooks/usePlanets";

describe("usePlanets Hook", () => {
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Retorna o estado inicial corretamente", () => {
    const { result } = renderHook(() => usePlanets());

    expect(result.current.planets).toEqual([]); // Inicialmente vazio
    expect(result.current.loading).toBe(true); // Loading começa como true
  });

  test("Busca e define os planetas corretamente", async () => {
    const { result } = renderHook(() => usePlanets());

    await waitFor(() => expect(result.current.loading).toBe(false)); // Aguarda loading ser false

    expect(result.current.planets).toEqual(["All", "Tatooine", "Alderaan"]);
  });

  test("Lida com erro na API corretamente", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Erro na API"))) as jest.Mock;

    const { result } = renderHook(() => usePlanets());

    await waitFor(() => expect(result.current.loading).toBe(false)); // Aguarda loading ser false após erro

    expect(result.current.planets).toEqual(["All"]); // Deve conter apenas "All"
  });
});
