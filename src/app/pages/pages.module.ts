import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { IndexComponent } from './index/index.component';
import { DahboardComponent } from './dahboard/dahboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [IndexComponent, DahboardComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
