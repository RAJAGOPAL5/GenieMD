import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { NbIconModule, NbMenuModule, NbRouteTabsetModule, NbSidebarModule } from '@nebular/theme';
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NbRouteTabsetModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule
  ]
})
export class PagesModule { }
