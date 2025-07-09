import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index/index.component';
import { IndexnotFoundComponent } from '@component/globales/notfound/index/index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    component: IndexComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layout/index/index-layout.routing').then(x=>x.IndexLayoutRoutes)
      },
      {
        path: '**',
        component: IndexnotFoundComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

