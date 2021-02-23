import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { CareTeamComponent } from './care-team/care-team.component';
import { HistoryComponent } from './history/history.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { VisitsComponent } from './visits/visits.component';
import { VitalsComponent } from './vitals/vitals.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: ':patientID/edit',
    component: AddComponent,
    data: {title: 'edit'}
  },
  {
    path: 'create',
    component: AddComponent,
    data: {title: 'add'}
  },
  {
    path: '',
    component: IndexComponent,
    data: { title:  'patients'},
    children: [
      {
        path: ':patientId',
        component: ProfileComponent,
        data: { title:  'patients'},
        children: [
          {
            path: 'vitals',
            component: VitalsComponent,
            data: { title: 'Vitals' }
          },
          {
            path: 'care-team',
            component: CareTeamComponent,
            data: { title: 'Care-Team' }
          },
          {
            path: 'history',
            component: HistoryComponent,
            data: { title: 'History' }
          },
          {
            path: 'alerts',
            component: AlertsComponent,
            data: { title: 'Alerts'}
          },
          {
            path: 'visits',
            component:VisitsComponent,
            data: {title: 'Visits'}
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
