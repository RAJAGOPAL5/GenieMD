import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { DataService } from 'src/app/shared/service/data.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

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
  showList = true;

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private dataService: DataService,
    private router: Router

  ) {
    this.dataService.data.subscribe(data => {
      this.assessmentData = data;
    });
  }

  ngOnInit(): void {
    this.clinicID = this.clinicService.id;
    console.log('clinic', this.clinicService);
    console.log('profile', this.profileService);
    this.cliniConfig = this.clinicService.config;
    this.userID = this.profileService.id;
    this.npiId = '0';
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
    });
    this.getPatientData();
    this.getProtocolList();
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
    this.protocolObj = {protocolName: this.protocolName, protocolID: this.protocolID, state: this.patient.state };
  }

  getRecord(event) {
    this.showList = true;
    this.showAssessment = false;
  }
}
