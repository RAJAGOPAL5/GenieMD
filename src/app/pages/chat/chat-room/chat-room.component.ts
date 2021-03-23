import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  messages = [];
  profile: any;
  conversationId: any;
  isLoading = false;
  text: any;
  recieverInfo: any;
  userID: string;
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.profile = this.profileService.profile;
    this.userID = this.profileService.id;
    console.log('clinic', this.clinicService);
    this.conversationId = this.route.snapshot.params.id;
    console.log('this.conversationId', this.conversationId);
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

  sendMessage(event) {
    this.messages.push({
      message: event.message,
      messageTime: new Date().getTime(),
      reply: true,
      screenName: this.profile.screenName
    });
    const messages = [];
    this.recieverInfo.users.map((item) => {
      const data = {
        encryptionKey: '',
        message: event.message,
        url: '',
        userID: item.userID
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

  getConversationsHistory() {
    this.isLoading = true;
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
}
