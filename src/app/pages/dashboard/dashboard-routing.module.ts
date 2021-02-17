import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from 'src/app/layouts/content-layout/content-layout.component';
import { layoutRoutes } from 'src/app/shared/routes/layout-routes';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard/:clinicID/:userID',  component: ContentLayoutComponent ,  data: { title: 'full Views' }, children: layoutRoutes,
  },

    {
      path: '',
      component: DashboardComponent,
      // data: { title: 'Protocol' }
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }