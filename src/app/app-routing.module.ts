import { ClinicConfigResolver } from './shared/resolvers /clinic-config.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    resolve: {clinicConfig: ClinicConfigResolver}
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    resolve: {clinicConfig: ClinicConfigResolver}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
