
import React, { useState, useEffect, useCallback } from 'react';
import BackButton from '../../components/BackButton';
import { fetchTriviaQuestions } from '../../services/geminiService';
import { TriviaQuestion, TriviaState } from '../../types';

const CATEGORIES = ["Science", "History", "Movies", "Technology", "Geography", "Pop Culture"];

const TriviaGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameState, setGameState] = useState<TriviaState>(TriviaState.SELECT_CATEGORY);
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startNewGame = useCallback((category: string) => {
    setGameState(TriviaState.LOADING);
    setError(null);
    fetchTriviaQuestions(category)
      .then(fetchedQuestions => {
        if (fetchedQuestions && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions);
          setCurrentQuestionIndex(0);
          setScore(0);
          setSelectedAnswer(null);
          setGameState(TriviaState.PLAYING);
        } else {
          setError("Couldn't generate questions. Please try another category or try again later.");
          setGameState(TriviaState.ERROR);
        }
      })
      .catch(err => {
        setError(err.message || "An unknown error occurred.");
        setGameState(TriviaState.ERROR);
      });
  }, []);

  const handleAnswerSelect = (answer: string) => {
    if (gameState !== TriviaState.PLAYING) return;
    setSelectedAnswer(answer);
    setGameState(TriviaState.SHOW_RESULTS);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setGameState(TriviaState.PLAYING);
    } else {
      setGameState(TriviaState.FINISHED);
    }
  };

  const resetGame = () => {
    setGameState(TriviaState.SELECT_CATEGORY);
    setQuestions([]);
    setError(null);
  };
  
  const getButtonClass = (option: string) => {
    if (gameState === TriviaState.SHOW_RESULTS) {
      const currentQ = questions[currentQuestionIndex];
      if (option === currentQ.correctAnswer) {
        return 'bg-green-500 hover:bg-green-600 ring-2 ring-green-300';
      }
      if (option === selectedAnswer && option !== currentQ.correctAnswer) {
        return 'bg-red-500 hover:bg-red-600 ring-2 ring-red-300';
      }
    }
    return 'bg-indigo-600 hover:bg-indigo-700';
  };

  const renderContent = () => {
    switch (gameState) {
      case TriviaState.SELECT_CATEGORY:
        return (
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6">Select a Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => startNewGame(cat)}
                  className="px-4 py-8 bg-gray-800 hover:bg-indigo-500 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        );
      case TriviaState.LOADING:
        return (
          <div className="flex flex-col items-center justify-center h-64">
             <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
             <p className="mt-4 text-lg text-gray-400">AI is generating questions...</p>
          </div>
        );
      case TriviaState.ERROR:
        return (
           <div className="text-center p-8 bg-red-900/50 rounded-lg">
            <h3 className="text-2xl font-bold text-red-400">An Error Occurred</h3>
            <p className="text-gray-300 mt-2">{error}</p>
            <button onClick={resetGame} className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg">
              Try Again
            </button>
          </div>
        );
      case TriviaState.PLAYING:
      case TriviaState.SHOW_RESULTS:
        const q = questions[currentQuestionIndex];
        return (
          <div>
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
              <p className="text-2xl font-semibold mt-2" dangerouslySetInnerHTML={{ __html: q.question }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {q.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={gameState === TriviaState.SHOW_RESULTS}
                  className={`p-4 rounded-lg text-white font-medium transition-all duration-200 w-full disabled:cursor-not-allowed ${getButtonClass(option)}`}
                  dangerouslySetInnerHTML={{ __html: option }}
                />
              ))}
            </div>
             {gameState === TriviaState.SHOW_RESULTS && (
                <div className="mt-6 text-center p-4 bg-gray-800/70 rounded-lg">
                    <p className="text-gray-300">{q.explanation}</p>
                    <button onClick={handleNextQuestion} className="mt-4 px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg">
                        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
                    </button>
                </div>
            )}
          </div>
        );
       case TriviaState.FINISHED:
        return (
           <div className="text-center p-8 bg-gray-800/50 rounded-lg shadow-xl">
            <h3 className="text-3xl font-bold text-green-400">Quiz Complete!</h3>
            <p className="text-gray-300 mt-2 text-xl">Your final score is: <span className="font-bold text-white">{score} / {questions.length}</span></p>
            <button onClick={resetGame} className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Play Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center p-4 relative">
      <BackButton onClick={onBack} />
      <header className="text-center mb-6">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">AI Trivia Challenge</h2>
         {gameState !== TriviaState.SELECT_CATEGORY && gameState !== TriviaState.FINISHED && (
          <p className="text-gray-400 mt-2">Score: {score}</p>
        )}
      </header>
      <div className="w-full p-6 bg-gray-900/50 border border-gray-700/50 rounded-2xl shadow-2xl min-h-[20rem] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default TriviaGame;
