import { VitalsService } from 'src/app/shared/service/vitals.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ChatService } from 'src/app/shared/service/chat.service';
import { NbIconLibraries, NbToastrService, NbWindowService, NbWindowState } from '@nebular/theme';
import { ChatWindowComponent } from 'src/app/shared/components/chat-window/chat-window.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  isLoading = false;
  ColumnMode = ColumnMode;
  vitals: any;
  showTable = false;
  patientID: string;
  patientData: any;
  extraData: any;
  vitalsArray: any;
  payload: { userID: string; vitalIDs: any; username: string; };
  vitalsRes: any;
  vitalList: any;
  headerArray = [];
  vitalsOriginal = [];
  vitalString = '';
  conversations = [];
  exisitingChat: any;
  timmerLoad: NodeJS.Timeout;

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
    this.getChatList();
    this.everyMinuteNotification();
    this.vitalList = this.clinicService.getVitals();
    this.patientID = this.activatedRoute.snapshot.params.patientID;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.patientsService.findById(payload).subscribe((data: any) => {
      this.patientData = data;
      console.log('the patient data is ', this.patientData);
      try {
        this.extraData = JSON.parse(this.patientData.extraData);
      } catch {
        this.extraData = {};
      }
      this.vitalsArray = this.extraData.vitals;
      console.log('this.vitalss ssid', this.vitalsArray);
      this.getVitals();
    });
    this.vitals = [
      { id: 1, BP: '120/80', SPO2: '98', Weight: '80', Temp: '97', Glucose: '240' },
      { id: 2, BP: '130/70', SPO2: '100', Weight: '100', Temp: '98', Glucose: '110' },
      { id: 3, BP: '125/75', SPO2: '99', Weight: '75', Temp: '97', Glucose: '350' },
      { id: 4, BP: '110/70', SPO2: '95', Weight: '95', Temp: '100', Glucose: '200' },
      { id: 5, BP: '120/60', SPO2: '96', Weight: '110', Temp: '95', Glucose: '300' }
    ];
  }

  getVitals() {
    console.log('this.vitalList::', this.vitalList);
    this.vitalsService.getVital(this.patientData.userID).subscribe((res: any) => {
      console.log('this resss', res);
      this.vitalsRes = res.vitalsList;
      if (!!this.vitalsRes) {
        this.vitalsRes = this.vitalsRes.map(item => {
          const vitalName = this.vitalList.find((datas: any) => {
            if (datas.vitalType === item.vitalTypeID) {
              return datas;
            } else {
              return '';
            }
          });
          item.vitalName = vitalName?.name;
          try {
            item.vitalData = JSON.parse(item.vitalData);
          } catch {
            item.vitalData = {};
          }
          return item;
        });
      }
      this.arrangeVitalData();
      console.log('this.vitalRes', this.vitalsRes, this.vitalList);
    });
  }

  arrangeVitalData() {
    this.vitalsOriginal = [];
    this.vitalsRes = this.vitalsRes.map(item => {
      if (item?.vitalName === 'Blood Pressure') {
        this.headerArray.push(item.vitalName);
        const payload = {
          name: 'Blood Pressure',
          time: item.vitalDate,
          value: item.vitalData.S + '/' + item.vitalData.D
        };
        //  this.vitalString = + payload.toString();
        this.vitalsOriginal.push(payload);
        return item.vitalData.S + '/' + item.vitalData.D;
      } else if (item?.vitalName === 'Temperature') {
        this.headerArray.push(item.vitalName);
        const payload = {
          name: 'Temperature',
          time: item.vitalDate,
          value: item.vitalData.T
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.T;
      } else if (item?.vitalName === 'Weight') {
        this.headerArray.push(item.vitalName);
        const payload = {
          name: 'Weight',
          time: item.vitalDate,
          value: item.vitalData.W
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.W;
      } else if (item?.vitalName === 'Glucose') {
        this.headerArray.push(item.vitalName);
        const payload = {
          name: 'Glucose',
          time: item.vitalDate,
          value: item.vitalData.V
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.V;
      } else if (item?.vitalName === 'SPO2') {
        this.headerArray.push(item.vitalName);
        const payload = {
          name: 'SPO2',
          time: item.vitalDate,
          value: item.vitalData.O
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.O;
      }
    });
    console.log('this. in arrange vital data::', this.vitalsRes);
    console.log('the header araay is printed::', this.vitalsOriginal, this.headerArray);
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
  openWindow() {
    if (!!this.exisitingChat) {
      this.open(this.exisitingChat.conversationID);
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
  open(conversationID) {
    this.windowService.open(ChatWindowComponent, {
      title: `${this.patientData.firstName} ${this.patientData.lastName} `, initialState: NbWindowState.MAXIMIZED,
      hasBackdrop: false, windowClass: 'custom-chat-window',
      context: { conversationID }
    });
  }

  everyMinuteNotification() {
    this.timmerLoad = setInterval(() => {
      this.getVitals();
    }, 2000);
  }

}
