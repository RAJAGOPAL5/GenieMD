import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NbActionsModule, NbCardModule, NbChatModule, NbIconModule,
   NbListModule, NbSpinnerModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { NewChatComponent } from './new-chat/new-chat.component';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [ChatRoomComponent, ChatListComponent, NewChatComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NbCardModule,
    NbListModule,
    NbChatModule,
    NbActionsModule,
    NbIconModule,
    NbTooltipModule,
    NbUserModule,
    NbSpinnerModule,
    OrderModule
  ],
  exports: [ChatRoomComponent]
})
export class ChatModule { }
