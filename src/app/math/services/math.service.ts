import { Injectable } from '@angular/core';

import { shuffleArray } from '../../shared/helpers/shuffle-array';

import { MathOperator, MathQuestion } from '../models/math.model';

@Injectable({
  providedIn: 'root',
})
export class MathService {
  public generateAdditionQuiz(): MathQuestion[] {
    const questions = [];
    for (let i = 1; i <= 9; i++) {
      for (let j = i; j <= 9; j++) {
        // shuffle the operands
        const operands = shuffleArray([i, j]);

        const question: MathQuestion = {
          id: questions.length + 1,
          operand1: operands[0],
          operand2: operands[1],
          operator: MathOperator.Addition,
          correctAnswer: i + j,
        };

        questions.push(question);
      }
    }

    return shuffleArray(questions);
  }

  public generateDivisionQuiz(): MathQuestion[] {
    const questions = [];
    for (let i = 1; i < 9; i++) {
      for (let j = i; j <= 9; j++) {
        const question: MathQuestion = {
          id: questions.length + 1,
          operand1: (i + 1) * j,
          operand2: j,
          operator: MathOperator.Division,
          correctAnswer: i + 1,
        };

        questions.push(question);
      }
    }

    return shuffleArray(questions);
  }

  public generateMixedQuiz(): MathQuestion[] {
    const additionQuestions = shuffleArray(this.generateAdditionQuiz());
    const subtractionQuestions = shuffleArray(this.generateSubtractionQuiz());
    const multiplicationQuestions = shuffleArray(
      this.generateMultiplicationQuiz()
    );
    const divisionQuestions = shuffleArray(this.generateDivisionQuiz());

    const mixedQuestions: MathQuestion[] = additionQuestions
      .slice(0, 10)
      .concat(subtractionQuestions.slice(0, 10))
      .concat(multiplicationQuestions.slice(0, 10))
      .concat(divisionQuestions.slice(0, 10));

    return shuffleArray(mixedQuestions);
  }

  public generateMultiplicationQuiz(): MathQuestion[] {
    const questions = [];
    for (let i = 2; i <= 9; i++) {
      for (let j = i; j <= 9; j++) {
        // shuffle the operands
        const operands = shuffleArray([i, j]);

        const question: MathQuestion = {
          id: questions.length + 1,
          operand1: operands[0],
          operand2: operands[1],
          operator: MathOperator.Multiplication,
          correctAnswer: i * j,
        };

        questions.push(question);
      }
    }

    return shuffleArray(questions);
  }

  public generateSubtractionQuiz(): MathQuestion[] {
    const questions = [];
    for (let i = 1; i <= 9; i++) {
      for (let j = i; j <= 9; j++) {
        const question: MathQuestion = {
          id: questions.length + 1,
          operand1: i + j,
          operand2: j,
          operator: MathOperator.Subtraction,
          correctAnswer: i,
        };

        questions.push(question);
      }
    }

    return shuffleArray(questions);
  }
}
