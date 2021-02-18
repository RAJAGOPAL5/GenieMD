import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { UpsertComponent } from './upsert/upsert.component';
import { IndexComponent } from './index/index.component';
import { NbCardModule, NbFormFieldModule, NbInputModule, NbListModule, NbRouteTabsetModule, NbTabsetModule, NbUserModule, NbIconModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListComponent, UpsertComponent, IndexComponent],
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
  ]
})
export class PatientsModule { }
