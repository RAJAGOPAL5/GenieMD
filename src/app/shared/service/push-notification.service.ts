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
      // tslint:disable-next-line:variable-name
      (_messaging: AngularFireMessaging) => {
        this.currentMessage.next(_messaging);
        // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
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
