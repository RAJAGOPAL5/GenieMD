import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { IndexComponent } from './index/index.component';
import { NbCardModule, NbFormFieldModule, NbInputModule, NbListModule, NbRouteTabsetModule, NbTabsetModule, NbUserModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbRadioModule, NbSelectModule, NbToggleModule, NbDatepickerModule, NbActionsModule, NbButtonGroupModule, NbCheckboxModule,NbTooltipModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';


@NgModule({
  declarations: [ListComponent, UpsertComponent, IndexComponent, AddComponent, FilterDialogComponent],
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
    NbTooltipModule
  ],
  entryComponents: [AddComponent]
})
export class PatientsModule { }
