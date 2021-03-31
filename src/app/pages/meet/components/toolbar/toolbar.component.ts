import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbIconLibraries, NbToastrService, NbWindowService, NbWindowState } from '@nebular/theme';
import * as screenfull from 'screenfull';
import { ChatWindowComponent } from 'src/app/shared/components/chat-window/chat-window.component';
import { ChatService } from 'src/app/shared/service/chat.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { VitalsService } from 'src/app/shared/service/vitals.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  volume = true;
  exisitingChat: any;
  isLoading = false;
  patientID: any;
  patientData: any;
  extraData: any;
  fullscreen = false;
  conversations = [];

  @Output() vitalData: EventEmitter<any> = new EventEmitter();

  constructor(
    private iconLibraries: NbIconLibraries,
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private clinicService: ClinicService,
    private patientsService: PatientsService,
    private vitalsService: VitalsService,
    private chatService: ChatService,
    private toastrService: NbToastrService,
    private windowService: NbWindowService,
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    this.patientID = this.activatedRoute.snapshot.params.patientID;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.patientsService.findById(payload).subscribe((data: any) => {
      this.patientData = data;
      try {
        this.extraData = JSON.parse(this.patientData.extraData);
      } catch {
        this.extraData = {};
      }
    });
    this.getChatList();
  }

  openWindow() {
    if (!!this.exisitingChat) {
      this.open(this.exisitingChat.conversationID, this.exisitingChat.users[0].imageURL );
    } else {
      this.createChat();
    }
  }
  createChat() {
    this.isLoading = true;
    const payload = {
      userID: this.profileService.id,
      users: [this.patientID]
    };
    this.chatService.createConversation(payload).subscribe((data: any) => {
      this.isLoading = false;
      this.open(data.conversationID);
    }, error => {
      this.isLoading = false;
      this.toastrService.danger('Could not initialize chat.', 'Error');
      throw error;
    });
  }

  getChatList() {
    this.isLoading = true;
    this.chatService.getChatList(this.profileService.id).subscribe((data: any) => {
      this.conversations = data.conversationList;
      this.getChatInfo();
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }

  getChatInfo() {
    this.isLoading = true;
    if (!!this.patientID && this.conversations.length) {
      this.exisitingChat = this.conversations.find(item => {
        const existingUser = item.users.find(k => {
          // tslint:disable-next-line:triple-equals
          if (k.email == this.patientID) {
            return k;
          }
        });
        return existingUser;
      });
      this.isLoading = false;
    }
  }

  open(conversationID, imageUrl?: any) {
    this.windowService.open(ChatWindowComponent, {
      title: `${this.patientData.firstName} ${this.patientData.lastName} `, initialState: NbWindowState.MAXIMIZED,
      hasBackdrop: false, windowClass: 'custom-chat-window',
      context: { conversationID, imageUrl }
    });
  }

  vitalsTable() {
    this.vitalData.emit('vitals');
  }
}
