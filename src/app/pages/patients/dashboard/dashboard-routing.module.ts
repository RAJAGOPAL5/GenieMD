import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdherenceComponent } from './adherence/adherence.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent
  },
  {
    path: 'adherence',
    component: AdherenceComponent
  },
  {
    path: 'measurements',
    component: MeasurementsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
