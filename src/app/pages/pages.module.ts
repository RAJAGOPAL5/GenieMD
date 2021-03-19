import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from '../shared/shared.module';
import { NbIconModule, NbMenuModule, NbRouteTabsetModule, NbSidebarModule, NbUserModule, NbSelectModule,
   NbButtonModule, NbThemeModule, NbTooltipModule, NbButtonGroupModule, NbLayoutModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbRouteTabsetModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule,
    NbUserModule,
    NbButtonModule,
    NbThemeModule,
    NbTooltipModule,
  ]
})
export class PagesModule { }
