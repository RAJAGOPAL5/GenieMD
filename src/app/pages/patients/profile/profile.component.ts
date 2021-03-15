import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NbIconLibraries, NbToastrService, NbTagComponent } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { languages, states, morbidity, gender, diseaseState, relation } from 'src/app/shared/constant/constant';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

interface ViewModal {
  profile?: any;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  model: ViewModal = {};
  tabs: any[];
  patientID: any;
  patient: any;
  patientName: any;
  morbidityValue: any = [];
  morbiditys: any[] = [];
  isLoading: boolean;
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
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientsService,
    private iconLibraries: NbIconLibraries,
    private profileService: ProfileService,
    private toastrService: NbToastrService,
    private ls: LanguageService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
    translate.use('en');
    translate.setTranslation('en', this.ls.state);

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        const trigeredPatient = event.url.split('/')[4];
        if (!this.timerStatus && this.patientID !== trigeredPatient) {
          // Show loading indicator
          confirm('Are you sure you want to proceed?');
        } else {

        }
      }
      this.subscription = router.events.subscribe(data => {
        if (data instanceof NavigationStart) {
          browserRefresh = !router.navigated;
        }
      });
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
      this.prepareTabs();
      this.getData();
    });
    this.languages = languages;
    this.relation = relation;
    // tslint:disable-next-line: max-line-length
    this.showEmergency = this.clinicService.config.extendedSettings && this.clinicService.config.extendedSettings.emergencyContact && this.clinicService.config.extendedSettings.emergencyContact === 'true' ? true : false;
    const rpmTimer = this.clinicService.config.extendedSettings?.rpmTimer * 10 || 10000;
    setTimeout(() => { this.start(); }, rpmTimer);
  }

  start() {
    this.countDown();
    this.timerStatus = false;
  }
  stop(val) {
    this.total = val;
    this.startStop = true;
    this.timerStatus = true;
    clearInterval(this.intervalId);
    this.seconds = 0;
    this.totalsec = 0;
  }

  countDown() {
    this.startStop = false;
    this.intervalId = window.setInterval(() => {
      this.seconds += 1;
      this.seconds = this.seconds === 60 ? 0 : this.seconds;
      this.message = this.seconds;
      this.totalsec += 1;
      const countminute = this.totalsec / 60;
      this.minutes = Math.floor(countminute);
    }, 1000);
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
        this.profileService.get(this.patient.userID).subscribe((res: any) => {
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
      this.toastrService.success('Patient updated Successfully');
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage);
    });
  }
  trimContact(data) {
    return data && data.trim() !== '' ? data : ' ';
  }
  ngOnDestroy(): void {
    alert('hiii');
  }

}
