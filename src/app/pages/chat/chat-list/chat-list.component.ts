import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import * as moment from 'moment';
import { NewChatComponent } from '../new-chat/new-chat.component';


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
  constructor(
    private router: Router, private clinicService: ClinicService,
    private dialogService: NbDialogService,
    private profileService: ProfileService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.getList();
    this.profile = this.profileService.profile;
  }
  getChat(data) {
    this.router.navigate([`${this.clinicService.id}/${this.profileService.id}/chat/${data.conversationID}`]);
  }
  getList() {
    this.isLoading = true;
    this.chatService.getChatList(this.profileService.id).subscribe((data: any) => {
      this.conversations = data.conversationList;
      this.conversations.map((item: any) => {
        item.users = item.users.filter(x => {
          return x.email !== this.profile.email;
        });
        item.lastMessageTime = moment(item. lastMessageTime).fromNow();
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
    this.dialogService.open(NewChatComponent);
  }

}
