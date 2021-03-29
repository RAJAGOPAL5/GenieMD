import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetRoutingModule } from './meet-routing.module';
import { IndexComponent } from './index/index.component';
import { ActionsComponent } from './actions/actions.component';


@NgModule({
  declarations: [IndexComponent, ActionsComponent],
  imports: [
    CommonModule,
    MeetRoutingModule
  ]
})
export class MeetModule { }
