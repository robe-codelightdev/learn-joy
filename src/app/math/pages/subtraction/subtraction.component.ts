import { Component } from '@angular/core';

import {MathOperator, MathQuestion} from "../../models/math.model";
import {MathService} from "../../services/math.service";
import {MathOperationComponent} from "../../components/math-operation/math-operation.component";

@Component({
  selector: 'app-subtraction',
  standalone: true,
  imports: [
    MathOperationComponent
  ],
  templateUrl: './subtraction.component.html',
  styleUrl: './subtraction.component.css'
})
export class SubtractionComponent {
  public quiz: MathQuestion[] = [];

  public MathOperator = MathOperator;

  public constructor(
    private readonly mathService: MathService,
  ) {
    this.quiz = this.mathService.generateSubtractionQuiz();
  }
}
