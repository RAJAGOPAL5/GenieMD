import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PatientsComponent } from './patients/patients.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AdherenceComponent } from './adherence/adherence.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [PatientsComponent, MeasurementsComponent, AdherenceComponent, IndexComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
