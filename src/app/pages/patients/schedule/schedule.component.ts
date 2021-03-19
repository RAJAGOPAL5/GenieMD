import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { DataService } from 'src/app/shared/service/data.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ScheduleService } from 'src/app/shared/service/schedule.service';

const timeZone = require('moment-timezone');
const momentjs = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(momentjs);

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  clinicID: any;
  userID: any;
  isLoading = false;
  npiId: any;
  mode: any;
  protocolName: any;
  payload: any;
  protocolArrays: any;
  assessmentData: any;
  cliniConfig: any;
  protocolList: any;
  showConditions = false;
  searchText = '';
  showAssessment = false;
  protocolID: any;
  protocolObj: any;
  patientID: any;
  patient: any;
  showList = false;
  appointmentlistResult: any;
  totalAppointment = [];
  pageNumber = 1;
  clinicTimeFormat: any;
  patientName: any;
  pageSize = 25;
  showAppointments = true;
  clinic: any;
  rescheduleDialogRef: any;
  deleteDialogRef: any;
  deleteObj: any;

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private dataService: DataService,
    private router: Router,
    private scheduleService: ScheduleService,
    private datePipe: DatePipe,
    private dialogService: NbDialogService,
    private translate: TranslateService,
    private ls: LanguageService,

  ) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
    this.dataService.data.subscribe(data => {
      this.assessmentData = data;
    });
  }

  ngOnInit(): void {
    this.clinicID = this.clinicService.id;
    this.clinic = this.clinicService.clinic;
    this.cliniConfig = this.clinicService.config;
    this.userID = this.profileService.id;
    this.npiId = '0';
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
    });
    this.getPatientData();
    this.getProtocolList();
    this.getAppointments(this.userID);
  }

  getProtocolList() {
    this.isLoading = true;
    this.payload = {
      userId: this.profileService.id,
      npiId: this.npiId,
      clinicId: this.clinicService.id
    };
    this.profileService.getProtocol(this.payload).subscribe((data: any) => {
      console.log('data', data);
      this.isLoading = false;
      this.protocolArrays = data.protocols ? data.protocols : data.list;
      this.filterProtocolList(this.searchText);
    }, error => {
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Unable to get protocol list');
    });
  }

  getPatientData() {
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.patientService.findById(payload).subscribe((data: any) => {
      this.patient = data;
    }, error => {
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Cannot get Patient data', 'Error');
    });
  }

  showConsultList() {
    this.showList = true;
    this.showAppointments = false;
  }

  filterProtocolList(searchText) {
    const keyword = new RegExp(searchText, 'gi');
    let filtered = this.protocolArrays.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
    filtered = filtered.filter(item => {
      return item.name.match(keyword) || item.description.match(keyword);
    });

    filtered = filtered.filter(item => {
      return !item.name.startsWith('$');
    });

    filtered = filtered.filter(item => {
      return !item.name.startsWith('*');
    });

    filtered = filtered.filter(item => {
      return item.online;
    });

    filtered = filtered.filter(item => {
      return item.status === 'approved' || item.status === '';
    });

    filtered = filtered.filter(item => {
      return item.patient;
    });

    // tslint:disable-next-line:triple-equals
    if (this.assessmentData && this.assessmentData.type == 6) {
      // waiting
      filtered = filtered.filter(item => {
        return item.video;
      });
      // tslint:disable-next-line:triple-equals
    } else if (this.assessmentData && this.assessmentData.type == 1) {
      // schedule
      filtered = filtered.filter(item => {
        return item.video;
      });
      // tslint:disable-next-line:triple-equals
    } else if (this.assessmentData && this.assessmentData.type == 3) {
      // calback
      filtered = filtered.filter(item => {
        return item.callBack;
      });
      // tslint:disable-next-line:triple-equals
    } else if (this.assessmentData && this.assessmentData.type == 0) {
      // async
      filtered = filtered.filter(item => {
        return item.asynchronous;
      });
    } else if (this.cliniConfig.enableCallBack) {
      // based upon admin setting show the protocols
      filtered = filtered.filter(item => {
        return item.callBack;
      });
    } else {
      // based upon admin setting show the protocols
      filtered = filtered.filter(item => {
        return item.asynchronous;
      });
    }
    let featureProtocolIds = [];
    if (this.cliniConfig.featureProtocolIds) {
      featureProtocolIds = this.cliniConfig.featureProtocolIds.split(',');
      console.log('featureProtocolIds', featureProtocolIds);
    }
    if (featureProtocolIds.length > 0) {
      const first = [];
      featureProtocolIds.map(item => {
        filtered.map(data => {
          // tslint:disable-next-line:triple-equals
          if (data.name == item) {
            // flag set to show star icon for all featured protocol
            data.showIcon = true;
            first.push(data);
          }
        });
      });
      filtered = first.concat(filtered);
      const uniqueItems = Array.from(new Set(filtered));
      console.log('protocolList uniqueItems', uniqueItems);
      this.protocolList = uniqueItems;
    } else {
      this.protocolList = filtered;
    }
  }

  runProtocol(protocol) {
    this.showAssessment = true;
    this.showList = false;
    this.protocolName = protocol.name;
    this.protocolID = protocol.id;
    this.protocolObj = { protocolName: this.protocolName, protocolID: this.protocolID, state: this.patient.state };
  }

  getRecord(event) {
    this.showAppointments = true;
    this.showAssessment = false;
    this.getAppointments(this.userID);
  }

  getAppointments(userId) {
    this.scheduleService.getAppointmentList(userId).subscribe((data: any) => {
      this.appointmentlistResult = data.encounterList.filter(item => {
        // tslint:disable-next-line:triple-equals
        return item.meeting && !item.meeting.onDemand && item.status != 2
          // tslint:disable-next-line:triple-equals
          && item.status != 5 && item.status != 6;
        // && this.CompareDate(item.meeting.startTime);
      });
      this.appointmentlistResult = this.appointmentlistResult.map((item, index) => { item.index = index; return item; });
      this.appointmentlistResult = this.sortAppointments();
      const appointmentss = this.appointmentlistResult.slice(((this.pageNumber - 1) * this.pageSize), ((this.pageNumber) * this.pageSize));
      const collectionAppointment = [];
      let result = {};
      appointmentss.map((item => {
        if (item.meeting.users.length > 0) {
          // tslint:disable-next-line:triple-equals
          if (item.meeting.users[1].userName != item.providerID) {
            item.meeting.users.reverse();
          }
        }
      }));
      appointmentss.forEach(element => {
        result = {
          Name: element.meeting.users[1].firstName + ' ' + element.meeting.users[1].lastName,
          subject: element.meeting.subject,
          scheduled: new Date(element.meeting.startTime),
          duration: element.meeting.duration + ' ' + 'min',
          imageUrl: element.meeting.users[1].imageUrl,
          meetingId: element.meeting.meetingId,
          providerID: element.providerID,
          type: element.type,
          encounterID: element.encounterID,
          protocolID: element.protocolID,
          extraData: JSON.parse(element.extraData)
        };
        collectionAppointment.push(result);
        data = {};
      });
      this.totalAppointment = collectionAppointment;
      this.appointmentlistResult.map(item => {
        try {
          this.patientName = JSON.parse(item.extraData);
        } catch (error) {
          console.log('Cannot get appointment list:', error.statusText);
        }
      });
      console.log('total appointment', this.totalAppointment);
      try {
        this.clinicTimeFormat = (JSON.parse(this.clinic.clinicConfig)).clinicTimeFormat;
      } catch (error) {
        console.log('Clinic time format error:', error.statusText);
      }
      if (this.clinicTimeFormat) {
        this.totalAppointment.map(item => {
          item.scheduled = this.datePipe.transform(item.scheduled, this.clinicTimeFormat);
          return item;

        });
      } else {
        this.totalAppointment.map(item => {
          item.scheduled = moment(item.scheduled).format('ddd, MMM Do YYYY hh:mm a Z');
          return item;
        });
      }
    }, error => {
      this.toastrService.danger(error.error.errorMessage);

    });
  }

  sortAppointments() {
    this.appointmentlistResult.sort((a, b) => {
      const x = a.meeting.startTime;
      const y = b.meeting.startTime;
      if (x < y) { return -1; }
      if (x > y) {
        return 1;
      } else { return 0; }
    });
    return this.appointmentlistResult;
  }

  rescheduleModal(reschdeuleDialog: TemplateRef<any>) {
    this.rescheduleDialogRef = this.dialogService.open(reschdeuleDialog, { closeOnBackdropClick: false });
  }

  closeReschedule() {
    this.rescheduleDialogRef.close();
  }

  deleteAppointment() {
    this.scheduleService.deleteAppointment(this.deleteObj).subscribe((data: any) => {
      this.toastrService.success(this.translate.instant('kAppointmentSuccessfully'));
      this.getAppointments(this.userID);
      this.updateService();
      this.deleteDialogRef.close();
    }, error => {
      this.toastrService.danger(error.error.errorMessage);

    });
  }

  cancelAppointment(deleteDialog: TemplateRef<any>, id, content) {
    this.deleteObj = {
      userID: this.userID,
      flag: 0,
      isOrganizer: false,
      meetingID: id
    };
    this.deleteDialogRef = this.dialogService.open(deleteDialog, { closeOnBackdropClick: false });
  }

  close() {
    this.deleteDialogRef.close();
  }

  updateService() {
    const appointmentList = this.appointmentlistResult.find(d => d.meeting.meetingId === this.deleteObj.meetingID);
    const meeting = {
      assessment: '',
      assessmentID: '0',
      assessmentName: appointmentList.assessmentName,
      attendingProviderID: appointmentList.clinicID,
      clinicID: appointmentList.created,
      created: appointmentList.created,
      diagnosis: '',
      encounterID: appointmentList.encounterID,
      endPoint: appointmentList.endPoint,
      extraData: '',
      interview: '',
      meetingID: '-1',
      patientID: appointmentList.patientID,
      pharmacyID: '',
      processed: appointmentList.processed,
      protocolID: 0,
      providerID: appointmentList.providerID,
      status: 5,
      submitterID: appointmentList.submitterID,
      symptoms: '',
      treatment: '',
      type: 1,
      userID: this.userID
    };
    this.scheduleService.updateProvider(meeting).subscribe((data: any) => {
      this.notifyUser(appointmentList);
    }, error => {
      this.toastrService.danger(this.translate.instant('kClinic') + ' ' + this.translate.instant('kNotFound'));

    });
  }

  notifyUser(appointmentList) {
    const patientName = JSON.parse(appointmentList.extraData);
    const date = this.clinicTimeFormat ? this.datePipe.transform(appointmentList.meeting.startTime, this.clinicTimeFormat) :
      moment(appointmentList.meeting.startTime).format('ddd YYYY-MM-DD h:mm A');
    const notification = {
      clinicID: appointmentList.clinicID,
      command: '',
      message: 'Patient has cancelled appointment.',
      messageContent: patientName.firstName + ' ' +
        patientName.lastName + ' has cancelled appointment scheduled for ' + date,
      messageType: 35,
      subject: 'Message from ' + appointmentList.meeting.firstName + ' ' + appointmentList.meeting.lastName,
      url: patientName.profileImageUrl,
      userID: this.userID,
      users: [
        appointmentList.providerID
      ]
    };
    this.scheduleService.notificationUser(notification).subscribe((data: any) => {
    }, error => {
      this.toastrService.danger(error.error.errorMessage);

    });
  }
}
