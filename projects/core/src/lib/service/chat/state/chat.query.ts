import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ChatStore, ChatState } from './chat.store';

@Injectable({ providedIn: 'root' })
export class ChatQuery extends Query<ChatState> {
  chatInfo$ = this.select('chatList');
  conversationInfo$ = this.select('convList');
  messageInfo$ = this.select('messageList');
  createMessageInfo$ = this.select('createMessage');
  urlData$ = this.select('urlInfo');


  constructor(protected store: ChatStore) {
    super(store);
  }

}
