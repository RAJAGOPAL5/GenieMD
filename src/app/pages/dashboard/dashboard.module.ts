import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientsComponent } from './patients/patients.component';

import {TabsModule} from 'ngx-tabset';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, PatientsComponent, AddPatientComponent],
  imports: [
    NgbModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule,TabsModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,


  ]
})
export class DashboardModule { }
