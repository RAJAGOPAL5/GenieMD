import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareTeamComponent } from './care-team/care-team.component';
import { HistoryComponent } from './history/history.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { VitalsComponent } from './vitals/vitals.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'vitals',
    component: VitalsComponent,
    data: {title: 'Vitals'}
  },
  {
    path: 'care-team',
    component: CareTeamComponent,
    data: {title: 'Care-Team'}
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {title: 'History'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {title: 'Profile'}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
