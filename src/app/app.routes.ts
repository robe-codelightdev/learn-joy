import {Routes} from '@angular/router';

import {MultiplicationComponent} from "./math/pages/multiplication/multiplication.component";
import {AdditionComponent} from "./math/pages/addition/addition.component";
import {HomeComponent} from "./home/home.component";
import {SubtractionComponent} from "./math/pages/subtraction/subtraction.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'math/multiplication',
    component: MultiplicationComponent,
    title: 'Multiplicación'
  },
  {
    path: 'math/addition',
    component: AdditionComponent,
    title: 'Suma'
  },
  {
    path: 'math/subtraction',
    component: SubtractionComponent,
    title: 'Substracción'
  }
];
