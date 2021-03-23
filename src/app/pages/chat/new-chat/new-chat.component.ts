import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ChatService } from 'src/app/shared/service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss']
})
export class NewChatComponent implements OnInit {
  pageNumber = 1;
  users = [];
  searchText = '';
  isLoading: boolean;
  constructor(
    private ref: NbDialogRef<NewChatComponent>,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private toastrService: NbToastrService,
    private clinicService: ClinicService,
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPatientsList();
  }

  search() {
    this.searchText = '';
  }

  getPatientsList() {
    this.isLoading = true;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      pageNumber: this.pageNumber,
    };
    this.patientService.find(payload)
      .subscribe((data: any) => {
        const clinicPatientList = data.clinicPatientList.map(item => {
          try {
            item.extraData = JSON.parse(item.extraData);
          } catch (error) {
            item.extraData = {};
          }
          item.name = `${item.firstName} ${item.lastName}`.trim();
          item.careManager = 'James';
          return item;
        });
        this.users = clinicPatientList;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error, 'Error');
      });
  }

  getProvidersList() {
    this.isLoading = true;
    this.clinicService.getProviderList(this.clinicService.id)
      .subscribe((data: any) => {
        // const clinicPatientList = data.clinicPatientList.map(item => {
        //   try {
        //     item.extraData = JSON.parse(item.extraData);
        //   } catch (error) {
        //     item.extraData = {};
        //   }
        //   // item.name = `${item.firstName} ${item.lastName}`.trim();
        //   item.careManager = 'James';
        //   return item;
        // });
        this.users = data.clinicProviderList;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error, 'Error');
      });
  }

  closeDialog() {
    this.ref.close();
  }
  createChat(user) {
    console.log('user', user);
    this.isLoading = true;
    const userID = user.patienID || user.providerID;
    const payload = {
      userID: this.profileService.id,
      users: [userID]
    };
    this.chatService.createConversation(payload).subscribe((data: any) => {
      this.isLoading = false;
      this.closeDialog();
      this.router.navigate([`${this.clinicService.id}/${this.profileService.id}/chat/${data.conversationID}`]);
    }, error => {
      this.isLoading = false;
      this.toastrService.danger('Could not initialize chat.', 'Error');
      throw error;
    });
  }
}
