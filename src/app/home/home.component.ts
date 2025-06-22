import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @HostBinding('class.glass-box')
  public applyGlass = true;
}
