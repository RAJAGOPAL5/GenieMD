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
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  {
    path: ':patientID/edit',
    component: AddComponent,
    data: {title: 'Edit'}
  },
  {
    path: 'create',
    component: AddComponent,
    data: {title: 'Add'}
  },
  {
    path: '',
    component: IndexComponent,
    data: { title:  'Patients'},
    children: [
      {
        path: ':patientId',
        component: ProfileComponent,
        data: { title:  'Patients'},
        children: [
          {
            path: 'vitals',
            component: VitalsComponent,
            data: { title: 'Vitals' }
          },
          {
            path: 'schedule',
            component: ScheduleComponent,
            data: { title: 'Schedules' }
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
