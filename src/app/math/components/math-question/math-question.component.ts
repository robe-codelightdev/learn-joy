import {
  AfterViewInit,
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  Output,
  signal,
  SimpleChanges, ViewChild
} from '@angular/core';
import {debounce, debounceTime, distinctUntilChanged, Subscription, tap} from "rxjs";

import {shuffleArray} from "../../../shared/helpers/shuffle-array";

import {PlanetColors, PlanetSizes} from "../../models/planet.enum";
import {MathAnswerAttempt, MathQuestion, MathQuestionSolvedEvent} from "../../models/math.model";
import {MathAnswerInputComponent} from "../math-answer-input/math-answer-input.component";
import {NumberPlanetComponent} from "../number-planet/number-planet.component";

@Component({
  selector: 'app-math-question',
  standalone: true,
  imports: [MathAnswerInputComponent, NumberPlanetComponent],
  templateUrl: './math-question.component.html',
  styleUrl: './math-question.component.css'
})
export class MathQuestionComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input()
  public question!: MathQuestion;

  @Output()
  public questionSolved = new EventEmitter<MathQuestionSolvedEvent>();

  @ViewChild(MathAnswerInputComponent)
  public answerInput!: MathAnswerInputComponent;

  public currentAnswer = signal<number | undefined>(undefined);

  public isAnswerWrong = signal<boolean>(false);

  public operand1BgColor!: PlanetColors;
  public operand1Size!: PlanetSizes;
  public operand2BgColor!: PlanetColors;
  public operand2Size!: PlanetSizes;

  private inputChangesSubscription!: Subscription;
  private userAttempts = signal<MathAnswerAttempt[]>([]);

  public constructor() {
    this.initOperands();
  }

  public ngAfterViewInit(): void {
    this.inputChangesSubscription = this.answerInput.inputChanges
      .pipe(
        tap((value: number) => this.currentAnswer.set(value)),
        debounceTime(600),
      )
      .subscribe((value: number) => {
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

  public checkAnswer(answer: number): void {
    const userAttempt = this.addUserAttempt(answer);

    if (!userAttempt) {
      return;
    }

    if (!userAttempt.isCorrect) {
      this.isAnswerWrong.set(true);
      return;
    }

    this.questionSolved.emit({
      question: userAttempt.question,
      userAttempts: this.userAttempts(),
    });
    this.currentAnswer.set(undefined);
    this.userAttempts.set([]);
    this.isAnswerWrong.set(false);
  }

  private addUserAttempt(answer: number): MathAnswerAttempt | null {
    if (!this.question || !answer) {
      return null;
    }

    const attempt = {
      userAnswer: answer,
      isCorrect: answer === this.question.correctAnswer,
      question: this.question,
      attemptNumber: this.userAttempts().length + 1,
    };

    this.userAttempts().push(attempt);

    return attempt;
  }

  private initOperands(): void {
    this.operand1BgColor = shuffleArray(Object.values(PlanetColors))[0];
    this.operand1Size = shuffleArray(Object.values(PlanetSizes))[0];
    this.operand2BgColor = shuffleArray(Object.values(PlanetColors))[0];
    this.operand2Size = shuffleArray(Object.values(PlanetSizes))[0];
  }
}
