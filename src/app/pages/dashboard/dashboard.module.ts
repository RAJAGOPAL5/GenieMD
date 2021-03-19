import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PatientsComponent } from './patients/patients.component';
import { MeasurementsComponent } from './measurements/measurements.component';
import { AdherenceComponent } from './adherence/adherence.component';
import { IndexComponent } from './index/index.component';
import {
  NbActionsModule, NbBadgeModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbDatepickerModule,
  NbInputModule, NbRouteTabsetModule, NbSelectModule, NbSpinnerModule, NbTooltipModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

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
    NgxDatatableModule,
    FormsModule,
    NbSpinnerModule,
    SharedModule,
    NbActionsModule,
    NbBadgeModule,
    NbTooltipModule,
    NbDatepickerModule,
    NbButtonGroupModule,
    TranslateModule.forRoot(),

  ]
})
export class DashboardModule { }
