import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ChatService } from 'src/app/shared/service/chat.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.scss']
})
export class NewChatComponent implements OnInit {
  @ViewChild('SearchInput', { static: true }) patientSearchInput: ElementRef;
  pageNumber = 1;
  users = [];
  searchText: any;
  isLoading = false;
  serviceHandle: boolean;
  showList = true;
  usersProvider = [];
  patientData: any;
  isSearching: boolean;
  payloadPatient: any;
  initialList: any;

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
    fromEvent(this.patientSearchInput.nativeElement, 'keydown').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.payloadPatient.pageNumber = 1;
      if (this.showList) {
        this.getPatientsList('search');
      }
      if (!this.showList) {
        try {
          this.initialList = JSON.parse(this.initialList);
        } catch (error) {
          this.initialList = [];
        }
        this.usersProvider = this.initialList.filter(obj => obj.name.includes(this.searchText));
        console.log(this.usersProvider);
        // tslint:disable-next-line:triple-equals
        if (this.searchText == '') {
          this.getProvidersList();
        }
      }
    });
  }

  getPatientsList(search?: string) {
    this.showList = true;
    this.isLoading = true;
    this.searchText = this.searchText ? this.searchText : '';
    this.payloadPatient = {
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      userID: this.profileService.id,
      count: 25,
      pageNumber: 1,
    };
    if (this.serviceHandle) {
      return;
    }
    this.serviceHandle = true;
    // tslint:disable-next-line:no-unused-expression
    this.patientData = this.patientService.find(this.payloadPatient).subscribe((data: any) => {
      this.serviceHandle = false;
      const clinicPatientList = data.clinicPatientList.map(item => {
        try {
          item.extraData = JSON.parse(item.extraData);
        } catch (error) {
          item.extraData = {};
        }
        item.name = `${item.firstName} ${item.lastName}`.trim();
        return item;
      });
      // tslint:disable-next-line:no-unused-expression
      data.clinicPatientList.length !== 0 ? this.users.push(...data.clinicPatientList) : '';
      this.users = data.clinicPatientList;
      this.payloadPatient.pageNumber++;
      this.isLoading = false;
      return;
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error, 'Error');
    });

  }

  getProvidersList() {
    this.showList = false;
    this.isLoading = true;
    this.clinicService.getProviderList(this.clinicService.id)
      .subscribe((data: any) => {
        this.usersProvider = data.clinicProviderList;
        this.initialList = JSON.stringify(data.clinicProviderList);
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
