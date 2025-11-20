# 🌊 WaveSearch

**WaveSearch** é uma aplicação web moderna de previsão de surf e condições climáticas, projetada para ajudar surfistas a encontrarem as melhores ondas. A aplicação oferece funcionalidades de busca de locais, métricas detalhadas de clima (ondas, vento, temperatura) e um sistema de autenticação de usuários.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e robusta:

* **Frontend:** [React](https://react.dev/) com [Vite](https://vitejs.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/) (baseado em Radix UI)
* **Gerenciamento de Estado/Dados:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
* **Roteamento:** [React Router DOM](https://reactrouter.com/)
* **Backend/BaaS:** [Supabase](https://supabase.com/) (Autenticação e Banco de Dados)
* **Formulários:** React Hook Form + Zod
* **Ícones:** Lucide React
* **Gerenciador de Pacotes:** Bun (ou NPM)

## ✨ Funcionalidades Principais

* **Autenticação de Usuários:** Login e cadastro com suporte visual para login social (Google/Facebook).
* **Busca de Locais:** Interface para pesquisar e selecionar picos de surf.
* **Detalhes da Previsão:**
    * Visualização de métricas essenciais: altura das ondas, direção/velocidade do vento e temperatura.
    * Avaliação por estrelas (Star Rating) das condições do mar.
    * Cartões de previsão para os próximos dias.
* **Design Responsivo:** Interface adaptada para dispositivos móveis e desktop, incluindo Sidebar e componentes adaptáveis.
* **Rotas Protegidas:** Acesso a determinadas páginas apenas para usuários autenticados.

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
* [Bun](https://bun.sh/) (O projeto possui um `bun.lockb`, indicando o uso do Bun, mas também funciona com NPM).

## 📦 Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/seu-usuario/wavesearch.git](https://github.com/seu-usuario/wavesearch.git)
    cd wavesearch
    ```

2.  **Instale as dependências:**

    Usando Bun (recomendado):
    ```bash
    bun install
    ```
    Ou usando NPM:
    ```bash
    npm install
    ```

3.  **Configuração das Variáveis de Ambiente:**

    Crie um arquivo `.env` na raiz do projeto. Você pode usar o exemplo abaixo com base nas chaves necessárias identificadas no projeto:

    ```env
    VITE_SUPABASE_PROJECT_ID="seu_project_id"
    VITE_SUPABASE_PUBLISHABLE_KEY="sua_chave_publica_anon"
    VITE_SUPABASE_URL="sua_url_do_supabase"
    ```

4.  **Rodando o projeto:**

    Para iniciar o servidor de desenvolvimento:

    ```bash
    bun dev
    # ou
    npm run dev
    ```

    O aplicativo estará disponível em `http://localhost:8080` (conforme configurado no `vite.config.ts`).

## 📂 Estrutura do Projeto

A estrutura de pastas segue o padrão React/Vite:

* `src/components`: Componentes reutilizáveis (botões, inputs, cards) e componentes do Shadcn/UI (`ui/`).
* `src/contexts`: Contextos globais, como o `AuthContext` para gerenciar o estado do usuário.
* `src/hooks`: Hooks personalizados (ex: `use-mobile`, `use-toast`).
* `src/pages`: Páginas principais da aplicação (Auth, Search, LocationDetails, etc.).
* `src/integrations/supabase`: Configuração e tipos do cliente Supabase.
* `public`: Assets estáticos.

## 🎨 Scripts Disponíveis

* `dev`: Inicia o servidor de desenvolvimento.
* `build`: Compila o projeto para produção.
* `lint`: Executa o ESLint para verificação de código.
* `preview`: Visualiza a build de produção localmente.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um Pull Request.

1.  Faça um Fork do projeto
2.  Crie uma Branch para sua Feature (`git checkout -b feature/NovaFeature`)
3.  Faça o Commit de suas mudanças (`git commit -m 'Adicionando nova feature'`)
4.  Faça o Push para a Branch (`git push origin feature/NovaFeature`)
5.  Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
