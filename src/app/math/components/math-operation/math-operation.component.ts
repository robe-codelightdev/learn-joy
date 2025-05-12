import {Component, computed, Input, signal} from '@angular/core';
import {NgIf} from "@angular/common";

import {
  MathAnswerAttempt,
  MathQuestion,
  MathQuestionSolvedEvent,
  MathQuizSummaryItem
} from "../../models/math.model";
import {CelebrationComponent} from "../celebration/celebration.component";
import {MathQuestionComponent} from "../math-question/math-question.component";
import {MathQuizSummaryComponent} from "../math-quiz-summary/math-quiz-summary.component";

@Component({
  selector: 'app-math-operation',
  standalone: true,
  imports: [
    CelebrationComponent,
    MathQuestionComponent,
    NgIf,
    MathQuizSummaryComponent,
  ],
  templateUrl: './math-operation.component.html',
  styleUrl: './math-operation.component.css'
})
export class MathOperationComponent {
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

  public onQuestionSolved(event: MathQuestionSolvedEvent): void {
    const {question, userAttempts} = event;
    this.userAttemptsMap.set(question.id, userAttempts);
    this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
  }
}
