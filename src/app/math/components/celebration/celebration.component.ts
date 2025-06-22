import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';

import {ConfettiService} from '../../../shared/libs/confetti.service';

@Component({
    selector: 'app-celebration',
    templateUrl: './celebration.component.html',
    styleUrl: './celebration.component.css'
})
export class CelebrationComponent implements AfterViewInit, OnChanges {
  /** Total time in seconds */
  @Input()
  public totalQuizTime = 0;

  protected formattedQuizTime = signal<string>('');

  private timeUnitTranslations: { [key: string]: string } = {
    second: $localize`:@@timeUnitSecond:sec`,
    seconds: $localize`:@@timeUnitSeconds:secs`,
    minute: $localize`:@@timeUnitMinute:min`,
    minutes: $localize`:@@timeUnitMinutes:mins`,
    hour: $localize`:@@timeUnitHour:hr`,
    hours: $localize`:@@timeUnitHours:hrs`,
  };

  public constructor(private readonly confettiService: ConfettiService) {
  }

  public async ngAfterViewInit(): Promise<void> {
    await this.confettiService.throwConfetti();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const {totalQuizTime} = changes;

    if (totalQuizTime) {
      this.formatQuizTime(totalQuizTime.currentValue);
    }
  }

  /**
   *  Calculate the text to display and set the formattedQuizTime signal.
   *  @param quizTime - The total quiz time in seconds
   */
  private formatQuizTime(quizTime: number): void {
    const formattedParts: string[] = [];

    const hours = Math.floor(quizTime / 3600);
    const mins = Math.floor((quizTime % 3600) / 60);
    const secs = quizTime % 60;

    if (hours > 0) {
      const timeUnitKey = hours === 1 ? 'hour' : 'hours';
      formattedParts.push(`${hours} ${this.timeUnitTranslations[timeUnitKey]}`);
    }

    if (mins > 0) {
      const timeUnitKey = mins === 1 ? 'minute' : 'minutes';
      formattedParts.push(`${mins} ${this.timeUnitTranslations[timeUnitKey]}`);
    }

    if (secs > 0) {
      const timeUnitKey = secs === 1 ? 'second' : 'seconds';
      formattedParts.push(`${secs} ${this.timeUnitTranslations[timeUnitKey]}`);
    }

    this.formattedQuizTime.set(formattedParts.join(', '));
  }
}
