import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbIconLibraries, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { languages, states, morbidity, gender } from 'src/app/shared/constant/constant';

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
  isLoading: boolean;
  monitored: true;
  patientExtraData: any;
  profileData: any;
  languages: any[] = [];
  language: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientsService,
    private iconLibraries: NbIconLibraries,
    private profileService: ProfileService,
    private toastrService: NbToastrService,
    private ls: LanguageService,
    private translate: TranslateService,
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
      this.prepareTabs();
      this.getData();
    });
    this.languages =  languages;
  }

  getData() {
    this.morbiditys = morbidity;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.patientService.findById(payload).subscribe((data: any) => {
      this.morbidityValue = [];
      this.patient = data;
      this.patientExtraData = this.patient.extraData ? JSON.parse(this.patient.extraData) : {};
      this.patientName = `${this.patient.firstName} ${this.patient.lastName}`;
      this.patient.morbidity === 0 ? this.morbidityValue.push('Lung Disease') : this.morbidityValue.push('Heart Disease');
      this.profileService.get(this.patient.userID).subscribe((res: any) => {
        this.profileData = res;
        this.language = this.languages.find(item => item.id === this.profileData.languageId);
      });
      /* BELOW IS FOR FEATURE USE FOR MOBIDITY MULTI SELECT  */

      // this.morbidityValue = [];
      // this.patient.morbidity.map(item1 => {
      //   this.morbiditys.map((item2) => {
      //     if (item1 === item2.id) {
      //       this.morbidityValue.push(item2.name);
      //     }
      //   });
      // });

      /* MOBIDITY MULTI SELECT END */


    }, error => {
      console.log('error');
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
        title: 'Visits',
        route: `visits`,
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
}
