import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { authRoutes } from './shared/routes/auth-routes';
import { layoutRoutes } from './shared/routes/layout-routes';

const routes: Routes = [
  // {
  //   path: ':clinicID', component: FullLayoutComponent, data: { title: 'content Views' }, children: authRoutes
  // },
  {
    path: 'dashboard/:clinicID/:userID', component: ContentLayoutComponent ,  data: { title: 'full Views' }, children: layoutRoutes,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
