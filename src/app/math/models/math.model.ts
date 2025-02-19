export enum MathOperator {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '*',
  Division = '/'
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
