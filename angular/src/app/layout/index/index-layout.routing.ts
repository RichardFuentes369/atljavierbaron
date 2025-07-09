import { Routes } from '@angular/router';

import { InicioComponent } from '@module/inicio/inicio.component'

export const IndexLayoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    title: 'Inicio',
    component: InicioComponent,
  },
];
