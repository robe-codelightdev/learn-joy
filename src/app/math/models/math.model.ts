export enum MathOperator {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '*',
  Division = '/',
}

export interface MathQuestion {
  id: number;
  correctAnswer: number;
  operand1: number;
  operand2: number;
  operator: MathOperator;
}

export interface MathAnswerAttempt {
  attemptNumber: number;
  isCorrect: boolean;
  question: MathQuestion;
  /** Time taken by the user in milliseconds */
  timeTaken: number;
  userAnswer: number;
}

export interface MathQuestionSolvedEvent {
  question: MathQuestion;
  userAttempts: MathAnswerAttempt[];
}

export interface MathQuizSummaryItem {
  question: MathQuestion;
  numberOfAttempts: number;
}

export interface MathQuizSummary {
  items: MathQuizSummaryItem[];

  // Total time taken by the user to complete the quiz, in seconds
  totalQuizTime: number;
}
