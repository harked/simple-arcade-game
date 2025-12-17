
export enum Game {
  None,
  Memory,
  Trivia,
  Reaction,
}

// For Memory Game
export interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// For Trivia Game
export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export enum TriviaState {
    LOADING,
    SELECT_CATEGORY,
    PLAYING,
    SHOW_RESULTS,
    FINISHED,
    ERROR
}

// For Reaction Time Game
export enum ReactionGameState {
    IDLE,
    WAITING,
    READY,
    TOO_SOON,
    SHOW_RESULT
}
