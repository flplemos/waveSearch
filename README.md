# 🌊 WaveSearch

> **Projeto Acadêmico** | Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas  
> **Senac SP**

O **WaveSearch** é uma aplicação web responsiva desenvolvida para surfistas e entusiastas do mar. O sistema fornece previsões detalhadas de condições de surf, incluindo altura das ondas, direção do vento, temperatura e tábua de marés em tempo real, consumindo dados de APIs meteorológicas globais.

## 🎯 Objetivo do Projeto

Desenvolver uma aplicação *Front-end* moderna e funcional que resolva uma dor real do usuário (monitoramento de condições do mar), aplicando conceitos de consumo de APIs, componentização, roteamento e gerenciamento de estado no ecossistema React.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack atualizada de desenvolvimento web:

### Frontend & Core
* **[React](https://react.dev/):** Biblioteca principal para construção da interface.
* **[TypeScript](https://www.typescriptlang.org/):** Superset JavaScript para tipagem estática e segurança de código.
* **[Vite](https://vitejs.dev/):** Build tool para desenvolvimento rápido e otimizado.
* **[React Router DOM](https://reactrouter.com/):** Gerenciamento de rotas e navegação (SPA).

### Estilização & UI
* **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilitários CSS para estilização ágil.
* **[Shadcn/UI](https://ui.shadcn.com/):** Coleção de componentes reutilizáveis (baseado em Radix UI) para interface consistente.
* **[Lucide React](https://lucide.dev/):** Biblioteca de ícones.

### Dados & APIs
* **[Open-Meteo API](https://open-meteo.com/):** API gratuita utilizada para buscar dados reais de previsão do tempo, condições marinhas e nível do mar (Tábua de Marés).
* **[TanStack Query (React Query)](https://tanstack.com/query/latest):** Gerenciamento de estado assíncrono e cache das requisições de API.
* **[Recharts](https://recharts.org/):** Biblioteca para visualização de dados (Gráfico da Tábua de Marés).

### Autenticação (Simulação)
* **LocalStorage:** O sistema de login e persistência de sessão foi implementado utilizando o armazenamento local do navegador para simular a experiência de autenticação sem a necessidade de um Backend ou BaaS complexo nesta etapa do projeto.

## ✨ Funcionalidades Principais

1.  **Dashboard de Previsão:** Visualização clara de altura das ondas, velocidade do vento e temperatura atual.
2.  **Tábua de Marés Dinâmica:** Gráfico interativo que exibe o nível do mar (MSL) para as próximas 24 horas, consumindo dados reais.
3.  **Busca de Locais:** Navegação entre diferentes picos de surf (ex: Ponta Negra, Pipa, Maresias, Joaquina, Fernando de Noronha).
4.  **Rating de Condições:** Algoritmo simples que classifica o dia com estrelas e mensagens personalizadas (ex: "O mar está bombando!") baseado na altura das ondas.
5.  **Layout Responsivo:**
    * **Desktop:** Visualização completa com sidebar e gráficos fixos.
    * **Mobile:** Interface adaptada com *Drawer* (gaveta) deslizante para visualização da tábua de marés e menus otimizados.
6.  **Previsão Futura:** Cards interativos com a previsão para os próximos dias, com funcionalidade de ocultar/revelar dados (Spoiler free).

## 📦 Como Rodar o Projeto

Pré-requisitos: Node.js (v18+) instalado.

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

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    bun dev
    ```

4.  **Acesse:**
    Abra `http://localhost:8080` no seu navegador.

## 👤 Autores

* **Felipe Lemos** - *Desenvolvedor*
* **Ariel Medeiros** - *Desenvolvedor*
* **Gabriel Bulhões** - *Desenvolvedor*

---
*Projeto desenvolvido para fins educacionais no Senac SP.*
