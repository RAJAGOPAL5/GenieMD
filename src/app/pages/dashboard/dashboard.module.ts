import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PatientsComponent } from './patients/patients.component';

import {TabsModule} from 'ngx-tabset';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DashboardComponent, PatientsComponent],
  imports: [
    NgbModule,
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    TabsModule.forRoot()
  ]
})
export class DashboardModule { }
