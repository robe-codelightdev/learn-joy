import {Component, Input} from '@angular/core';

import {PlanetColors, PlanetSizes} from "../../models/planet.enum";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-number-planet',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './number-planet.component.html',
  styleUrl: './number-planet.component.css'
})
export class NumberPlanetComponent {
  @Input()
  public numberColor = '#FFFFFF';

  @Input()
  public planetColor = PlanetColors.COSMIC_BLUE;

  @Input()
  public planetNumber!: number;

  @Input()
  public planetSize = PlanetSizes.MEDIUM;

  public animationDelay = `${Math.random() * 2}s`;
}
