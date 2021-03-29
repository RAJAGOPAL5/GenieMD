import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { ListComponent } from './list/list.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbListModule, NbSpinnerModule } from '@nebular/theme';
import { AvatarModule } from 'ngx-avatar';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    NbCardModule,
    AvatarModule,
    NbListModule,
    NbSpinnerModule,
    NbIconModule,
    NbDialogModule,
    NbButtonModule,
    TranslateModule.forChild(),
  ]
})
export class NotificationsModule { }
