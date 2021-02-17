import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientsComponent } from './patients/patients.component';

import {TabsModule} from 'ngx-tabset';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DashboardComponent, PatientsComponent, AddPatientComponent],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule,TabsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    UiSwitchModule

  ]
})
export class DashboardModule { }
