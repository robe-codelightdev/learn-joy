import {Component} from '@angular/core';

import {MathOperationComponent} from "../../components/math-operation/math-operation.component";
import {MathOperator, MathQuestion} from "../../models/math.model";
import {MathService} from "../../services/math.service";

@Component({
  selector: 'app-division',
  standalone: true,
  imports: [
    MathOperationComponent
  ],
  templateUrl: './division.component.html',
  styleUrl: './division.component.css'
})
export class DivisionComponent {
  public quiz: MathQuestion[] = [];

  public MathOperator = MathOperator;

  public constructor(
    private readonly mathService: MathService,
  ) {
    this.quiz = this.mathService.generateDivisionQuiz();
  }
}
