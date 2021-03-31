import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { PushNotificationService } from 'src/app/shared/service/push-notification.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, OnChanges {
  messages = [];
  profile: any;
  @Input() chatInfo: any;
  @Input() image: any;
  conversationId: any;
  isLoading = false;
  text: any;
  recieverInfo: any;
  userID: string;
  chatPic: any;
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private clinicService: ClinicService, private pushNotification: PushNotificationService) {
    this.pushNotification.updatedMessage.subscribe(res => {
      if (!!res) {
        this.getConversationsHistory(1);
      }
    });
  }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.profile = this.profileService.profile;
    this.conversationId = this.chatInfo.conversationId;
    this.chatPic = this.chatInfo.imageUrl;
    this.userID = this.profileService.id;
    this.getChatsList(this.userID);
    this.getConversationsHistory();
  }

  getChatsList(userID) {
    this.chatService.getChatList(userID).subscribe((response: any) => {
      const chatList = response.conversationList;
      this.recieverInfo = chatList.find(x => {
      // tslint:disable-next-line:triple-equals
        return x.conversationID == this.conversationId;
      });
    });
  }

  send(event) {
    if (!!event.files && event.files.length > 0) {
      this.sendFiles(event);
    } else {
      this.sendMessage(event);
    }
  }
  sendFiles(event) {
    const files = !event.files ? [] : event.files.map((file) => {
      this.isLoading = true;
      this.chatService.uploadFile(file, this.profileService.id).subscribe((data: any) => {
        const uploadedImages = {
          photoUrl: data.url,
          photoThumbnailUrl: data.url,
          type: file.type.includes('image') ? 1 : 6,
          name: data.name ? data.name : ''
        };
        this.sendMessage(event, uploadedImages);
        const fileData = {
          url: data.url,
          type: file.type,
          icon: 'file-text-outline',
        };
        this.messages.push({
          message: '',
          messageTime: new Date(),
          reply: true,
          files: [fileData],
          type: files.length ? 'file' : 'text',
          screenName: this.profile.screenName
        });
        this.isLoading = false;

      }, error => {
        this.isLoading = false;
      });

    });
  }
  sendMessage(event, urls?) {
    if (!!event.message) {
      this.messages.push({
        message: event.message,
        messageTime: new Date(),
        reply: true,
        type: 'text',
        screenName: this.profile.screenName
      });
    }
    const messages = [];
    this.recieverInfo.users.map((item) => {
      const data = {
        encryptionKey: '',
        message: event.message,
        url: !!urls ? JSON.stringify(urls) : '',
        userID: item.userID,
        imageUrl : item.imageURL

      };
      messages.push(data);
    });
    const payload = {
      userID: this.profileService.id,
      appID: this.clinicService.clinic.oemID ? this.clinicService.clinic.oemID : 200,
      conversationID: this.conversationId,
      displayDuration: 2000,
      messages
    };
    this.chatService.sendMessage(payload).subscribe(response => {
      // this.getConversationsHistory();
    }, error => {
      console.log('error', error);
    });

  }

  getConversationsHistory(notified?) {
    this.isLoading = !!notified ? false : true;
    const payload = {
      userID: this.profileService.id,
      conversationID: this.conversationId,
      emptyValue: 0,
      count: 60
    };
    this.chatService.getConversations(payload).subscribe((data: any) => {
      const messages = data.textMessageList;
      const receiver = messages.find(k => {
        // tslint:disable-next-line:triple-equals
        return k.email !== this.profile.email;
      });
      this.getReceiverInfo(receiver);
      messages.map(item => {
        // tslint:disable-next-line:triple-equals
        if (item.email == this.profile.email) {
          item.reply = true;
        } else {
          item.reply = false;
        }
        if (!!item.url) {
          let url;
          try {
            url = JSON.parse(item.url);
          } catch (error) {
            url = '';
          }
          const fileData = {
            url: url?.photoUrl,
            type: this.getType(url?.type || 0),
            icon: 'file-text-outline',
          };
          item.files = [fileData];
        } else {
          item.files = [];
        }
        item.type = 'file';
        item.imageUrl = this.chatPic;
        return item;
      });
      this.messages = messages.reverse();
      this.isLoading = false;

    }, error => {
      this.isLoading = false;
      throw error;
    });
  }
  getReceiverInfo(data) {
    console.log('data', data);
  }
  getType(type) {
    let extension;
    switch (type) {
      case 1: extension = 'image/jpeg'; break;
      case 6: extension = 'file'; break;
      default: extension = 'file';
    }
    return extension;

  }
}
