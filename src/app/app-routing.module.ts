import { ClinicConfigResolver } from './shared/resolvers /clinic-config.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileResolve } from './shared/resolvers /profile.resolve';


const routes: Routes = [
  {
    path: ':clinicID',
    children: [
      {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        resolve: {clinicConfig: ClinicConfigResolver}
      },
      {
        path: ':userID',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
        resolve: {clinicConfig: ClinicConfigResolver, profile: ProfileResolve}
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
