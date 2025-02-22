import {Component, computed, Input, signal} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

import {NumberPlanetComponent} from "../number-planet/number-planet.component";
import {
  MathAnswerAttempt,
  MathOperator,
  MathQuestion,
  MathQuestionSolvedEvent,
  MathQuizSummaryItem
} from "../../models/math.model";
import {MathAnswerInputComponent} from "../math-answer-input/math-answer-input.component";
import {MathService} from "../../services/math.service";
import {CelebrationComponent} from "../celebration/celebration.component";
import {MathQuestionComponent} from "../math-question/math-question.component";
import {MathQuizSummaryComponent} from "../math-quiz-summary/math-quiz-summary.component";

@Component({
  selector: 'app-math-operation',
  standalone: true,
  imports: [
    CelebrationComponent,
    MathAnswerInputComponent,
    MathQuestionComponent,
    NgForOf,
    NgIf,
    NumberPlanetComponent,
    MathQuizSummaryComponent,
  ],
  templateUrl: './math-operation.component.html',
  styleUrl: './math-operation.component.css'
})
export class MathOperationComponent {
  @Input()
  public operator!: MathOperator;

  @Input()
  public set quiz(quiz: MathQuestion[]) {
    this.questions.set(quiz);
    this.currentQuestionIndex.set(0);
  }

  public currentQuestionIndex = signal(0);

  public currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);

  public failedQuestions = computed<MathQuizSummaryItem[]>(() => {
    if (this.currentQuestionIndex() !== this.questions().length) {
      return [];
    }

    return Array.from(this.userAttemptsMap.values())
      .filter((attempts: MathAnswerAttempt[]) => attempts.length > 1)
      .map((attempts: MathAnswerAttempt[]) => ({
        question: attempts[0].question,
        numberOfAttempts: attempts.length
      }));
  });

  public questions = signal<MathQuestion[]>([]);

  // store user attempts for each question
  private userAttemptsMap: Map<number, MathAnswerAttempt[]> = new Map();

  public constructor(
    private readonly mathService: MathService,
  ) {
    this.questions.set(this.mathService.generateAdditionQuiz());
  }

  public onQuestionSolved(event: MathQuestionSolvedEvent): void {
    const {question, userAttempts} = event;
    this.userAttemptsMap.set(question.id, userAttempts);
    this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
  }
}
