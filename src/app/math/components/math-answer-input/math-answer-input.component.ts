import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
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
export class MathAnswerInputComponent {
  @Input()
  public isAnswerWrong = false;

  @Input()
  public value: number | undefined = undefined;

  @Output()
  public enterKeyPressed = new EventEmitter<void>();

  @Output()
  public valueChanged = new EventEmitter<number | undefined>();

  public onValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    this.value = value ? Number(value) : undefined;
    this.valueChanged.emit(this.value);
  }
}
