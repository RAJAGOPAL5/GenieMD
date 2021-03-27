import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreConfig } from '@datorama/akita';

export interface ChatState {
  chatList?: any;
  convList?: any;
  messageList?: any;
  createMessage?: any;
  urlInfo?: any;
}
// Changed function name to avoid name collision
export function createChatState(): ChatState {
  return {
  };
}

@Injectable()
@StoreConfig({ name: 'chat' })
export class ChatStore extends Store<ChatState> {

  constructor() {
    super(createChatState());
  }

}
