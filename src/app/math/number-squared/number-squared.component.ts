import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-number-squared',
  standalone: true,
  imports: [],
  templateUrl: './number-squared.component.html',
  styleUrl: './number-squared.component.css'
})
export class NumberSquaredComponent {
  @Input()
  public number: number = 0;
}
