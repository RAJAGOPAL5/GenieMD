import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PatientsComponent } from './patients/patients.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AdherenceComponent } from './adherence/adherence.component';
import { IndexComponent } from './index/index.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbRouteTabsetModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  declarations: [PatientsComponent, MeasurementsComponent, AdherenceComponent, IndexComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
    NbRouteTabsetModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbEvaIconsModule,
    NgxDatatableModule
  ]
})
export class DashboardModule { }
