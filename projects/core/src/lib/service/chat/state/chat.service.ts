import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ChatStore } from './chat.store';

@Injectable({ providedIn: 'root' })
export class ChatService {

  constructor(private chatStore: ChatStore, private http: HttpClient) {
  }

  async getChatList(userID: any) {
    try {
      this.chatStore.setLoading(true);
      await this.http.get(`TextMessaging/Conversations/${userID}`)
        .pipe(
          tap((getChat: any) => {
            console.log('chat list::', getChat);
            this.chatStore.update({
              chatList: getChat,
            });
          })
        ).toPromise();
    } catch (error) {
      this.chatStore.setError(error);
    } finally {
      this.chatStore.setLoading(false);
    }

  }

  async getConversations(payload: any) {
    try {
      this.chatStore.setLoading(true);
      // tslint:disable-next-line:max-line-length
      await this.http.get(`TextMessaging/GetMessages/${payload.userID}/${payload.conversationID}/${payload.emptyValue}/${payload.emptyValue}/${payload.count}`)
        .pipe(
          tap((getConv: any) => {
            console.log('get conv::', getConv);
            this.chatStore.update({
              convList: getConv,
            });
          })
        ).toPromise();
    } catch (error) {
      this.chatStore.setError(error);
    } finally {
      this.chatStore.setLoading(false);
    }

  }

  async sendMessage(payload: any) {
    try {
      this.chatStore.setLoading(true);
      await this.http.get(`TextMessaging/SendMessage/`, payload)
        .pipe(
          tap((messageSend: any) => {
            console.log('send message::', messageSend);
            this.chatStore.update({
              messageList: messageSend,
            });
          })
        ).toPromise();
    } catch (error) {
      this.chatStore.setError(error);
    } finally {
      this.chatStore.setLoading(false);
    }

  }

  async createConversation(payload: any) {
    try {
      this.chatStore.setLoading(true);
      await this.http.get(`TextMessaging/CreateConversation`, payload)
        .pipe(
          tap((createConv: any) => {
            console.log('Conv list::', createConv);
            this.chatStore.update({
              createMessage: createConv,
            });
          })
        ).toPromise();
    } catch (error) {
      this.chatStore.setError(error);
    } finally {
      this.chatStore.setLoading(false);
    }
  }

  async deleteMessage(payload: any) {
    try {
      this.chatStore.setLoading(true);
      await this.http.post(`TextMessaging/deleteConversation/`, payload).toPromise();
    } catch (error) {
      this.chatStore.setError(error);
    } finally {
      this.chatStore.setLoading(false);
    }
  }

  async uploadFile(file: File, userID: string) {
    const url = 'Files/UploadFile/' + userID + '?contentType=' + file.type;
    const formdata: FormData = new FormData();
    try {
      this.chatStore.setLoading(true);
      await this.http.post(url, formdata)
        .pipe(
          tap((uploadFileData: any) => {
            console.log('urlInfo:', uploadFileData);
            this.chatStore.update({
              urlInfo: uploadFileData,
            });
          })
        ).toPromise();
    } catch (error) {
      this.chatStore.setError(error);
    } finally {
      this.chatStore.setLoading(false);
    }
  }

}
