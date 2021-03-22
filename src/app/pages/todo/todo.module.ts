import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { ListComponent } from './list/list.component';
import { NbCardModule, NbSpinnerModule, NbButtonModule, NbButtonGroupModule} from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NbCardModule,
    NbSpinnerModule,
    NgxDatatableModule,
    NbButtonModule,
    NbButtonGroupModule

  ]
})
export class TodoModule { }
