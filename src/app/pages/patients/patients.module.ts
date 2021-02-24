import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { IndexComponent } from './index/index.component';
import { NbCardModule, NbFormFieldModule, NbInputModule, NbListModule, NbRouteTabsetModule, NbTabsetModule, NbUserModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbRadioModule, NbSelectModule, NbToggleModule, NbDatepickerModule, NbActionsModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [ListComponent, UpsertComponent, IndexComponent, AddComponent],
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
    NbActionsModule
  ]
})
export class PatientsModule { }
