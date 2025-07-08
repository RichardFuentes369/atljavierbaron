import { Routes } from '@angular/router';

import { indexGuard } from '@guard/roles/index/index.guard';

import { InicioComponent } from '@module/basic/index/inicio/inicio.component'

export const IndexLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    title: 'Inicio',
    component: InicioComponent
  },
];
