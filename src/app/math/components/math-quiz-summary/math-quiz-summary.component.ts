import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

import {MathQuizSummaryItem} from "../../models/math.model";

@Component({
  selector: 'app-math-quiz-summary',
  imports: [NgForOf],
  templateUrl: './math-quiz-summary.component.html',
  styleUrl: './math-quiz-summary.component.css'
})
export class MathQuizSummaryComponent {
  @Input()
  public mathQuizSummaryItems: MathQuizSummaryItem[] = [];
}
