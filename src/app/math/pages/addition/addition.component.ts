import {Component} from '@angular/core';

import {MathService} from "../../services/math.service";
import {MathOperator, MathQuestion} from "../../models/math.model";
import {MathOperationComponent} from "../../components/math-operation/math-operation.component";

@Component({
  selector: 'app-addition',
  standalone: true,
  imports: [MathOperationComponent],
  templateUrl: './addition.component.html',
  styleUrl: './addition.component.css'
})
export class AdditionComponent {
  public quiz: MathQuestion[] = [];

  public MathOperator = MathOperator;

  public constructor(
    private readonly mathService: MathService,
  ) {
    this.quiz = this.mathService.generateAdditionQuiz();
  }
}
