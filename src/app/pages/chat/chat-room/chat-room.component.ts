import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/shared/service/chat.service';
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
  constructor(private profileService: ProfileService, private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit(): void {
    this.profile = this.profileService.profile;
    this.conversationId = this.route.snapshot.params.id;
    console.log('this.conversationId', this.conversationId);
    this.getConversationsHistory();
  }
  sendMessage(event) {
    this.messages.push({
      message: event.message,
      messageTime: new Date().getTime(),
      reply: true,
      screenName:  this.profile.screenName
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
       return  k.email !== this.profile.email;
      });
      this.getReceiverInfo(receiver)
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
