import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageResolve } from '../shared/resolvers /language.resolve';
import { IndexComponent } from './index/index.component';
import { PatientsModule } from './patients/patients.module';

const routes: Routes = [
  {
    path: 'patients',
    component: IndexComponent,
    resolve: {
      language: LanguageResolve
    },
    data: { title: 'Patients'},
    loadChildren: () => import('./patients/patients.module').then(m => PatientsModule)
  },
  {
    path: 'dashboard',
    component: IndexComponent,
    data: { title: 'Dashboard'},

    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
