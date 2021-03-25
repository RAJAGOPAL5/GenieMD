import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }
  getChatList(userID) {
    return this.http.get(`TextMessaging/Conversations/${userID}`);
  }
  getConversations(payload) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`TextMessaging/GetMessages/${payload.userID}/${payload.conversationID}/${payload.emptyValue}/${payload.emptyValue}/${payload.count}`);
  }
  sendMessage(payload) {
    return this.http.post(`TextMessaging/SendMessage/`, payload);
  }
  deleteMessage(payload) {
    return this.http.post(`TextMessaging/deleteConversation/`, payload);
  }
  createConversation(payload) {
    return this.http.post(`TextMessaging/CreateConversation`, payload);
  }
  uploadFile(file: File, userID: string) {
    const url = 'Files/UploadFile/' + userID + '?contentType=' + file.type;
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    return this.http.post(url, formdata);
  }
}

