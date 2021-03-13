import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { PatientService } from 'projects/core/src/lib/service/patient/state/patient.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ScheduleService } from 'src/app/shared/service/schedule.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  timeSlots = [];
  providerSpeciality: any;
  clinic: any;
  clinicID: any;
  selectSpeciality: any;
  randomProviderList: any;
  listOfProvider: any;
  totalProviderCollection = [];
  dataList: any;
  providersList = [];
  providerDetails: any;
  npiId: any;
  providerName: any;
  providerData: any;
  isLoading = false;
  totalAppointment = [];
  appointmentlistResult: any;
  pageNumber = 1;
  pageSize = 25;
  searchText = '';
  patient: any;
  patientID: string;
  userID: string;

  constructor(
   private clinicService: ClinicService,
   private toastrService: NbToastrService,
   private profileService: ProfileService,
   private patientService: PatientService,
   private activatedRoute: ActivatedRoute,
   private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.userID = this.profileService.id;
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
    });
    this.getPatientData();
    this.clinic = this.clinicService.clinic;
    this.clinicID = this.clinicService.id;
    this.clinicService.getPhysicianCategoryList(this.clinicID).subscribe((data: any) => {
      this.providerSpeciality = data.physicianCategoryList;
    }, error => {
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Cannot get Physician list');
    });
  }

  getList() {
    this.isLoading = true;
    const payload = {
      categoryID: '',
      city: '',
      distance: 10000,
      itemsCount: 1000,
      latitude: 0.000000,
      longitude: 0.000000,
      name: '',
      networkId: this.clinicService.id,
      pageNumber: 1,
      practiceStates: this.patient.state,
      practiceType: 2,
      sortBy: 'serviceType',
      specialties: this.selectSpeciality,
      random: this.randomProviderList,
      state: '',
      taxonomyCode: '',
      zipcode: '',
      protocolID: 1493
    };
    if (this.clinic.oemID === 150) {
      payload.practiceStates = '';
    }
    this.clinicService.getProvidersList(payload).subscribe((data: any) => {
      this.isLoading = false;
      if (data.errorMessage) {
        this.toastrService.danger(data.errorMessage ? data.errorMessage : 'Cannot get Provider list');
        return;
      }
      this.listOfProvider = {
        id: '',
        practiceName: '',
        imageUrl: '',
        specialties: '',
        npi: '',
        status: '',
        practiceType: ''
      };
      this.dataList = data.networkHcpList;
      this.totalProviderCollection = [];
      this.dataList.forEach(element => {
        // tslint:disable-next-line:no-bitwise
        if ((element.serviceType & 1) === 0) {
          this.listOfProvider.status = 'Offline';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 2) === 2) {
          this.listOfProvider.status = 'Available Now';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 4) === 4) {
          this.listOfProvider.status = 'Accepts Scheduled Visits';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 16) === 16) {
          this.listOfProvider.status = 'Report Symptoms, Get CallBack';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 8) === 8) {
          this.listOfProvider.status = 'Report Symptoms, Get Treatment';
        } else {
          this.listOfProvider.status = 'Offline';
        }
        this.listOfProvider.practiceName = element.name + ' ' + element.degrees;
        this.listOfProvider.imageUrl = element.imageUrl;
        this.listOfProvider.specialties = element.specialties;
        this.listOfProvider.id = element.id;
        this.listOfProvider.npi = element.npi;
        this.listOfProvider.practiceType = element.practiceType;
        this.totalProviderCollection.push(this.listOfProvider);
        this.listOfProvider = {
          id: '',
          practiceName: '',
          imageUrl: '',
          specialties: '',
          npi: '',
          status: '',
          practiceType: '',
        };
      });
      this.providersList = this.totalProviderCollection;
    }, error => {
      this.toastrService.danger('Cannot get provider list');
    });
  }

  getProvidersList(data) {
    this.selectSpeciality = data;
    this.getList();
  }

  getProviderDetails(npiId) {
    this.profileService.providerNPiID = npiId;
    // tslint:disable-next-line:triple-equals
    this.providerDetails = this.dataList.find(a => a.npi == npiId);
    this.npiId = npiId;
    if (this.npiId) {
      const payLoad = {
        userID: this.profileService.id,
        clinicID: this.clinicService.id,
        providerID: this.npiId,
        types: [
          { type: 6, providerOnly: true, status: [0, 1, 4] },
          { type: 0, providerOnly: false, status: [0, 1] },
          { type: 3, providerOnly: false, status: [0, 1] },
          { type: 4, providerOnly: true, status: [7], },
          { type: 7, providerOnly: true, status: [2] },
          { type: 1, providerOnly: true, status: [0, 1, 4] }
        ]
      };
      this.getUserName(npiId);
    } else {
      this.toastrService.danger('NPI ID is not provided');
    }
  }

  getUserName(npiId) {
    this.profileService.getProviderName(this.npiId).subscribe((data: any) => {
      this.providerData = data;
      this.providerName = this.providerData.username;
      const payLoad = {
        userID: this.profileService.id,
        clinicID: this.clinicService.id,
        providerID: this.providerName,
        types: [
          { type: 6, providerOnly: true, status: [0, 1, 4] },
          { type: 0, providerOnly: false, status: [0, 1] },
          { type: 3, providerOnly: false, status: [0, 1] },
          { type: 4, providerOnly: true, status: [7], },
          { type: 7, providerOnly: true, status: [2] },
          { type: 1, providerOnly: true, status: [0, 1, 4] }
        ]
      };
    });
  }

  searchProvider() {
    this.providersList = this.totalProviderCollection.filter((data) => {
      return `${data.practiceName}`.toLowerCase().includes(this.searchText.toLowerCase());
    });
    if (this.searchText === '') {
      this.getList();
    }
  }

  getPatientData() {
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.patientService.findById(payload).subscribe((data: any) => {
      this.patient = data;
      this.getList();
    }, error => {
      console.log('error', error);
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Cannot get Patient data');
    });
  }

getAppointments(userID) {
  this.scheduleService.getAppointmentList(userID).subscribe((data: any) => {
    console.log('appointments',data)
    this.appointmentlistResult = data.encounterList.filter(item => {
      return item.meeting && !item.meeting.onDemand && item.status != 2
        && item.status != 5 && item.status != 6;
      // && this.CompareDate(item.meeting.startTime);
    });
    this.appointmentlistResult = this.appointmentlistResult.map((item, index) => { item.index = index; return item; });
    console.log('before sorting-> all-appointments', JSON.parse(JSON.stringify(this.appointmentlistResult)));
    this.appointmentlistResult = this.sortAppointments();
    const appointmentss = this.appointmentlistResult.slice(((this.pageNumber - 1) * this.pageSize), ((this.pageNumber) * this.pageSize));
    const collectionAppointment = [];
    let result = {};
    appointmentss.map((item => {
      if (item.meeting.users.length > 0) {
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
        //  - (new Date().getTimezoneOffset() * 60 * 1000)),
        duration: element.meeting.duration + ' ' + 'min',
        imageUrl: element.meeting.users[1].imageUrl,
        meetingId: element.meeting.meetingId,
        providerID: element.providerID,
        type: element.type,
        encounterID: element.encounterID,
        protocolID: element.protocolID

      };
      collectionAppointment.push(result);
      data = {};
    });
    this.totalAppointment = collectionAppointment;
    console.log('total appointment',this.totalAppointment)
    // if (this.clinicTimeFormat ) {
    //   this.totalAppointment.map(item => {
    //     // item.scheduled = moment(item.scheduled).format(this.clinicTimeFormat);
    //     item.scheduled = this.datePipe.transform(item.scheduled, this.clinicTimeFormat);
    //     return item;
        
    //   });
    // } else {
    //   this.totalAppointment.map(item => {
    //     item.scheduled = moment(item.scheduled).format('ddd, MMM Do YYYY hh:mm a Z');        
    //     return item;
    //   });
    // }
    this.isLoading = false;
  }, error => {
    this.isLoading = false;
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

}
