import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface NotificationState {
  clinicID: string;
  command?: string;
  message?: string;
  messageContent?: string;
  messageType?: number;
  subject?: string;
  url?: string;
  userID: string;
  users?: string[];
  payload?: {};
  smsMessages?: any;
  pushNotification?: {};
  notifyInfo?: any;
}

export function createNotificationState(): NotificationState {
  return {
    clinicID: '',
    command: '',
    message: '',
    messageContent: '',
    messageType: 0,
    subject: '',
    url: '',
    userID: '',
    users: [],
    payload: {},
    smsMessages: '',
    pushNotification: {},
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'notification' })
export class NotificationStore extends Store<NotificationState> {

  constructor() {
    super(createNotificationState());
  }

}
