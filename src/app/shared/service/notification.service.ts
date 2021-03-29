import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  notifyOptions(data) {
    return this.http.post(`Notifications/NotifyUsersWithOptions`, data);
  }

  getNotifications(userID, count) {
    return this.http.get(`User/Inbox/${userID}/0/0/${count}`);
  }

  deleteNotification(payload) {
    return this.http.post(`User/Inbox/Delete`, payload);
  }

  everyOneMinuteNotification(data) {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    httpHeaders = httpHeaders.set('userID', data.userID);
    return this.http.get(`Notifications/UserHasNewNotification`, {
      headers: httpHeaders
    });
  }

}
