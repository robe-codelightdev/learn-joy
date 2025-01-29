import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {NumberPair} from "../shared/models/math.model";
import {NumberSquaredComponent} from "../number-squared/number-squared.component";

@Component({
  selector: 'app-multiplication',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NumberSquaredComponent
  ],
  templateUrl: './multiplication.component.html',
  styleUrl: './multiplication.component.css'
})
export class MultiplicationComponent {
  public currentQuestion: NumberPair | null = null;
  public isAnswerWrong = false;
  public userAnswer: number | null = null;
  public questionsTotal = 0;

  private questions: NumberPair[] = this.generateQuestions();

  public constructor() {
    this.questionsTotal = this.questions.length;
    this.nextQuestion();
  }

  public get answerProgress() {
    return this.questionsTotal - this.questions.length - 1;
  }

  public checkAnswer() {
    try {
      if (this.currentQuestion) {
        const correctAnswer = this.currentQuestion.number1 * this.currentQuestion.number2;

        if (this.userAnswer === correctAnswer) {
          console.log('checking answer', {
            answer: this.userAnswer,
            question: this.currentQuestion,
          });

          this.isAnswerWrong = false;
          this.userAnswer = null;
          this.nextQuestion();
        } else {
          this.isAnswerWrong = true;
        }
      }
    } catch (e) {
      console.error('ERROR ', e)
    }

  }

  private generateQuestions() {
    const questions = [];
    for (let i = 2; i <= 9; i++) {
      for (let j = i; j <= 9; j++) {
        questions.push({number1: i, number2: j});
      }
    }
    return this.shuffleArray(questions);
  }

  private shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  private nextQuestion() {
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions?.pop() ?? null;
    } else {
      this.currentQuestion = null;
    }
  }
}
