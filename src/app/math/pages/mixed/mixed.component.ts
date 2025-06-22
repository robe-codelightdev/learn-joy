import {Component} from '@angular/core';

import {MathOperationComponent} from "../../components/math-operation/math-operation.component";
import {MathOperator, MathQuestion} from "../../models/math.model";
import {MathService} from "../../services/math.service";


@Component({
    selector: 'app-mixed',
    imports: [
        MathOperationComponent
    ],
    templateUrl: './mixed.component.html',
    styleUrl: './mixed.component.css'
})
export class MixedComponent {
  public quiz: MathQuestion[] = [];

  public MathOperator = MathOperator;

  public constructor(
    private readonly mathService: MathService,
  ) {
    this.quiz = this.mathService.generateMixedQuiz();
  }
}
