import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-shooting-star',
  standalone: true,
  imports: [],
  templateUrl: './shooting-star.component.html',
  styleUrl: './shooting-star.component.css'
})
export class ShootingStarComponent {
  @Input()
  public starColor: string = '#ffe96f';

  @HostBinding('style.--starColor')
  get starColorVar() {
    return this.starColor;
  }
}
