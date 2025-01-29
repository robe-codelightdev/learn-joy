import {Routes} from '@angular/router';

import {MultiplicationComponent} from "./math/multiplication/multiplication.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'math/multiplication',
    pathMatch: 'full'
  },
  {
    path: 'math/multiplication',
    component: MultiplicationComponent,
    title: 'Multiplicación'
  }
];
