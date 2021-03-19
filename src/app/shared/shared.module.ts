import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {
  NbDialogModule, NbLayoutModule, NbThemeModule, NbIconModule, NbInputModule,
  NbTreeGridModule, NbCardModule, NbButtonModule, NbActionsModule, NbPopoverModule,
  NbPopoverDirective, NbSelectModule, NbTooltipModule, NbDatepickerModule, NbButtonGroupModule,
  NbTabsetModule, NbRouteTabsetModule, NbRadioModule, NbCheckboxModule, NbCalendarRangeModule, NbCalendarModule,
  NbSpinnerModule, NbUserModule
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { DevicesComponent } from './components/devices/devices.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TimeSlotsComponent } from './components/time-slots/time-slots.component';
import { AddComponent } from './components/add/add.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { AvatarModule } from 'ngx-avatar';
import { AlertsListComponent } from './components/alerts-list/alerts-list.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DevicesComponent,
    TimeSlotsComponent,
    AddComponent,
    FilterDialogComponent,
    AlertsListComponent],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbDialogModule.forChild(),
    NbIconModule,
    ReactiveFormsModule,
    NbInputModule,
    NbTreeGridModule,
    NbCardModule,
    NbActionsModule,
    NbButtonModule,
    NbPopoverModule,
    NbSelectModule,
    NbTooltipModule,
    NbDatepickerModule,
    NbButtonGroupModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbRadioModule,
    NbCheckboxModule,
    NbCalendarRangeModule,
    NbCalendarModule,
    AvatarModule,
    NbSpinnerModule,
    NbUserModule,
    TranslateModule.forRoot(),
    FormsModule

  ],
  exports: [NbLayoutModule,
    DevicesComponent,
    TimeSlotsComponent,
    AlertsListComponent
  ]
})
export class SharedModule { }
