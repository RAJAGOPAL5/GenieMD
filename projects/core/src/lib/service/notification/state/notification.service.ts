import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NotificationStore } from './notification.store';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(private notificationStore: NotificationStore, private http: HttpClient) {
  }
  notifyOptions(data) {
    return this.http.post(`Notifications/NotifyUsersWithOptions`, data);
  }

}
