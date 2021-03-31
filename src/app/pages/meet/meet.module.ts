import {
  NbActionsModule, NbCardModule, NbIconModule, NbTooltipModule,
  NbButtonModule, NbButtonGroupModule, NbSpinnerModule
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetRoutingModule } from './meet-routing.module';
import { IndexComponent } from './index/index.component';
import { ActionsComponent } from './actions/actions.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';
import { VitalMetricsComponent } from './components/vital-metrics/vital-metrics.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [IndexComponent, ActionsComponent, VitalMetricsComponent, ToolbarComponent],
  imports: [
    CommonModule,
    MeetRoutingModule,
    NbCardModule,
    NbIconModule,
    NbTooltipModule,
    NbActionsModule,
    NbButtonModule,
    NbButtonGroupModule,
    NgxDatatableModule,
    NbSpinnerModule,
    SharedModule
  ]
})
export class MeetModule { }
