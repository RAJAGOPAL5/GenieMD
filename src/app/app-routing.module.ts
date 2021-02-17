import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { authRoutes } from './shared/routes/auth-routes';
import { layoutRoutes } from './shared/routes/layout-routes';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import { LandingComponent } from './pages/landing/landing.component';
const routes: Routes = [
  {
    path: '', component: LandingComponent, data: { title: 'content Views' }
  },
  {
    path: ':clinicID', component: AuthLayoutComponent, data: { title: 'content Views' }, children: authRoutes
  },
  {
    path: 'dashboard/:clinicID/:userID', component: ContentLayoutComponent ,  data: { title: 'full Views' }, children: layoutRoutes,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
