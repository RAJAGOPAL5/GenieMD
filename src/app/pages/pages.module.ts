import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PatientsComponent } from './dashboard/patients/patients.component';
import { UpsertPatientComponent } from './dashboard/upsert-patient/upsert-patient.component';
import { VitalsComponent } from './dashboard/vitals/vitals.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CareTeamComponent } from './dashboard/care-team/care-team.component';
import { HistoryComponent } from './dashboard/history/history.component';


@NgModule({
  declarations: [IndexComponent, DashboardComponent, PatientsComponent, UpsertPatientComponent, VitalsComponent, ProfileComponent, CareTeamComponent, HistoryComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
