# 🌊 WaveSearch

> **Projeto Acadêmico** | Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas  
> **Senac SP**

O **WaveSearch** é uma aplicação web responsiva desenvolvida para surfistas e entusiastas do mar. O sistema fornece previsões detalhadas de condições de surf, incluindo altura das ondas, direção do vento, temperatura e tábua de marés em tempo real, além de permitir que a comunidade compartilhe relatos diários sobre as condições do mar.

## 🎯 Objetivo do Projeto

Desenvolver uma aplicação moderna e funcional que resolva uma dor real do usuário (monitoramento de condições do mar), aplicando conceitos de consumo de APIs, componentização, roteamento, integração com **Backend as a Service (BaaS)** e autenticação real.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack atualizada de desenvolvimento web:

### Frontend & Core
* **[React](https://react.dev/):** Biblioteca principal para construção da interface.
* **[TypeScript](https://www.typescriptlang.org/):** Superset JavaScript para tipagem estática e segurança de código.
* **[Vite](https://vitejs.dev/):** Build tool para desenvolvimento rápido e otimizado.
* **[React Router DOM](https://reactrouter.com/):** Gerenciamento de rotas e navegação (SPA).

### Estilização & UI
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilitários CSS para estilização ágil.
* **[Shadcn/UI](https://ui.shadcn.com/):** Coleção de componentes reutilizáveis (baseado em Radix UI).
* **[Lucide React](https://lucide.dev/):** Biblioteca de ícones.

### Backend & Dados
* **[Supabase](https://supabase.com/):** Plataforma BaaS utilizada para:
    * **Banco de Dados (PostgreSQL):** Armazenamento dos relatos (reviews) dos usuários.
    * **Autenticação:** Gerenciamento de usuários via E-mail/Senha e **OAuth (Google Login)**.
* **[Open-Meteo API](https://open-meteo.com/):** API gratuita para dados meteorológicos e marinhos em tempo real.
* **[TanStack Query](https://tanstack.com/query/latest):** Gerenciamento de estado assíncrono e cache.
* **[Recharts](https://recharts.org/):** Biblioteca para visualização de dados (Gráfico de Marés).

## ✨ Funcionalidades Principais

1.  **Dashboard de Previsão:** Visualização clara de altura das ondas, velocidade do vento e temperatura.
2.  **Tábua de Marés Dinâmica:** Gráfico interativo do nível do mar (MSL) para as próximas 24h.
3.  **Busca de Locais:** Navegação entre picos de surf (ex: Ponta Negra, Maresias, Joaquina, Noronha).
4.  **Relatos da Comunidade (Novo):**
    * Usuários logados podem avaliar o pico (1-5 estrelas) e deixar comentários.
    * Sistema inteligente que exibe apenas relatos do dia atual (Daily Report).
    * Restrição de 1 avaliação por usuário por dia para evitar spam.
    * Identificação automática do autor baseada no cadastro.
5.  **Autenticação Completa:**
    * Login e Cadastro com E-mail.
    * **Login Social com Google**.
    * Persistência de sessão segura.
6.  **Rating de Condições:** Algoritmo que classifica o dia com mensagens personalizadas (ex: "O mar está bombando!").
7.  **Layout Responsivo:** Interface adaptada para Desktop e Mobile (com gavetas deslizantes/Drawers).

## 📦 Como Rodar o Projeto

Pré-requisitos: Node.js (v18+) instalado e uma conta no Supabase.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/wavesearch.git](https://github.com/seu-usuario/wavesearch.git)
    cd wavesearch
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    bun install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione suas chaves do Supabase:
    ```env
    VITE_SUPABASE_URL=sua_url_do_supabase
    VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_anon_publica
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    bun dev
    ```

5.  **Acesse:**
    Abra `http://localhost:8080` no seu navegador.

## 👤 Autores

* **Felipe Lemos** - *Desenvolvedor*
* **Ariel Medeiros** - *Desenvolvedor*
* **Gabriel Bulhões** - *Desenvolvedor*

---
*Projeto desenvolvido para fins educacionais no Senac SP.*
