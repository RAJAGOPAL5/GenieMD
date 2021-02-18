import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareTeamComponent } from './dashboard/care-team/care-team.component';
import { HistoryComponent } from './dashboard/history/history.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { VitalsComponent } from './dashboard/vitals/vitals.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'vitals',
        component: VitalsComponent
      },
      {
        path: 'care-team',
        component: CareTeamComponent
      },
      {
        path:'history',
        component: HistoryComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
