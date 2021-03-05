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
  NbBadgeModule, NbTooltipModule, NbPopoverModule, NbCalendarRangeModule, NbCalendarModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
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

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
// }


@NgModule({
  declarations: [
    ListComponent, UpsertComponent, IndexComponent, AddComponent, FilterDialogComponent, ChartComponent,
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
    Spo2Component
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
    TranslateModule.forRoot(),
    NbBadgeModule,
    NbTooltipModule,
    ChartsModule,
    NgxDateRangeModule,
    NbPopoverModule,
    NbCalendarRangeModule,
    NbCalendarModule
  ],
  entryComponents: [AddComponent]
})
export class PatientsModule { }
