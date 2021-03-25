import { Component, Inject, OnInit } from '@angular/core';
import { NbWindowConfig, NB_WINDOW_CONTEXT } from '@nebular/theme';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  chatInfo: any;
  constructor(@Inject(NB_WINDOW_CONTEXT) context) {
    this.chatInfo = {
      conversationId: context.conversationID,
      type: 2
    };
  }
  ngOnInit(): void {
  }

}
