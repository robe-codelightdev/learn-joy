import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {NavItemComponent} from "./shared/nav-item/nav-item.component";
import {ShootingStarComponent} from "./shared/shooting-star/shooting-star.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavItemComponent, ShootingStarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

}
