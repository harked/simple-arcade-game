# Mini-Game Arcade

A feature-rich arcade application built with React and TypeScript, featuring three engaging mini-games: Memory Puzzle, AI Trivia, and Reaction Time. This project demonstrates modern web development practices using Vite, Tailwind CSS, and Google's Generative AI.

## 🎮 Games

1.  **Memory Puzzle**: Test your memory by matching pairs of cards.
2.  **AI Trivia**: Challenge yourself with trivia questions generated dynamically by AI across various categories (Science, History, Movies, etc.).
3.  **Reaction Time**: Measure and improve your reflexes with a simple reaction test.

## 🛠️ Tech Stack

-   **Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Google Generative AI SDK](https://www.npmjs.com/package/@google/genai)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (Project uses `v22.14.0` or compatible)
-   npm (comes with Node.js)

You will also need an API key for **Google Gemini** to power the AI Trivia game. You can get one from [Google AI Studio](https://aistudio.google.com/).

## 🚀 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/simple-arcade-game.git
    cd simple-arcade-game
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    -   Create a `.env` file in the root directory (or rename `.env.example` if available).
    -   Add your Google Gemini API key:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

## 🏃‍♂️ Usage

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal) to verify the installation.

## 🏗️ Build for Production

To create a production-ready build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📄 License

[MIT](LICENSE)
