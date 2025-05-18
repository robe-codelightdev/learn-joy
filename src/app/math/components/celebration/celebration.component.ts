import {
  AfterViewInit,
  Component,
  computed,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { NgIf } from '@angular/common';

import { ConfettiService } from '../../../shared/libs/confetti.service';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [NgIf],
  templateUrl: './celebration.component.html',
  styleUrl: './celebration.component.css',
})
export class CelebrationComponent implements AfterViewInit, OnChanges {
  /** Total time in seconds */
  @Input()
  public totalQuizTime = 0;

  protected time = signal<number>(0);

  protected timeUnit = signal<string>('');

  private timeUnitTranslations: { [key: string]: string } = {
    second: $localize`:@@timeUnitSecond:second`,
    seconds: $localize`:@@timeUnitSeconds:seconds`,
    minute: $localize`:@@timeUnitMinute:minute`,
    minutes: $localize`:@@timeUnitMinutes:minutes`,
    hour: $localize`:@@timeUnitHour:hour`,
    hours: $localize`:@@timeUnitHours:hours`,
  };

  public constructor(private readonly confettiService: ConfettiService) {}

  public async ngAfterViewInit(): Promise<void> {
    await this.confettiService.throwConfetti();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { totalQuizTime } = changes;

    if (totalQuizTime?.currentValue > 3600) {
      this.time.set(Math.floor(totalQuizTime?.currentValue / 3600));
      const timeUnitKey = this.time() === 1 ? 'hour' : 'hours';
      this.timeUnit.set(this.timeUnitTranslations[timeUnitKey]);
      return;
    }

    if (totalQuizTime?.currentValue > 60) {
      this.time.set(Math.floor(totalQuizTime?.currentValue / 60));
      const timeUnitKey = this.time() === 1 ? 'minute' : 'minutes';
      this.timeUnit.set(this.timeUnitTranslations[timeUnitKey]);
      return;
    }

    this.time.set(totalQuizTime?.currentValue ?? 0);
    const timeUnitKey = this.time() === 1 ? 'second' : 'seconds';
    this.timeUnit.set(this.timeUnitTranslations[timeUnitKey]);
  }
}
