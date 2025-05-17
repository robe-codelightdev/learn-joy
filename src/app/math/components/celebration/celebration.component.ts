import { AfterViewInit, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { ConfettiService } from '../../../shared/libs/confetti.service';

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [NgIf],
  templateUrl: './celebration.component.html',
  styleUrl: './celebration.component.css',
})
export class CelebrationComponent implements AfterViewInit {
  /** Total time in minutes */
  @Input()
  public totalQuizTime = 0;

  public constructor(private readonly confettiService: ConfettiService) {}

  public async ngAfterViewInit(): Promise<void> {
    await this.confettiService.throwConfetti();
  }
}
