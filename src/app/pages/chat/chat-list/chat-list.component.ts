import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import * as moment from 'moment';
import { NewChatComponent } from '../new-chat/new-chat.component';
import { PushNotificationService } from 'src/app/shared/service/push-notification.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  conversations = [];
  isLoading = false;
  profile: any;
  order = 'lastMessageTime';
  showChat = false;
  chatInfo: any;
  chatPic: any;
  // chatInformation$: Subscription;
  // chatList$ = this.query.selectAll({asObject: true});
  // chatInfo: { conversationId: any; type: number; name: any; };
  constructor(
    private router: Router, private clinicService: ClinicService,
    private dialogService: NbDialogService,
    private profileService: ProfileService, private chatService: ChatService,
    private toastrService: NbToastrService, private pushNotification: PushNotificationService) {
    this.pushNotification.updatedMessage.subscribe(res => {
      if (!!res) {
        this.getList(1);
      }
    });
  }

  ngOnInit(): void {
    this.getList();
    this.profile = this.profileService.profile;
  }
  getChat(data) {
    this.chatInfo = {
      conversationId: data.conversationID,
      imageUrl: data.users[0].imageURL,
      type: 1,
      name: data.name
    };
    this.showChat = true;
    // this.router.navigate([`${this.clinicService.id}/${this.profileService.id}/chat/${data.conversationID}`]);
  }
  getList(notify?) {
    this.isLoading = !!notify ? false : true;
    this.chatService.getChatList(this.profileService.id).subscribe((data: any) => {
      this.conversations = data.conversationList.sort((a, b) => {
        return new Date(b.lastMessageTime).valueOf() - new Date(a.lastMessageTime).valueOf();
      }
      );
      this.conversations.map((item: any) => {
        item.users = item.users.filter(x => {
          return x.email !== this.profile.email;
        });
        item.imageUrl = item.users.length ? `${item.users[0].imageURL}` : '';
        item.lastMessageTime = moment(item.lastMessageTime).fromNow();
        item.name = item.users.length ? `${item.users[0].firstName} ${item.users[0].lastName}` : 'GMD User';
        return item;
      });
      this.isLoading = false;

    }, error => {
      this.isLoading = false;
      throw error;
    });
  }

  openChatBox() {
    const modal = this.dialogService.open(NewChatComponent);
    modal.componentRef.instance.conversationList = this.conversations;
    console.log('conv list',  this.conversations);
    modal.onClose.subscribe(data => {
      if (!!data) {
        this.showChat = true;
        this.chatInfo = data;
      }
    });

  }

}
