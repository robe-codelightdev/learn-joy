import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subscription, tap } from 'rxjs';

import { shuffleArray } from '../../../shared/helpers/shuffle-array';

import { PlanetColors, PlanetSizes } from '../../models/planet.enum';
import {
  MathAnswerAttempt,
  MathQuestion,
  MathQuestionSolvedEvent,
} from '../../models/math.model';
import { MathAnswerInputComponent } from '../math-answer-input/math-answer-input.component';
import { NumberPlanetComponent } from '../number-planet/number-planet.component';

@Component({
    selector: 'app-math-question',
    imports: [MathAnswerInputComponent, NumberPlanetComponent],
    templateUrl: './math-question.component.html',
    styleUrl: './math-question.component.css'
})
export class MathQuestionComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input()
  public question!: MathQuestion;

  @Output()
  public questionSolved = new EventEmitter<MathQuestionSolvedEvent>();

  @ViewChild(MathAnswerInputComponent)
  public answerInput!: MathAnswerInputComponent;

  public currentAnswer = signal<number | undefined>(undefined);

  // It increments for each wrong answer (1, 2, 3...) and resets to 0 when the answer is correct.
  // This allows us to determine whether to shake the answer input or not each time the answer is wrong.
  public isAnswerWrong = signal<number>(0);

  public operand1BgColor!: PlanetColors;
  public operand1Size!: PlanetSizes;
  public operand2BgColor!: PlanetColors;
  public operand2Size!: PlanetSizes;

  private delayTime = 1500; // in milliseconds
  private inputChangesSubscription!: Subscription;
  private startTime!: number;
  private userAttempts = signal<MathAnswerAttempt[]>([]);

  public constructor() {
    this.initOperands();
  }

  public ngAfterViewInit(): void {
    this.inputChangesSubscription = this.answerInput.inputChanges
      .pipe(
        tap((value: number | undefined) => {
          this.currentAnswer.set(value);
        }),
        debounceTime(this.delayTime)
      )
      .subscribe((value: number | undefined) => {
        this.checkAnswer(value);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.initOperands();
    }
  }

  public ngOnDestroy(): void {
    this.inputChangesSubscription?.unsubscribe();
  }

  public checkAnswer(answer: number | undefined): void {
    if (answer === undefined) {
      return;
    }

    const userAttempt = this.addUserAttempt(answer);

    if (!userAttempt) {
      return;
    }

    if (!userAttempt.isCorrect) {
      this.isAnswerWrong.set(this.isAnswerWrong() + 1);
      return;
    }

    this.questionSolved.emit({
      question: userAttempt.question,
      userAttempts: this.userAttempts(),
    });
    this.currentAnswer.set(undefined);
    this.userAttempts.set([]);
    this.isAnswerWrong.set(0);
  }

  private addUserAttempt(answer: number): MathAnswerAttempt | null {
    if (!this.question || !answer) {
      return null;
    }

    // Subtract the debounce delay from the user's total elapsed time
    const timeTaken = performance.now() - this.startTime - this.delayTime;

    const attempt: MathAnswerAttempt = {
      attemptNumber: this.userAttempts().length + 1,
      isCorrect: answer === this.question.correctAnswer,
      question: this.question,
      timeTaken,
      userAnswer: answer,
    };

    this.userAttempts().push(attempt);
    this.startTime = performance.now();

    return attempt;
  }

  private initOperands(): void {
    this.operand1BgColor = shuffleArray(Object.values(PlanetColors))[0];
    this.operand1Size = shuffleArray(Object.values(PlanetSizes))[0];
    this.operand2BgColor = shuffleArray(Object.values(PlanetColors))[0];
    this.operand2Size = shuffleArray(Object.values(PlanetSizes))[0];
    this.startTime = performance.now();
  }
}
