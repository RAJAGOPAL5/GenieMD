import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { IndexComponent } from './index/index.component';
import {
  NbCardModule, NbFormFieldModule,
  NbInputModule, NbListModule, NbRouteTabsetModule,
  NbTabsetModule, NbUserModule, NbIconModule, NbSpinnerModule,
  NbButtonModule, NbRadioModule, NbSelectModule, NbToggleModule,
  NbDatepickerModule, NbActionsModule, NbButtonGroupModule, NbCheckboxModule,
  NbBadgeModule, NbTooltipModule, NbPopoverModule, NbCalendarRangeModule, NbCalendarModule, NbTreeGridModule, NbTagModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChartComponent } from './vitals/chart/chart.component';
import { AlertsComponent } from './alerts/alerts.component';
import { CareTeamComponent } from './care-team/care-team.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { VisitsComponent } from './visits/visits.component';
import { VitalsComponent } from './vitals/vitals.component';
import { ChartsModule } from 'ng2-charts';
import { BloodPressureComponent } from './vitals/chart/blood-pressure/blood-pressure.component';
import { GlucoseComponent } from './vitals/chart/glucose/glucose.component';
import { TemperatureComponent } from './vitals/chart/temperature/temperature.component';
import { WeightComponent } from './vitals/chart/weight/weight.component';
import { Spo2Component } from './vitals/chart/spo2/spo2.component';
import { NgxDateRangeModule } from 'ngx-daterange';
import { CareCircleComponent } from './care-team/care-circle/care-circle.component';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpsertAlertComponent } from './alerts/upsert-alert/upsert-alert.component';
import { OrderModule } from 'ngx-order-pipe';
import { ScheduleComponent } from './schedule/schedule.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
// }


@NgModule({
  declarations: [
    ListComponent, UpsertComponent, IndexComponent, ChartComponent,
    VitalsComponent,
    CareTeamComponent,
    HistoryComponent,
    ProfileComponent,
    AlertsComponent,
    VisitsComponent,
    BloodPressureComponent,
    GlucoseComponent,
    TemperatureComponent,
    WeightComponent,
    Spo2Component,
    CareCircleComponent,
    UpsertAlertComponent,
    ScheduleComponent,
    AssessmentComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    NbCardModule,
    NbUserModule,
    NbListModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    FormsModule,
    NbSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbRadioModule,
    NbSelectModule,
    NbToggleModule,
    NbDatepickerModule,
    NbActionsModule,
    NbButtonGroupModule,
    NbListModule,
    NbActionsModule,
    NbCheckboxModule,
    NbBadgeModule,
    TranslateModule.forChild(),
    NbTooltipModule,
    ChartsModule,
    NgxDateRangeModule,
    NbPopoverModule,
    NbCalendarRangeModule,
    NbCalendarModule,
    AvatarModule,
    SharedModule,
    NbTreeGridModule,
    NbTagModule,
    OrderModule,
    NgxDatatableModule
    ],
  entryComponents: [UpsertAlertComponent]
})
export class PatientsModule { }
