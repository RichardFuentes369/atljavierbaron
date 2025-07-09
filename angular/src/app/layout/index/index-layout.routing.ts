import { Routes } from '@angular/router';

import { WelcomeComponent } from '@module/index/welcome/welcome.component'

export const IndexLayoutRoutes: Routes = [
  {
    path: 'inicio',
    title: 'Inicio',
    component: WelcomeComponent
  },
];
