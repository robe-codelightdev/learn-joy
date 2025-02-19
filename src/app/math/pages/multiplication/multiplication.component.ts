import {Component} from '@angular/core';

import {MathOperator, MathQuestion} from "../../models/math.model";
import {MathService} from "../../services/math.service";
import {MathOperationComponent} from "../../components/math-operation/math-operation.component";

@Component({
  selector: 'app-multiplication',
  standalone: true,
    imports: [MathOperationComponent],
  templateUrl: './multiplication.component.html',
  styleUrl: './multiplication.component.css'
})
export class MultiplicationComponent {
  public quiz: MathQuestion[] = [];

  public MathOperator = MathOperator;

  public constructor(
    private readonly mathService: MathService,
  ) {
    this.quiz = this.mathService.generateMultiplicationQuiz();
  }
}
