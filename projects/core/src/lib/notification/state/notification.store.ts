import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface NotificationState {
   key: string;
}

export function createInitialState(): NotificationState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'notification' })
export class NotificationStore extends Store<NotificationState> {

  constructor() {
    super(createInitialState());
  }

}
