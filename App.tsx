
import React, { useState, useMemo } from 'react';
import { Game } from './types';
import MemoryPuzzle from './games/MemoryPuzzle';
import TriviaGame from './games/Trivia';
import ReactionTimeGame from './games/ReactionTime';
import { GameCard } from './components/GameCard';
import { BrainIcon, ZapIcon, QuestionMarkIcon } from './components/icons/Icons';

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game>(Game.None);

  const handleGameSelect = (game: Game) => {
    setActiveGame(game);
  };

  const handleBack = () => {
    setActiveGame(Game.None);
  };

  const games = useMemo(() => [
    { id: Game.Memory, title: 'Memory Puzzle', description: 'Match pairs of cards.', icon: <BrainIcon className="w-12 h-12" /> },
    { id: Game.Trivia, title: 'AI Trivia', description: 'Test your knowledge.', icon: <QuestionMarkIcon className="w-12 h-12" /> },
    { id: Game.Reaction, title: 'Reaction Time', description: 'Test your reflexes.', icon: <ZapIcon className="w-12 h-12" /> },
  ], []);

  const renderActiveGame = () => {
    switch (activeGame) {
      case Game.Memory:
        return <MemoryPuzzle onBack={handleBack} />;
      case Game.Trivia:
        return <TriviaGame onBack={handleBack} />;
      case Game.Reaction:
        return <ReactionTimeGame onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-4xl mx-auto">
        {activeGame === Game.None ? (
          <>
            <header className="text-center mb-12">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Mini-Game Arcade
              </h1>
              <p className="mt-4 text-lg text-gray-400">Choose a game and test your skills!</p>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  description={game.description}
                  icon={game.icon}
                  onClick={() => handleGameSelect(game.id)}
                />
              ))}
            </main>
          </>
        ) : (
          renderActiveGame()
        )}
      </div>
      <footer className="absolute bottom-4 text-center text-gray-500 text-sm">
        <p>Built with ❤️ from Batam</p>
      </footer>
    </div>
  );
};

export default App;
