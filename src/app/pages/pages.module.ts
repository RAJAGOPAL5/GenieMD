import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { NbRouteTabsetModule } from '@nebular/theme';
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NbRouteTabsetModule
  ]
})
export class PagesModule { }
