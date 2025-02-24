import {Component, effect, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {Subject} from "rxjs";

@Component({
  selector: 'app-math-answer-input',
  standalone: true,
  imports: [
    NgIf,
  ],
  templateUrl: './math-answer-input.component.html',
  styleUrl: './math-answer-input.component.css'
})
export class MathAnswerInputComponent implements OnChanges {
  @Input()
  public isAnswerWrong = 0;

  @Input()
  public value: number | undefined = undefined;

  public inputChanges = new Subject<number | undefined>();

  public shake = signal(false);

  public constructor() {
    effect(() => {
      if (this.shake()) {
        setTimeout(() => this.shake.set(false), 300);
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // if the value is changed and the answer is wrong, shake the input
    if (changes['isAnswerWrong']) {
      this.shake.set(true);
    }
  }

  public onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;

    if (!Boolean(value.trim()) || isNaN(Number(value))) {
      this.inputChanges.next(undefined);
      return;
    }

    this.inputChanges.next(Number(value));
  }
}
