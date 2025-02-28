# Star Wars Characters - Frontend Engineer Test

## 📌 Descrição
Este projeto é uma aplicação que exibe personagens do universo Star Wars, consumindo a API pública [SWAPI](https://swapi.dev/). A aplicação permite filtrar personagens pelo planeta de origem e exibe detalhes do personagem ao clicar nele.

## 🚀 Link para Deploy
A aplicação está disponível online no seguinte link:
[🔗 Acesse aqui](https://frontend-sw-fkqpcvg53-brunosouza88s-projects.vercel.app/)

## 🎯 Funcionalidades
- Exibição de personagens do universo Star Wars.
- Filtragem de personagens por planeta de origem.
- Exibição de detalhes do personagem em um modal.
- Layout responsivo para diferentes tamanhos de tela.
- **Acessibilidade (A11Y)** aprimorada com ARIA, navegação por teclado e atributos semânticos.
- Testes unitários cobrindo os principais componentes.
- Deploy automatizado via Vercel.

## 🛠️ Tecnologias Utilizadas
- **Next.js** (React Framework)
- **TypeScript**
- **CSS Modules** (Estilização customizada)
- **SWAPI API** (Fonte de dados)
- **Jest + React Testing Library** (Testes)
- **Vercel** (Hospedagem e deploy)

## 📜 Requisitos
Para rodar o projeto localmente, é necessário ter instalado:
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

## 🔧 Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/frontend-sw-cw.git
   cd frontend-sw-cw
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor local:**
   ```sh
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## 🧪 Testes
Os testes são escritos usando **Jest** e **React Testing Library**.
Para rodar os testes:
```sh
npm run test
# ou
yarn test
```

## 📂 Estrutura do Projeto
```
frontend-sw-cw/
│-- src/
│   ├── components/       # Componentes reutilizáveis
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Páginas da aplicação
│   ├── services/         # Comunicação com API externa
│   ├── styles/           # Estilos CSS Modules
│   ├── tests/            # Testes unitários
│   ├── types/            # Tipagens do TypeScript
│-- public/               # Assets públicos (imagens, ícones, etc.)
│-- .vercel/              # Configuração de deploy na Vercel
│-- package.json          # Dependências e scripts do projeto
│-- README.md             # Documentação
```

## 🔍 Melhorias Implementadas
- **Acessibilidade (A11Y):** 
  - Uso de `aria-labels` para melhor navegação por leitores de tela.
  - Adição de `role` e `tabIndex` para navegação sem mouse.
  - Uso correto de elementos semânticos (`button`, `article`, `section`).
- **Otimização de Performance:**
  - Cache HTTP (s-maxage=3600, stale-while-revalidate) para reduzir chamadas desnecessárias.
  - Uso de cache interno (`cachedPlanets`) para evitar múltiplas requisições.
  - AbortController para cancelar requisições desnecessárias.

## ✨ Contribuição
Se quiser contribuir para o projeto, sinta-se à vontade para abrir uma **issue** ou enviar um **pull request**.

## 📝 Licença
Este projeto é apenas para fins de avaliação e aprendizado.

