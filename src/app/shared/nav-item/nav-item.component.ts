import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent {
  @Input()
  public href!: string;

  @Input()
  public imageAlt!: string;

  @Input()
  public imageHeight!: string;

  @Input()
  public imageSrc!: string;

  @Input()
  public imageWidth!: string;

  @Input()
  public text!: string;

  public animationDelay = `${Math.random() * 2}s`;
}
