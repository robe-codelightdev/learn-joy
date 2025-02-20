import {
  Component,
  computed,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges
} from '@angular/core';

import {shuffleArray} from "../../../shared/helpers/shuffle-array";

import {MathAnswerInputComponent} from "../math-answer-input/math-answer-input.component";
import {NumberPlanetComponent} from "../number-planet/number-planet.component";
import {MathAnswerAttempt, MathQuestion, MathQuestionSolvedEvent} from "../../models/math.model";
import {PlanetColors, PlanetSizes} from "../../models/planet.enum";

@Component({
  selector: 'app-math-question',
  standalone: true,
  imports: [MathAnswerInputComponent, NumberPlanetComponent],
  templateUrl: './math-question.component.html',
  styleUrl: './math-question.component.css'
})
export class MathQuestionComponent implements OnChanges {
  @Input()
  public question!: MathQuestion;

  @Output()
  public questionSolved = new EventEmitter<MathQuestionSolvedEvent>();

  public currentAnswer = signal<number | undefined>(undefined);

  // it is wrong answer if it has value and is not equal to the correct answer
  public isAnswerWrong = computed(() => Boolean(
    this.currentAnswer() &&
    this.currentAnswer() !== this.question.correctAnswer)
  );

  public operand1BgColor!: PlanetColors;
  public operand1Size!: PlanetSizes;
  public operand2BgColor!: PlanetColors;
  public operand2Size!: PlanetSizes;

  private userAttempts = signal<MathAnswerAttempt[]>([]);

  public constructor() {
    this.initOperands();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.initOperands();
    }
  }

  public checkAnswer(): void {
    const userAttempt = this.addUserAttempt();

    if (userAttempt && userAttempt.isCorrect) {
      this.questionSolved.emit({
        question: userAttempt.question,
        userAttempts: this.userAttempts(),
      });
      this.currentAnswer.set(undefined);
      this.userAttempts.set([]);
    }
  }

  public onAnswerInputChange(answer: number | undefined): void {
    this.currentAnswer.set(answer);
  }

  private addUserAttempt(): MathAnswerAttempt | null {
    if (!this.question || !this.currentAnswer()) {
      return null;
    }

    const attempt = {
      userAnswer: this.currentAnswer() as number,
      isCorrect: this.currentAnswer() === this.question.correctAnswer,
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
