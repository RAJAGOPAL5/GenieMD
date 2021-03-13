import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NotificationStore, NotificationState } from './notification.store';

@Injectable({ providedIn: 'root' })
export class NotificationQuery extends Query<NotificationState> {
  notifyInfo$ = this.select('notifyInfo')

  constructor(protected store: NotificationStore) {
    super(store);
  }

}
