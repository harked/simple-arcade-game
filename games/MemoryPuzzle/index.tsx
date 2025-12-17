
import React, { useState, useEffect, useCallback } from 'react';
import type { Card } from '../../types';
import BackButton from '../../components/BackButton';

const EMOJIS = ['🧠', '🕹️', '💡', '🚀', '🎯', '🧩', '🏆', '👾'];

const generateCards = (): Card[] => {
  const pairs = [...EMOJIS, ...EMOJIS];
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  return shuffled.map((emoji, index) => ({
    id: index,
    value: emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

const MemoryPuzzle: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [cards, setCards] = useState<Card[]>(generateCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const resetGame = useCallback(() => {
    setCards(generateCards());
    setFlippedCards([]);
    setMoves(0);
    setIsGameWon(false);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.value === secondCard.value) {
        // Match
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        // No match
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    const allMatched = cards.every(card => card.isMatched);
    if (cards.length > 0 && allMatched) {
      setIsGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length === 2) return;

    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, id]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-4 relative">
      <BackButton onClick={onBack} />
      <header className="text-center mb-6">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">Memory Puzzle</h2>
        <p className="text-gray-400 mt-2">Moves: {moves}</p>
      </header>
      
      {isGameWon ? (
        <div className="text-center p-8 bg-gray-800/50 rounded-lg shadow-xl">
          <h3 className="text-3xl font-bold text-green-400">Congratulations!</h3>
          <p className="text-gray-300 mt-2">You won in {moves} moves.</p>
          <button
            onClick={resetGame}
            className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {cards.map(card => (
            <div
              key={card.id}
              className="w-24 h-24 perspective-1000"
              onClick={() => handleCardClick(card.id)}
            >
              <div
                className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
                style={{ transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              >
                <div className="absolute w-full h-full backface-hidden bg-indigo-500 rounded-lg flex items-center justify-center cursor-pointer shadow-lg"></div>
                <div className="absolute w-full h-full backface-hidden bg-gray-700 rounded-lg flex items-center justify-center text-4xl rotate-y-180 shadow-lg">
                  {card.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
       <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default MemoryPuzzle;
