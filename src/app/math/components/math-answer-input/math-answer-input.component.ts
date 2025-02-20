import {Component, effect, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";

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
  public isAnswerWrong = false;

  @Input()
  public value: number | undefined = undefined;

  @Output()
  public enterKeyPressed = new EventEmitter<void>();

  @Output()
  public valueChanged = new EventEmitter<number | undefined>();

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
    if (changes['value'] && this.isAnswerWrong) {
      this.shake.set(true);
    }
  }

  public onValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.value = value ? Number(value) : undefined;
    this.valueChanged.emit(this.value);
  }
}
