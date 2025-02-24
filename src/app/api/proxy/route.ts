import { NextResponse } from "next/server";

const SWAPI_BASE_URL = "https://swapi.dev/api";

/**
 * Proxy para contornar restrições de CORS da API SWAPI.
 */
export async function GET(req: Request) {
  try {
    // Obtém o parâmetro 'endpoint' da URL da requisição
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint é obrigatório." }, { status: 400 });
    }

    // Faz a requisição para a SWAPI
    const response = await fetch(`${SWAPI_BASE_URL}/${endpoint}/`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da SWAPI: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no proxy:", error);
    return NextResponse.json({ error: "Erro interno do proxy." }, { status: 500 });
  }
}
