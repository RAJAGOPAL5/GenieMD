import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareTeamComponent } from './care-team/care-team.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { VitalsComponent } from './vitals/vitals.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'vitals',
    pathMatch: 'full'
  
  },
  {
    path: 'vitals',
    component: VitalsComponent
  },
  {
    path: 'care-team',
    component: CareTeamComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
