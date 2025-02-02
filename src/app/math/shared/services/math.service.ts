import {Injectable} from "@angular/core";

import {MathOperator, MathQuestion} from "../models/math.model";

@Injectable({
  providedIn: 'root'
})
export class MathService {
  public generateMultiplicationQuiz(): MathQuestion[] {
    const questions = [];
    for (let i = 2; i <= 9; i++) {
      for (let j = i; j <= 9; j++) {
        // shuffle the operands
        const operands = this.shuffleArray([i, j]);

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

    return this.shuffleArray(questions);
  }

  private shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}
