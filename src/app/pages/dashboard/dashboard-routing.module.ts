import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageResolve } from 'src/app/shared/resolvers /language.resolve';
import { AdherenceComponent } from './adherence/adherence.component';
import { IndexComponent } from './index/index.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { PatientsComponent } from './patients/patients.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'patients',
        component: PatientsComponent,
        data: { title: 'Patients' },
        resolve: {
          language: LanguageResolve
        },

      },
      {
        path: 'adherence',
        component: AdherenceComponent,
        data: { title: 'Adherence' }

      },
      {
        path: 'measurements',
        component: MeasurementsComponent,
        data: { title: 'Measurements' }

      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
