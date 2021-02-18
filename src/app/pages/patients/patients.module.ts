import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { IndexComponent } from './index/index.component';
import { NbCardModule, NbListModule, NbUserModule } from '@nebular/theme';


@NgModule({
  declarations: [ListComponent, UpsertComponent, IndexComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    NbCardModule,
    NbUserModule,
    NbListModule
  ]
})
export class PatientsModule { }
