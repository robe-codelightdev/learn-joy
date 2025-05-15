import { Component, computed, Input, signal } from '@angular/core';
import { NgIf } from '@angular/common';

import {
  MathAnswerAttempt,
  MathQuestion,
  MathQuestionSolvedEvent,
  MathQuizSummary,
  MathQuizSummaryItem,
} from '../../models/math.model';
import { CelebrationComponent } from '../celebration/celebration.component';
import { MathQuestionComponent } from '../math-question/math-question.component';
import { MathQuizSummaryComponent } from '../math-quiz-summary/math-quiz-summary.component';

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
  styleUrl: './math-operation.component.css',
})
export class MathOperationComponent {
  @Input()
  public set quiz(quiz: MathQuestion[]) {
    this.questions.set(quiz);
    this.currentQuestionIndex.set(0);
  }

  public currentQuestionIndex = signal(0);

  public currentQuestion = computed(
    () => this.questions()[this.currentQuestionIndex()]
  );

  public quizSummary = computed<MathQuizSummary>(() => {
    const items: MathQuizSummaryItem[] = [];

    if (this.currentQuestionIndex() !== this.questions().length) {
      return {
        items,
        totalQuizTime: 0,
      };
    }

    let totalTime = 0;
    Array.from(this.userAttemptsMap.values()).forEach(
      (attempts: MathAnswerAttempt[]) => {
        // Sum the time taken for each answer attempt to get the total quiz time
        totalTime = attempts.reduce(
          (total, attempt: MathAnswerAttempt) => total + attempt.timeTaken,
          totalTime
        );

        // add questions resolved in at least 2 attempts
        if (attempts.length > 1) {
          items.push({
            question: attempts[0].question,
            numberOfAttempts: attempts.length,
          });
        }
      }
    );

    return {
      items,
      totalQuizTime: Math.ceil(totalTime / 1000),
    };
  });

  public questions = signal<MathQuestion[]>([]);

  // store user attempts for each question
  private userAttemptsMap: Map<number, MathAnswerAttempt[]> = new Map();

  public onQuestionSolved(event: MathQuestionSolvedEvent): void {
    const { question, userAttempts } = event;
    this.userAttemptsMap.set(question.id, userAttempts);
    this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);
  }
}
