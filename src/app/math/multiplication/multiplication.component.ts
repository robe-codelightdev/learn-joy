import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgFor, NgIf} from "@angular/common";

import {MathAnswerAttempt, MathQuestion} from "../shared/models/math.model";
import {NumberSquaredComponent} from "../number-squared/number-squared.component";
import {MathAnswerInputComponent} from "../math-answer-input/math-answer-input.component";
import {MathService} from "../shared/services/math.service";

@Component({
  selector: 'app-multiplication',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    NumberSquaredComponent,
    MathAnswerInputComponent,
  ],
  templateUrl: './multiplication.component.html',
  styleUrl: './multiplication.component.css'
})
export class MultiplicationComponent {
  public currentAnswer: number | undefined = undefined;

  public currentQuestion: MathQuestion | undefined = undefined;

  public isAnswerWrong = false;

  public questionsNumber: number;

  // store user attempts for each question
  public userAttempts: Map<number, MathAnswerAttempt[]> = new Map();

  public userResults: Array<{operand1: number; operand2: number; attemptsNumber: number }> = [];

  private questions: MathQuestion[];
  private userAttemptNumber = 0;

  public constructor(
    private readonly mathService: MathService,
  ) {
    this.questions = this.mathService.generateMultiplicationQuiz();
    this.questionsNumber = this.questions.length;
    this.currentQuestion = this.questions.pop();
  }

  public checkAnswer() {
    const userAttempt = this.createUserAttempt();

    if (userAttempt) {
      this.addUserAttempt(userAttempt);
      this.handleUserAttempt(userAttempt);
    }
  }

  public restartQuiz(): void {
    this.questions = this.mathService.generateMultiplicationQuiz();
    this.questionsNumber = this.questions.length;
    this.currentQuestion = this.questions.pop();
    this.userAttempts = new Map();
    this.userAttemptNumber = 0;
    this.currentAnswer = undefined;
    this.isAnswerWrong = false;
    this.userResults = [];
  }

  private addUserAttempt(userAttempt: MathAnswerAttempt): void {
    const currentQuestionId = this.currentQuestion?.id;

    if (!currentQuestionId) {
      return;
    }

    if (this.userAttempts.has(currentQuestionId)) {
      this.userAttempts.get(currentQuestionId)?.push(userAttempt);
      return;
    }

    this.userAttempts.set(currentQuestionId, [userAttempt]);
  }

  private createUserAttempt(): MathAnswerAttempt | undefined {
    if (!this.currentQuestion || !this.currentAnswer) {
      return undefined;
    }

    return {
      userAnswer: this.currentAnswer,
      isCorrect: this.currentAnswer === this.currentQuestion.correctAnswer,
      question: this.currentQuestion,
      attemptNumber: this.userAttemptNumber + 1,
    };
  }

  private handleUserAttempt(userAttempt: MathAnswerAttempt): void {
    if (userAttempt.isCorrect) {
      this.userResults.push({
        operand1: userAttempt.question.operand1,
        operand2: userAttempt.question.operand2,
        attemptsNumber: userAttempt.attemptNumber,
      });
      this.isAnswerWrong = false;
      this.currentAnswer = undefined;
      this.userAttemptNumber = 0;
      this.currentQuestion = this.questions.length > 0 ? this.questions.pop() : undefined;
    } else {
      this.userAttemptNumber++;
      this.isAnswerWrong = true;
    }
  }
}
