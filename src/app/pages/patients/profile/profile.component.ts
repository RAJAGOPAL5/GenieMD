import { Component, OnInit } from '@angular/core';
import { Event, ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NbIconLibraries, NbToastrService, NbTagComponent, NbWindowService, NbWindowState, NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { languages, states, morbidity, gender, diseaseState, relation } from 'src/app/shared/constant/constant';
import { countUpTimerConfigModel, CountupTimerService, timerTexts } from 'ngx-timer';
import { ChatWindowComponent } from 'src/app/shared/components/chat-window/chat-window.component';
import { ChatService } from 'src/app/shared/service/chat.service';
import { MeetService } from 'src/app/shared/service/meet.service';
import { PlatformLocation } from '@angular/common';
import { SendAssessmentComponent } from 'src/app/shared/components/send-assessment/send-assessment.component';
import { TimerService } from 'src/app/shared/service/timer.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/service/notification.service';


interface ViewModal {
  profile?: any;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  model: ViewModal = {};
  tabs: any[];
  patientID: any;
  patient: any;
  patientName: any;
  morbidityValue: any = [];
  morbiditys: any[] = [];
  isLoading = false;
  monitored: true;
  patientExtraData: any;
  profileData: any;
  languages: any[] = [];
  language: string;
  diseaseState: any[];
  diseaseList: any[];
  diseaseStateList: any;
  relation: any[] = [];
  relationName = '';
  showEmergency = false;
  showPatient = false;
  intervalId = 0;
  buttonName = 'start';
  total: number;
  seconds = 0;
  message: any;
  minutes: any;
  totalsec = 0;
  startStop = false;
  timerStatus = false;
  showStart = false;
  showStop = true;
  encounter: any;
  retryCount = 1;
  conversations = [];
  exisitingChat: any;
  meeting: any;
  meetingRes: any;
  uniqueID: any;
  videoLink: string;
  location: any;
  clinicConfig: any;
  emailAddress: any[];
  extraData: any;
  degrees: any;
  type = 'video';
  showTimer = false;
  listEnabled = false;
  timer$: Observable<string>;
  messageDialog: any;
  betaUniqueID: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientsService,
    private iconLibraries: NbIconLibraries,
    private profileService: ProfileService,
    private toastrService: NbToastrService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private router: Router,
    private countupTimerService: CountupTimerService,
    private windowService: NbWindowService,
    private chatService: ChatService,
    private meetService: MeetService,
    private platformLocation: PlatformLocation,
    private dialogService: NbDialogService,
    private timerService: TimerService,
    private notificationService: NotificationService
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);

    // this.router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationStart) {
    //     const trigeredPatient = event.url.split('/')[4];
    //     if (!this.timerStatus && this.patientID !== trigeredPatient) {
    //       confirm('Are you sure you want to proceed?');
    //     } else {

    //     }
    //   }
    // });
  }

  ngOnInit(): void {
    this.getChatList();
    this.location = (this.platformLocation as any).location;
    this.activatedRoute.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
      this.prepareTabs();
      this.getData();
      this.getChatInfo();
    });
    try {
      this.clinicConfig = JSON.parse(this.clinicService.clinic.clinicConfig);
    } catch (error) {
      this.toastrService.danger('Failed to parse clinic config');
    }
    try {
      this.extraData = JSON.parse(this.profileService.profile.extraData);
    } catch (error) {
      this.toastrService.danger('Failed to parse extradata');
    }
    this.degrees = this.extraData.extendedProfileInfo ? this.extraData.extendedProfileInfo.degrees : '';
    this.languages = languages;
    this.relation = relation;
    // tslint:disable-next-line: max-line-length
    this.showEmergency = this.clinicService.config.extendedSettings && this.clinicService.config.extendedSettings.emergencyContact && this.clinicService.config.extendedSettings.emergencyContact === 'true' ? true : false;
    const rpmTimer = this.clinicService.config.extendedSettings?.rpmTimer * 10 || 10000;
    setTimeout(() => {
      this.showTimer = true;
      this.startTimer();
    }, rpmTimer);
    this.createBetaMeeting();
  }

  getData() {
    this.morbiditys = morbidity;
    this.diseaseState = diseaseState;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.showPatient = false;
    this.patientService.findById(payload).subscribe((data: any) => {
      this.morbidityValue = [];
      this.patient = data;
      if (this.patient) {
        try {
          this.patientExtraData = JSON.parse(this.patient.extraData);
        } catch {
          this.patientExtraData = {};
        }
        this.patientName = `${this.patient.firstName} ${this.patient.lastName}`;
        this.patient.morbidity === 0 ? this.morbidityValue.push('Lung Disease') : this.morbidityValue.push('Heart Disease');
        this.profileService.getPatientProfile(this.patient.userID).subscribe((res: any) => {
          this.profileData = res;
          this.language = this.languages.find(item => item.id === this.profileData.languageId);
        });
        try {
          this.diseaseStateList = JSON.parse(this.patientExtraData.diseaseState);
        } catch {
          this.diseaseStateList = [];
        }
        let a;
        this.diseaseList = this.diseaseStateList.map(item => {
          a = this.diseaseState.find(kItem => kItem.id === item);
          if (a) {
            if (a.name === 'Other') {
              return this.patientExtraData.otherDisease;
            } else {
              return a.name;
            }
          }
        });
        if (this.patientExtraData.emergencyContact && this.patientExtraData.emergencyContact.relation) {
          this.relationName = this.relation.find(item => item.id === this.patientExtraData.emergencyContact.relation).value;
        }
      } else {
        this.showPatient = true;
      }
    }, error => {
    });
  }

  prepareTabs() {
    this.tabs = [
      {
        title: 'Vitals',
        route: `vitals`,
      },
      {
        title: 'Alerts',
        route: `alerts`,
      },
      {
        title: 'Schedules',
        route: `schedule`,
      },
      {
        title: 'Care Team',
        route: `care-team/`,
      },
      {
        title: 'History',
        route: `history/`,
      },

    ];
  }

  setCheckedStatus(event) {
    this.isLoading = true;
    let monitored = 0;
    if (event.target.checked) {
      monitored = 1;
    }
    const registerPayload = {
      email: this.patient.email,
      dob: this.patient.dob,
      birthdate: moment(this.patient.dob).valueOf(),
      cellNumber: this.patient.phoneNumber,
      languageId: this.profileData.languageId,
      state: this.patient.state,
      address: this.patient.address,
      city: this.patient.city,
      country: this.patient.country,
      zipCode: this.patient.zipcode,
      extraData: this.patient.extraData ? JSON.parse(this.patient.extraData) : {},
      firstName: this.patient.firstName,
      gender: `${this.patient.gender}`,
      imageURL: this.patient.imageURL,
      lastName: `${this.patient.lastName}`,
      latitude: '0',
      locationTime: this.patient.locationTime,
      longitude: '0',
      oemID: this.profileData.oemID,
      passport: '',
      pregnant: '0',
      profileEmail: this.profileData.email,
      providerStatus: 'P',
      screenName: this.patient.firstName + ' ' + this.patient.lastName,
      updateDirectEmail: true,
      userID: this.patient.userID,
      morbidity: this.patient.morbidity,
      monitored,
    };
    this.profileService.update(registerPayload).subscribe((res: any) => {
      this.isLoading = false;
      this.toastrService.success('Patient updated Successfully', 'Success');
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage, 'Error');
    });
  }
  trimContact(data) {
    return data && data.trim() !== '' ? data : ' ';
  }

  openWindow() {
    if (!!this.exisitingChat) {
      this.open(this.exisitingChat.conversationID, this.exisitingChat.users[0].imageURL);
    } else {
      this.createChat();
    }
  }
  getChatList() {
    this.isLoading = true;
    this.chatService.getChatList(this.profileService.id).subscribe((data: any) => {
      this.conversations = data.conversationList;
      this.listEnabled = true;
      this.getChatInfo();
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }
  getChatInfo() {
    if (!!this.patientID && this.conversations.length && this.listEnabled) {
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
  open(conversationID, imageUrl?: any) {
    this.windowService.open(ChatWindowComponent, {
      title: `${this.patientName}`, initialState: NbWindowState.MAXIMIZED,
      hasBackdrop: false, windowClass: 'custom-chat-window',
      context: { conversationID, imageUrl }
    });
  }

  videoCall() {
    this.emailAddress = [];
    const str = this.patient.email;
    const splitted = str.split(',');
    const splitting = splitted.map(res => {
      const trimValue = res.trim('');
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimValue)) {
        this.emailAddress.push(trimValue);
      }
    });
    this.encounter = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: '',
      providerID: this.profileService.profile.userName,
      interview: '',
      diagnosis: '',
      treatment: '',
      assessmentName: 'On Demand Provider Call',
      assessmentID: '0',
      pharmacyID: '',
      assessment: 'On Demand Provider Call',
      status: 4,
      endPoint: 9,
      protocolID: -1,
      location: '',
      created: parseInt(moment().format('x'), 0),
      type: 1,
      symptoms: '',
      submitterID: '',
      extraData: JSON.stringify({
        oemID: this.clinicService.clinic.oemID,
        ClinicName: this.clinicConfig.name,
        ClinicLogo: this.clinicConfig.logo,
        firstName: this.patient.firstName,
        lastName: ''
      }),
      providerInitiated: false
    };
    this.isLoading = true;
    this.meetService.add(this.encounter).subscribe((res: any) => {
      this.encounter.encounterID = res.encounterID;
      this.createMeeting();
    }, error => {
      this.toastrService.danger(error.errorMessage ? error.errorMessage : 'Failed to create encounter');
      this.isLoading = false;
    });

  }

  createMeeting() {
    this.meeting = {
      startTime: parseInt(moment().format('x'), 0),
      userID: this.profileService.id,
      users: [''],
      subject: 'On Demand Call', duration: 1000,
      price: '0.00',
      npi: 0, slot: 0, url: '', clinicID: this.clinicService.id,
      onDemand: true,
      type: 1,
      paymentToken: ''
    };
    this.isLoading = true;
    this.meetService.createMeeting(this.meeting).subscribe((data: any) => {
      this.meetingRes = data;
      this.encounter.processed = parseInt(moment().format('x'), 0);
      this.encounter.attendingProviderID = this.profileService.profile.email;
      this.encounter.meetingID = this.meetingRes.meetingId;
      this.encounter.fee = 0;
      this.meetService.encountersUpdate(this.encounter).subscribe((result: any) => {
        this.generateUniqueID();
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error.error ? error.error.errorMessage : 'Failed to update encounter');
      });
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error ? error.error.errorMessage : 'Failed to create meeting');
    });
  }

  generateUniqueID() {
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      meetingID: this.meetingRes.meetingId
    };
    this.isLoading = true;
    this.meetService.generateUniqueID(payload).subscribe((meeting: any) => {
      this.uniqueID = meeting.meetingUniqueID;
      // tslint:disable-next-line:max-line-length
      this.videoLink = `${this.location.origin}/meet/#/call/${meeting.meetingUniqueID}/${this.type}?userName=&userID=${this.profileService.patientProfile.userID}&clinicID=${this.clinicService.id}&encounterID=${this.encounter.encounterID}&patientID=${this.patientID}&rpm=true`;
      if (this.uniqueID) {
        this.startMeeting();
      } else {
        this.isLoading = false;
        this.toastrService.danger('Failed to generate uniqueID');
      }

    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error ? error.error.errorMessage : 'Failed to generate uniqueID');
    });
  }

  startMeeting() {
    {
      const payload = {
        userID: this.profileService.id,
        meetingID: this.meetingRes.meetingId,
        clinicID: this.clinicService.id
      };
      this.isLoading = true;
      this.meetService.startMeeting(payload).subscribe((resp: any) => {
        if (resp.token === '' || resp.apiKey === '' || resp.sessionID === '') {
          this.toastrService.danger('Failed to create token');
        } else {
          this.send();
        }
        this.isLoading = true;
      }, error => {
        this.isLoading = false;
        if (error.error && typeof error.error.text === 'string') {
          if (error.error.text.includes('handshake_failure') && this.retryCount <= 20) {
            this.toastrService.success('Reconnecting...');
            this.videoCall();
            this.retryCount = this.retryCount + 1;
          } else {
            this.toastrService.danger(error.error ? error.error.text : 'Failed to start Meeting');
          }
        } else {
          this.toastrService.danger(error.error ? error.error.errorMessage : 'Failed to start Meeting');
        }
      });
    }
  }

  send() {
    if (this.emailAddress.length > 0) {
      this.mailMeInvitation(this.emailAddress);
    }
    // tslint:disable-next-line:max-line-length
    window.open(`${this.location.origin}/meet/#/call/${this.uniqueID}/${this.type}?userName=${this.profileService.profile.firstName} ${this.profileService.profile.lastName} ${this.degrees}&userID=${this.profileService.patientProfile.userID}&clinicID=${this.clinicService.id}&encounterID=${this.encounter.encounterID}&patientID=${this.patientID}&userType=provider&rpm=true`);
  }

  mailMeInvitation(items) {
    let bgColor = '#6699ff';
    // tslint:disable-next-line:max-line-length
    if (this.clinicConfig && this.clinicConfig && this.clinicConfig.advancedSettings && this.clinicConfig.advancedSettings.length > 0) {
      const bannerColor = this.clinicConfig.advancedSettings.find(item => {
        // tslint:disable-next-line:triple-equals
        if (item.key == 'bannerColor') {
          return item;
        }
      });
      if (bannerColor && bannerColor.value) {
        bgColor = `rgb(${bannerColor.value})`;
      }
    }
    const payload = {
      userID: this.profileService.id,
      emailList: this.emailAddress,
      body: `<body>
      <div style=\'height: 100px;background-color: ${bgColor};width: 100%;text-align: center;\'>
     <img  src='${this.clinicConfig.logo}' style=\'height:70px; width: 288px; padding-top:15px'\ />
</div><h2 style=\'font-family:helvetica;font-size: 20px; padding-top: 20px\'>Your ${this.clinicConfig.name} Health care provider,
          ${this.profileService.profile.screenName} has sent you a meeting invite. Please click the button below to join the meeting.</h2>
          <p style=\'font-family:helvetica; margin-top: 80px;
          margin-bottom: 30px;     text-align: center;\'><a style=\'    display: block;
          width: 115px;
          height: 25px;
          background: ${bgColor};
          padding: 10px;
          text-align: center;
          border-radius: 5px;
          color: white;
          font-weight: bold;
          text-decoration: none;'\
          href='${this.videoLink}'>Join Meeting</a></p>
         <p style=\'font-family:helvetica\'>Thank you!</p><p style=\'font-family:helvetica\'>${this.clinicConfig.name}</p></body>`,
      fromDisplayName: `NoReply@${this.clinicConfig.name}`,
      subject: `Meeting Invitation`
    };

    this.isLoading = true;
    this.meetService.sendEmail(payload).subscribe(data => {
      this.toastrService.success('Email Sent Successfully');
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Something went wrong. Not able to send email');
    });
  }

  callBridge() {
    this.callUser();
  }

  callUser() {
    const payload = {
      clinicID: this.clinicService.id,
      userID: this.profileService.id,
      username: this.patient.firstName,
    };
    this.meetService.callUser(payload).subscribe((res: any) => {
      if (res && res.status === 'Ok') {
        this.toastrService.success(this.translate.instant('kCallingYourNo'));
        // this.addAudit();
      }
    }, error => {
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : this.translate.instant('kFailedToStartCall'));
    });
  }
  surveydialog() {
    this.dialogService.open(SendAssessmentComponent, { closeOnBackdropClick: false });
  }

  startTimer() {
    this.timer$ = this.timerService.start();
  }
  resumeTimer() {
    this.timerService.resume();
    this.showStart = false;
    this.showStop = true;
  }
  pauseTimer() {
    this.timerService.pause();
    this.showStart = true;
    this.showStop = false;
  }

  messagePatient(messagedialog) {
    this.messageDialog = this.dialogService.open(messagedialog, { closeOnBackdropClick: false });
  }

  cancelMessage() {
    this.messageDialog.close();
  }

  sendMessage() {
    this.isLoading = true;
    const data = {
      providername: `${this.profileService.profile.screenName}`,
      userID: this.profileService.id,
      providerID: this.profileService.profile.userName,
      message: this.message,
      encounterID: '',
      patientName: this.profileService.patientProfile.firstName + ' ' + this.profileService.patientProfile.lastName,
      patientImage: this.profileService.patientProfile.imageURL ? this.profileService.patientProfile.imageURL : '',
      // tslint:disable-next-line: max-line-length
      patientUserName: this.profileService.patientProfile.userName ? this.profileService.patientProfile.userName : this.profileService.patientProfile.patientID,
    };
    this.profileService.addToken({ data: JSON.stringify(data) }).subscribe((response: any) => {
      const url = `${this.location.origin}/generic/#/${this.clinicService.id}/message?token=${response.token}`;
      const cmd = {
        allowResponse: 1,
        callerID: this.profileService.profile.userName,
        cmd: 16
      };
      const notifyPayload = {
        userID: this.profileService.id,
        clinicID: this.clinicService.id,
        users: [this.patientID],
        payload: {
          email: {
            subject: `${this.profileService.profile.screenName}, ${this.degrees}`,
            // tslint:disable-next-line: max-line-length
            body: `${this.message}<Br /><Br />Please do not reply to this Email. To respond back click the link below. <Br/> <a  href='${url}'>${url}</a>`
          },
          smsMessages: [
            `${this.profileService.profile.screenName}, ${this.degrees} \n\n${this.message}`,
            `To respond back click the link below.\n${url}`],
          pushNotification: {
            title: `${this.profileService.profile.screenName}, ${this.degrees}`,
            message: this.message,
            command: JSON.stringify(cmd),
            messageType: 25,
            url: this.profileService.profile.imageURL,
            record: true
          }
        }
      };
      this.notificationService.notifyOptions(notifyPayload).subscribe(res => {
        this.isLoading = false;
        this.toastrService.success('Message sent successfully', 'Success');
        this.messageDialog.close();
      });
    }, error => {
      this.isLoading = false;
      this.toastrService.danger('Failed to add data', 'Error');
    });
  }


  createBetaMeeting() {
    this.meeting = {
      startTime: parseInt(moment().format('x'), 0),
      userID: this.profileService.id,
      users: [''],
      subject: 'On Demand Call', duration: 1000,
      price: '0.00',
      npi: 0, slot: 0, url: '', clinicID: this.clinicService.id,
      onDemand: true,
      type: 1,
      paymentToken: ''
    };
    this.isLoading = true;
    this.meetService.createMeeting(this.meeting).subscribe((data: any) => {
      this.meetingRes = data;
      this.generateBetaUniqueID();
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error ? error.error.errorMessage : 'Failed to create meeting');
    });
  }

  generateBetaUniqueID() {
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      meetingID: this.meetingRes.meetingId
    };
    this.meetService.generateUniqueID(payload).subscribe((meeting: any) => {
      this.betaUniqueID = meeting.meetingUniqueID;
    }, error => {
      this.toastrService.danger(error.error ? error.error.errorMessage : 'Failed to generate uniqueID');
    });
  }

  videoBeta() {
    this.router.navigate([this.clinicService.id, this.profileService.id, 'meet', this.patientID, this.betaUniqueID]);
  }
}
