import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NotificationStore } from './notification.store';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(private notificationStore: NotificationStore, private http: HttpClient) {
  }
  async notifyOptions(data) {
    try {
      this.notificationStore.setLoading(true);
      await this.http.post(`Notifications/NotifyUsersWithOptions`, data)
        .pipe(
          tap((response: any) => {
            console.log('notifyOptions result:', response);
            this.notificationStore.update({
              notifyInfo: response,
            });
          })
        ).toPromise();
    } catch (error) {
      console.log('notifyOption', error.statusText);
      this.notificationStore.setError(error);
    }
  }
  // notifyOptions(data) {
  //   return this.http.post(`Notifications/NotifyUsersWithOptions`, data);
  // }

}
