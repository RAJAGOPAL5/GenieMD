import { NbActionsModule, NbCardModule, NbIconModule, NbTooltipModule, NbButtonModule, NbButtonGroupModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetRoutingModule } from './meet-routing.module';
import { IndexComponent } from './index/index.component';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
  declarations: [IndexComponent, ActionsComponent],
  imports: [
    CommonModule,
    MeetRoutingModule,
    NbCardModule,
    NbIconModule,
    NbTooltipModule,
    NbActionsModule,
    NbButtonModule,
    NbButtonGroupModule
  ]
})
export class MeetModule { }
