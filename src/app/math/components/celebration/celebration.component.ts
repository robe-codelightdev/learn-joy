import {Component, OnInit, Renderer2} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-celebration',
  standalone: true,
  imports: [NgIf],
  templateUrl: './celebration.component.html',
  styleUrl: './celebration.component.css'
})
export class CelebrationComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  public ngOnInit() {
    setTimeout(() => this.launchConfetti(), 500);
  }

  public launchConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const confetti = this.renderer.createElement('div');
      this.renderer.addClass(confetti, 'confetti');
      this.renderer.setStyle(confetti, '--color', this.getRandomColor());
      this.renderer.setStyle(confetti, 'left', `${Math.random() * 100}vw`);
      this.renderer.setStyle(confetti, 'top', `${Math.random() * -10}vh`);
      container.appendChild(confetti);
    }
  }

  getRandomColor() {
    const colors = ['#FF5733', '#FFD700', '#4A90E2', '#32CD32', '#FF69B4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
