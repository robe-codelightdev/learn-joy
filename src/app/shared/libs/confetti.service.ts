import { Injectable } from '@angular/core';
import confetti from "canvas-confetti";

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  public constructor() { }

  public async throwConfetti(): Promise<void> {
    await confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
