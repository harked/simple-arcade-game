
import React, { useState, useEffect, useCallback, useRef } from 'react';
import BackButton from '../../components/BackButton';
import { ReactionGameState } from '../../types';

const ReactionTimeGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameState, setGameState] = useState<ReactionGameState>(ReactionGameState.IDLE);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(0);

  const resetGame = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    setGameState(ReactionGameState.IDLE);
    setReactionTime(null);
  }, []);

  const handleInteraction = () => {
    switch (gameState) {
      case ReactionGameState.IDLE:
        setGameState(ReactionGameState.WAITING);
        const randomDelay = Math.random() * 3000 + 1000; // 1-4 seconds
        timerId.current = setTimeout(() => {
          startTime.current = Date.now();
          setGameState(ReactionGameState.READY);
          timerId.current = null;
        }, randomDelay);
        break;
      
      case ReactionGameState.WAITING:
        if (timerId.current) {
          clearTimeout(timerId.current);
          timerId.current = null;
        }
        setGameState(ReactionGameState.TOO_SOON);
        break;

      case ReactionGameState.READY:
        const endTime = Date.now();
        setReactionTime(endTime - startTime.current);
        setGameState(ReactionGameState.SHOW_RESULT);
        break;

      case ReactionGameState.TOO_SOON:
      case ReactionGameState.SHOW_RESULT:
        resetGame();
        break;
    }
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  const getScreenContent = () => {
    switch (gameState) {
      case ReactionGameState.IDLE:
        return {
          bgColor: 'bg-indigo-600',
          title: 'Reaction Test',
          text: 'Click anywhere to begin.',
        };
      case ReactionGameState.WAITING:
        return {
          bgColor: 'bg-red-600',
          title: 'Wait for it...',
          text: 'Click when the screen turns green.',
        };
      case ReactionGameState.READY:
        return {
          bgColor: 'bg-green-500',
          title: 'Click NOW!',
          text: '',
        };
      case ReactionGameState.TOO_SOON:
        return {
          bgColor: 'bg-yellow-500',
          title: 'Too Soon!',
          text: 'You clicked before the signal. Click to try again.',
        };
      case ReactionGameState.SHOW_RESULT:
        return {
          bgColor: 'bg-blue-600',
          title: `${reactionTime} ms`,
          text: 'Click to go again.',
        };
    }
  };

  const { bgColor, title, text } = getScreenContent();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4 relative -m-4">
      <BackButton onClick={onBack} />
      <div
        className={`w-full h-full flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-colors duration-200 ${bgColor}`}
        onClick={handleInteraction}
      >
        <h2 className="text-6xl font-extrabold text-white drop-shadow-lg">{title}</h2>
        <p className="mt-4 text-2xl text-white/80 drop-shadow-md">{text}</p>
      </div>
    </div>
  );
};

export default ReactionTimeGame;
