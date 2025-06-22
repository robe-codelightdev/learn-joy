import {Routes} from '@angular/router';

import {MultiplicationComponent} from "./math/pages/multiplication/multiplication.component";
import {AdditionComponent} from "./math/pages/addition/addition.component";
import {HomeComponent} from "./home/home.component";
import {SubtractionComponent} from "./math/pages/subtraction/subtraction.component";
import {DivisionComponent} from "./math/pages/division/division.component";
import {MixedComponent} from "./math/pages/mixed/mixed.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Learn JOY'
  },
  {
    path: 'math/addition',
    component: AdditionComponent,
    title: 'Suma'
  },
  {
    path: 'math/division',
    component: DivisionComponent,
    title: 'División'
  },
  {
    path: 'math/mixed',
    component: MixedComponent,
    title: 'Variado'
  },
  {
    path: 'math/multiplication',
    component: MultiplicationComponent,
    title: 'Multiplicación'
  },
  {
    path: 'math/subtraction',
    component: SubtractionComponent,
    title: 'Substracción'
  }
];
