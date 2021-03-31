import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import * as moment from 'moment';
import { MeetService } from '../services/meet.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  showVitals = false;
  isLoading = false;
  meeting: any;
  meetingRes: any;
  uniqueID: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientsService,
    private profileService: ProfileService,
    private toastrService: NbToastrService,
    private meetService: MeetService
  ) { }

  ngOnInit(): void {
    this.createMeeting();
  }

  getRecord(event) {
    // tslint:disable-next-line:triple-equals
    if (event == 'vitals') {
      this.showVitals = !this.showVitals;
    }
  }

  createMeeting() {
    this.isLoading = true;
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
    this.meetService.createMeeting(this.meeting).subscribe((data: any) => {
      this.isLoading = false;
      this.meetingRes = data;
      this.generateUniqueID();
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
    this.meetService.generateUniqueID(payload).subscribe((meeting: any) => {
      this.uniqueID = meeting.meetingUniqueID;
      console.log('unique id', this.uniqueID);
    }, error => {
      this.toastrService.danger(error.error ? error.error.errorMessage : 'Failed to generate uniqueID');
    });
  }
}

