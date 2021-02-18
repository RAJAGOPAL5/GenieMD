import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PatientsModule } from './patients/patients.module';

const routes: Routes = [
  {
    path: 'patients',
    component: IndexComponent,
    data:{ title: 'patients'},
    loadChildren: () => import('./patients/patients.module').then(m => PatientsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
