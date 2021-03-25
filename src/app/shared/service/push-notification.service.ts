import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  currentMessage = new BehaviorSubject(null);
  updatedMessage = this.currentMessage.asObservable();

  constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {
    this.angularFireMessaging.messages.subscribe(
      (messaging: AngularFireMessaging) => {
        messaging.onMessage = messaging.onMessage.bind(messaging);
        messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
      }
    );
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        localStorage.setItem('token', token);

      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      });
  }
  registerBrowser(token, oemID, userId) {
    const payload = {
      userID: userId,
      token,
      oemID,
      regInfo: {
        endpoint: 'https://fcm.googleapis.com/fcm/send/' + token,
        expirationTime: moment().add(2, 'months').valueOf()
      }
    };
    this.http.post(`Notifications/RegisterBrowser`, payload).subscribe((res: any) => {
      console.log('token', res);
    }, error => {
      console.log('error', error);

    });
  }
}
