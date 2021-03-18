import { PlatformLocation } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

declare var GenieMD: any;

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {
  @Input() protocolData;
  @Output() homeData: EventEmitter<any> = new EventEmitter();

  protocolName: any;
  protocolID: any;
  iframeLoad: HTMLElement;
  clinicID: any;
  userID: any;
  location: any;
  isLoading = false;
  protoData: any;
  clinicConfig: any;
  assessmentData: any;
  state: any;

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private router: Router,
    private platformLocation: PlatformLocation,
  ) { }

  ngOnInit(): void {
    console.log('proto', this.protocolData);
    this.protocolName = this.protocolData.protocolName;
    this.protocolID = this.protocolData.protocolID;
    this.clinicID = this.clinicService.id;
    this.userID = this.profileService.id;
    this.clinicConfig = this.clinicService.config;
    this.state = this.protocolData.state;
    this.iframeLoad = document.getElementById('container');
    this.location = (this.platformLocation as any).location;

    window.onmessage = (e) => {
      console.log('e data', e.data);
      if (e.data.goToHomeConsent) {
        console.log('home', e.data.goToHomeConsent);
        this.homeData.emit(true);
      }
    };

    this.protoData = {
      type: '3',
    };

    if (this.protocolName) {
      this.protoData.showDoneButton = true;
      console.log('done', this.protoData.showDoneButton);
    }

    if (this.clinicConfig) {
      if (this.clinicConfig.enableCallBack && this.clinicConfig.enableEvisit) {
        this.protoData.type = '3';
      } else if (this.clinicConfig.enableCallBack) {
        this.protoData.type = '3';
      } else if (this.clinicConfig.enableEvisit) {
        this.protoData.type = '0';
      }
    }

    if (this.assessmentData && Object.keys(this.assessmentData).length > 0) {
      this.protocolData = {
        protocolName: this.protocolName,
        showSoapNote: false,
        submitterID: this.assessmentData.userName,
        slot: this.assessmentData.slot,
        // for schedule type = 1
        startTime: this.assessmentData.startTime,
        type: this.assessmentData.type,
        providerID: this.assessmentData.providerName,
        npi: this.assessmentData.npiID,
        showDoneButton: true,
        fee: this.assessmentData.fee,
        state: this.state
      };
    }


    let genieMD;
    if (this.location.hostname === 'localhost') {
      genieMD = new GenieMD('//dev.geniemd.net');
      // genieMD = new GenieMD('http://localhost:4201');

    } else {
      genieMD = new GenieMD(`//${this.location.hostname}`);
    }
    genieMD.init(this.clinicID, this.userID);
    genieMD.renderAssessment(document.querySelector('#container'), this.protocolData);
    const parentElement = document.querySelector('#container');
    if (parentElement.getElementsByTagName('iframe')[0]) {
      const iFrame = parentElement.getElementsByTagName('iframe')[0];
      const iFrameContent = iFrame.contentWindow;
      iFrame.addEventListener('load', () => {
        console.log('inside load');
        this.isLoading = false;
        iFrameContent.onbeforeunload = () => {
          console.log('triggered onbeforeunload');
          this.isLoading = true;
        };
      });
    } else {
      this.isLoading = false;
    }
  }

}
