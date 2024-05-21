import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/actividades-admin/actividades-admin.component').then(
        (mod) => mod.ActividadesAdminComponent
      ),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
