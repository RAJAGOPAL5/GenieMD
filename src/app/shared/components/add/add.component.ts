import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import * as moment from 'moment';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/shared/service/patients.service';
import {
  NbDialogRef, NbToastrService, NbDialogService, NbSortDirection, NbSortRequest, NbTreeGridDataSourceBuilder,
  NbTreeGridDataSource, NbThemeService
} from '@nebular/theme';
import { languages, states, morbidity, gender, vitals, relation, diseaseState, preferredLanguage } from 'src/app/shared/constant/constant';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/service/language.service';
import { retryWhen } from 'rxjs/operators';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {
  profileForm: FormGroup;
  emergencyForm: FormGroup;
  profileData: any;
  userID: any;
  profile: any;
  clinic: any;
  states: any[] = [];
  languages: any[] = [];
  morbidityID: any[] = [];
  relation: any[] = [];
  toggleNgModel = false;
  actionName: any;
  isLoading = false;
  patientID: any;
  genderArr = gender;
  vitals: any[] = [];
  selectedItem: any;
  profileExtraData: any;
  diseaseState: any[] = [];
  showOtherDisease = false;
  preferredLanguage: any[] = [];
  showPreferredLanguages = false;
  policyHolderName = [{ name: 'Self', id: 0 }, { name: 'Spouse', id: 1 }, { name: 'Other', id: 2 }];
  mediType = [{ name: 'Private', id: 0 }, { name: 'Medicare', id: 1 }, { name: 'Medicare advantage', id: 2 }, { name: 'Tricase', id: 3 }];
  @ViewChild('birthDate', { static: false }) birthDate: any;
  submitted: boolean;
  diseaseStates: any;
  dataurl: any;
  frontImageURl: any;
  backImageURL: any;
  deviceDialogRef: NbDialogRef<any>;
  emergency: any;
  insurance: any;
  insuranceObj: any;
  theme: any;
  fontColor: boolean;
  devices: any;
  profilePictureEvent: any;
  registerPayload: any;
  imageURL: any;
  imageSrc: string;
  // tslint:disable-next-line:max-line-length
  defaultImageURL = 'https://geniemd-generalfiles.s3.amazonaws.com/08fb6fbc4ceb4549ab9803ea4624df2d.png?AWSAccessKeyId=AKIAIZH5KUW5NWRU5FDQ&Expires=1930919200&Signature=XMhr6ne%2BzLmr0FwBRIXZdHIrjRA%3D';
  surveys: any;

  constructor(
    private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService,
    private clinicService: ClinicService, private router: Router, private route: ActivatedRoute,
    private toastrService: NbToastrService, private patientsService: PatientsService, protected dialogRef: NbDialogRef<any>,
    private languageService: LanguageService, private translate: TranslateService, private dialogService: NbDialogService,
    private themeService: NbThemeService,
  ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }

  ngOnInit(): void {
    this.createForm();
    this.themeService.onThemeChange().subscribe(theme => {
      this.theme = theme.name;
    });
    this.fontColor = this.theme === 'dark' ? true : false;
    this.clinic = this.clinicService.clinic;
    if (!!this.patientID) {
      this.isLoading = true;
      this.getProfilePatch();
    } else {
      this.imageURL = this.defaultImageURL;
    }
    this.actionName = this.patientID ? 'Edit Patient' : 'Create Patient';
    this.states = states;
    this.morbidityID = morbidity;
    this.vitals = vitals;
    this.languages = languages;
    this.diseaseState = diseaseState;
    this.relation = relation;
    this.preferredLanguage = preferredLanguage;
    try {
      this.insuranceObj = JSON.parse(this.clinicService.config?.extendedSettings?.insurance);
    } catch {
      this.insuranceObj = {};
    }
    this.insurance = this.insuranceObj.enabled;
    this.emergency = this.clinicService.config?.extendedSettings?.emergencyContact === 'true' ? true : false;
  }
  getProfilePatch() {
    let variousDisease;
    const patientPayload = {
      userID: this.profileService.id,
      clinicID: this.clinic.clinicID,
      patientID: this.patientID
    };
    this.patientsService.findById(patientPayload).subscribe((items: any) => {
      this.profileData = items;
      this.profileService.getPatientProfile(this.profileData.userID).subscribe((res: any) => {
        try {
          this.profileExtraData = JSON.parse(this.profileData.extraData);
        } catch (error) {
          this.profileExtraData = this.profileData.extraData || {};
        }

        try {
          variousDisease = JSON.parse(this.profileExtraData.diseaseState);
        } catch (e) {
          variousDisease = this.profileExtraData.diseaseState || [];
        }
        this.imageURL = this.profileData.imageURL || this.profileData.imageUrl || this.defaultImageURL;
        this.profileForm.patchValue({
          firstName: this.profileData.firstName,
          lastName: this.profileData.lastName,
          gender: this.profileData.gender,
          dob: new Date(this.profileData.dob),
          handphone: this.profileData.phoneNumber,
          email: this.profileData.email,
          country: this.profileData.country,
          state: this.profileData.state,
          zipcode: this.profileData.zipcode,
          address: this.profileData.address,
          city: this.profileData.city,
          morbidity: this.profileData.morbidity,
          language: this.profileData.languageId,
          vitals: !!this.profileExtraData.vitals ? this.profileExtraData.vitals : [],
          // tslint:disable-next-line: max-line-length
          policyHolder: this.profileExtraData.insurance && this.profileExtraData.insurance.policyHolder ? this.profileExtraData.insurance.policyHolder : '',
          // tslint:disable-next-line: max-line-length
          holderName: this.profileExtraData.insurance && this.profileExtraData.insurance.holderName ? this.profileExtraData.insurance.holderName : '',
          // tslint:disable-next-line: max-line-length
          insuranceDob: this.profileExtraData.insurance && this.profileExtraData.insurance.insuranceDob ? new Date(this.profileExtraData.insurance.insuranceDob) : '',
          // tslint:disable-next-line: max-line-length
          claimAddress: this.profileExtraData.insurance && this.profileExtraData.insurance.claimAddress ? this.profileExtraData.insurance.claimAddress : '',
          // tslint:disable-next-line: max-line-length
          insuranceCarrier: this.profileExtraData.insurance && this.profileExtraData.insurance.insuranceCarrier ? this.profileExtraData.insurance.insuranceCarrier : '',
          // tslint:disable-next-line: max-line-length
          medType: this.profileExtraData.insurance && this.profileExtraData.insurance.medType ? this.profileExtraData.insurance.medType : '',
          // tslint:disable-next-line: max-line-length
          policyNumber: this.profileExtraData.insurance && this.profileExtraData.insurance.policyNumber ? this.profileExtraData.insurance.policyNumber : '',
          // tslint:disable-next-line: max-line-length
          groupNumber: this.profileExtraData.insurance && this.profileExtraData.insurance.groupNumber ? this.profileExtraData.insurance.groupNumber : '',
          plan: this.profileExtraData.insurance && this.profileExtraData.insurance.plan ? this.profileExtraData.insurance.plan : '',
          // tslint:disable-next-line: max-line-length
          emergencyName: this.profileExtraData.emergencyContact && this.profileExtraData.emergencyContact.name ? this.profileExtraData.emergencyContact.name : '',
          // tslint:disable-next-line: max-line-length
          emergencyRelation: this.profileExtraData.emergencyContact && this.profileExtraData.emergencyContact.relation ? this.profileExtraData.emergencyContact.relation : '',
          // tslint:disable-next-line: max-line-length
          emergencyNumber: this.profileExtraData.emergencyContact && this.profileExtraData.emergencyContact.number ? this.profileExtraData.emergencyContact.number : '',
          mrn: this.profileExtraData.MRN ? this.profileExtraData.MRN : '',
          diseaseState: variousDisease,
          preferredLanguage: this.profileExtraData.preferredLanguage,
          surveys: this.profileExtraData.surveys,
          // customLanguage:this.profileExtraData.otherLanguage,
          // customDisease:this.profileExtraData.otherDisease

        });
        // tslint:disable-next-line: max-line-length
        this.frontImageURl = this.profileExtraData.insurance && this.profileExtraData.insurance.frontImage ? this.profileExtraData.insurance.frontImage : '';
        // tslint:disable-next-line: max-line-length
        this.backImageURL = this.profileExtraData.insurance && this.profileExtraData.insurance.backImage ? this.profileExtraData.insurance.backImage : '';
        this.devices = this.profileExtraData.iHealthDevices;

        if (this.profileExtraData.otherLanguage) {
          this.showPreferredLanguages = true;
          this.profileForm.addControl('customLanguage', new FormControl('', [Validators.required]));
          this.profileForm.patchValue({
            customLanguage: this.profileExtraData.otherLanguage
          });
        }
        if (this.profileExtraData.otherDisease) {
          this.showOtherDisease = true;
          this.profileForm.addControl('customDisease', new FormControl('', [Validators.required]));
          this.profileForm.patchValue({
            customDisease: this.profileExtraData.otherDisease
          });
        }
        if (this.profileData.monitored === 0) {
          this.profileForm.patchValue({
            monitored: false
          });
        } else {
          this.profileForm.patchValue({
            monitored: true
          });
        }
        this.isLoading = false;
      });
    });
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      mrn: [''],
      handphone: ['', Validators.required],
      language: [''],
      email: ['', Validators.required],
      password: 'Temp1234',
      gender: 0,
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      morbidity: [''],
      monitored: [''],
      vitals: [[]],
      policyHolder: [''],
      holderName: [''],
      insuranceDob: [''],
      claimAddress: [''],
      insuranceCarrier: [''],
      medType: [''],
      policyNumber: [''],
      groupNumber: [''],
      plan: [''],
      emergencyName: [''],
      emergencyRelation: [''],
      emergencyNumber: [''],
      diseaseState: [[]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    const emergencyContact = {
      name: this.profileForm.value.emergencyName,
      relation: this.profileForm.value.emergencyRelation,
      number: this.profileForm.value.emergencyNumber
    };
    const insurance = {
      policyHolder: this.profileForm.value.policyHolder,
      holderName: this.profileForm.value.holderName,
      insuranceDob: this.profileForm.value.insuranceDob,
      claimAddress: this.profileForm.value.claimAddress,
      insuranceCarrier: this.profileForm.value.insuranceCarrier,
      medType: this.profileForm.value.medType,
      policyNumber: this.profileForm.value.policyNumber,
      groupNumber: this.profileForm.value.groupNumber,
      plan: this.profileForm.value.plan,
      frontImage: this.frontImageURl,
      backImage: this.backImageURL
    };
    let extraData: any = {};
    if (this.profileExtraData) {
      extraData = this.profileExtraData;
      extraData.dateofbirth = this.setDOB(this.profileForm.value.dob);
      extraData.phoneNumber = this.profileForm.value.handphone ? this.profileForm.value.handphone : '';
      extraData.vitals = this.profileForm.value.vitals;
      extraData.emergencyContact = emergencyContact;
      extraData.insurance = insurance;
      extraData.MRN = this.profileForm.value.mrn;
      extraData.diseaseState = JSON.stringify(this.profileForm.value.diseaseState);
      extraData.otherDisease = this.profileForm.value.customDisease ? this.profileForm.value.customDisease : '';
      extraData.otherLanguage = this.profileForm.value.customLanguage ? this.profileForm.value.customLanguage : '';
      extraData.iHealthDevices = this.devices;
      extraData.surveys = this.surveys;
    }
    this.isLoading = true;
    if (this.profileForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (this.patientID) {
      let date = '';
      if (this.profileForm.value.dob && this.profileForm.value.dob !== '') {
        date = moment(this.profileForm.value.dob).format('YYYY-MM-DD');
      }
      this.registerPayload = {
        email: this.profileForm.value.email,
        dob: date || '',
        birthdate: moment(this.profileForm.value.dob).valueOf(),
        cellNumber: this.profileForm.value.handphone ? this.profileForm.value.handphone : '',
        languageId: this.profileForm.value.language ? this.profileForm.value.language : '',
        state: this.profileForm.value.state ? this.profileForm.value.state : '',
        address: this.profileForm.value.address ? this.profileForm.value.address : '',
        city: this.profileForm.value.city ? this.profileForm.value.city : '',
        country: this.profileForm.value.country ? this.profileForm.value.country : '',
        zipCode: this.profileForm.value.zipcode ? this.profileForm.value.zipcode : '',
        extraData,
        MRN: this.profileForm.value.mrn ? this.profileForm.value.mrn : '',
        firstName: this.profileForm.value.firstName,
        gender: `${this.profileForm.value.gender}`,
        imageURL: this.profilePictureEvent ? this.imageURL : this.profileData.imageUrl || this.profileData.imageURL,
        lastName: this.profileForm.value.lastName,
        latitude: '0',
        longitude: '0',
        oemID: this.clinic.oemID,
        passport: '',
        pregnant: '0',
        profileEmail: this.profileForm.value.email,
        providerStatus: 'P',
        screenName: this.profileForm.value.firstName + ' ' + this.profileForm.value.lastName,
        updateDirectEmail: true,
        userID: this.profileData.userID ? this.profileData.userID : this.userID,
        morbidity: this.profileForm.value.morbidity,
        monitored: this.profileForm.value.monitored ? 1 : 0,
      };
      if (this.profilePictureEvent) {
        this.changeProfile(this.profilePictureEvent);
      } else {
        this.profileSave();
      }

    } else {
      if (this.profilePictureEvent) {
        this.changeProfile(this.profilePictureEvent);
      }
      const signUpPayload = {
        email: this.profileForm.value.email,
        password: this.profileForm.value.password,
        appVersion: ''
      };
      this.authService.register(signUpPayload).subscribe((res: any) => {
        this.userID = res.userID;
        this.getProfile();
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error.error.errorMessage, 'Error');
      });
    }
  }

  profileSave() {
    this.registerPayload.imageURL = this.profilePictureEvent ? this.imageURL : this.profileData.imageUrl || this.profileData.imageURL || '';
    this.profileService.update(this.registerPayload).subscribe((res: any) => {
      this.isLoading = false;
      this.toastrService.success('Patient Updated Successfully', 'Success');
      this.dialogRef.close(true);
    }, error => {
      this.isLoading = false;
    });
  }
  getProfile() {
    this.profileService.getPatientProfile(this.userID).subscribe((res: any) => {
      this.profile = res;
      this.updateProfile();
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage, 'Error');
    });
  }

  updateProfile() {
    let date = '';
    if (this.profileForm.value.dob && this.profileForm.value.dob !== '') {
      date = moment(this.profileForm.value.dob).format('YYYY-MM-DD');
    }
    const emergencyContact = {
      name: this.profileForm.value.emergencyName,
      relation: this.profileForm.value.emergencyRelation,
      number: this.profileForm.value.emergencyNumber
    };
    const insurance = {
      policyHolder: this.profileForm.value.policyHolder,
      holderName: this.profileForm.value.holderName,
      insuranceDob: this.profileForm.value.insuranceDob,
      claimAddress: this.profileForm.value.claimAddress,
      insuranceCarrier: this.profileForm.value.insuranceCarrier,
      medType: this.profileForm.value.medType,
      policyNumber: this.profileForm.value.policyNumber,
      groupNumber: this.profileForm.value.groupNumber,
      plan: this.profileForm.value.plan,
      frontImage: this.frontImageURl,
      backImage: this.backImageURL
    };
    const registerPayload = {
      email: this.profileForm.value.email,
      dob: date || '',
      birthdate: moment(this.profileForm.value.dob).valueOf(),
      cellNumber: this.profileForm.value.handphone ? this.profileForm.value.handphone : '',
      languageId: this.profileForm.value.language ? this.profileForm.value.language : '',
      state: this.profileForm.value.state ? this.profileForm.value.state : '',
      address: this.profileForm.value.address ? this.profileForm.value.address : '',
      city: this.profileForm.value.city ? this.profileForm.value.city : '',
      country: this.profileForm.value.country ? this.profileForm.value.country : '',
      zipCode: this.profileForm.value.zipcode ? this.profileForm.value.zipcode : '',
      extraData: {
        clinicID: this.clinic.clinicID,
        clinicName: this.clinicService.config ? this.clinicService.config.name : this.clinicService.clinic.name,
        companyCode: '',
        dateofbirth: this.setDOB(this.profileForm.value.dob),
        governmentID: '',
        ms: '0',
        iHealthDevices: this.devices,
        notifications: {
          email: true,
          push: true,
          sms: true
        },
        password: this.profileForm.value.password,
        phoneNumber: this.profileForm.value.handphone ? this.profileForm.value.handphone : '',
        planID: -1,
        planMemberCount: -1,
        planName: '',
        referralCode: '',
        vitals: this.profileForm.value.vitals,
        MRN: this.profileForm.value.mrn ? this.profileForm.value.mrn : '',
        emergencyContact,
        insurance,
        diseaseState: JSON.stringify(this.profileForm.value.diseaseState),
        otherDisease: this.profileForm.value.customDisease ? this.profileForm.value.customDisease : '',
        otherLanguage: this.profileForm.value.customLanguage ? this.profileForm.value.customLanguage : ''
      },
      firstName: this.profileForm.value.firstName,
      gender: `${this.profileForm.value.gender}`,
      imageURL: this.profilePictureEvent ? this.imageURL : '',
      lastName: this.profileForm.value.lastName,
      latitude: '0',
      locationTime: this.profile.locationTime ? this.profile.locationTime : '',
      longitude: '0',
      oemID: this.clinic.oemID,
      passport: '',
      pregnant: '0',
      profileEmail: this.profileForm.value.email,
      providerStatus: 'P',
      screenName: this.profileForm.value.firstName + ' ' + this.profileForm.value.lastName,
      updateDirectEmail: true,
      userID: this.profile.userID ? this.profile.userID : this.userID,
      morbidity: this.profileForm.value.morbidity,
      monitored: this.profileForm.value.monitored ? 1 : 0,
    };
    // tslint:disable-next-line:no-unused-expression
    this.profileForm.value.morbidity === '' ? delete registerPayload.morbidity : '';
    this.profileService.update(registerPayload).subscribe((res: any) => {
      const firstList = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        patientID: this.profileForm.value.email
      };
      this.addPatient();
      this.isLoading = false;
      this.toastrService.success('Patient added Successfully', 'Success');
      // this.router.navigate(['patients']);
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage, 'Error');
    });
  }

  get f() {
    return this.profileForm.controls;
  }
  addPatient() {
    const payload = {
      clinicID: this.clinic.clinicID,
      patientID: this.profile.userName,
      providerID: '',
      userID: this.profile.userID ? this.profile.userID : this.userID
    };
    this.profileService.add(payload).subscribe(res => {
      this.dialogRef.close(res);
    }, error => {
      this.toastrService.danger(error.error.errorMessage, 'Error');
    });
  }
  chooseDate() {
    this.birthDate.toggle();
  }
  setDOB(dob: any) {
    if (dob.year && dob.month && dob.day) {
      return dob.year + '-' + dob.month + '-' + dob.day;
    } else {
      return '';
    }
  }

  cancel() {
    this.dialogRef.close();
  }
  onchange() {
    const selectedDisease = this.profileForm.value.diseaseState.filter(item => item === 10);
    if (selectedDisease && selectedDisease.length) {
      this.showOtherDisease = true;
      this.profileForm.addControl('customDisease', new FormControl('', [Validators.required]));
    } else {
      this.showOtherDisease = false;
      if (this.profileForm.get('customDisease')) {
        this.profileForm.removeControl('customDisease');
      }
    }
  }
  clickLanguage() {
    const selectedLanguage = this.profileForm.value.language;
    if (selectedLanguage === 6) {
      this.showPreferredLanguages = true;
      this.profileForm.addControl('customLanguage', new FormControl('', [Validators.required]));
    } else {
      this.showPreferredLanguages = false;
      if (this.profileForm.get('customLanguage')) {
        this.profileForm.removeControl('customLanguage');
      }
    }
  }

  changeFrontFile(event: any, type?) {
    this.isLoading = true;
    this.userID = this.profileService.id;
    let object;
    if (event.target && event.target.files && event.target.files[0]) {
      object = { file: event.target.files[0], url: this.dataurl };
    }
    const file = object.file;
    const sd: any = new FormData();
    sd.append('Content-Type', file.type);
    sd.append('file', file);
    this.profileService.uploadFile(sd, this.userID).subscribe((res: any) => {
      this.isLoading = false;
      this.frontImageURl = res.url;
    }, err => {
      this.toastrService.danger(err.error.errorMessage ? err.error.errorMessage : 'Image upload failed', 'Error');
    });
  }

  changeBackFile(event: any, type?) {
    this.isLoading = true;
    this.userID = this.profileService.id;
    let object;
    if (event.target && event.target.files && event.target.files[0]) {
      object = { file: event.target.files[0], url: this.dataurl };
    }
    const file = object.file;
    const sd: any = new FormData();
    sd.append('Content-Type', file.type);
    sd.append('file', file);
    this.profileService.uploadFile(sd, this.userID).subscribe((res: any) => {
      this.isLoading = false;
      this.backImageURL = res.url;
    }, err => {
      this.toastrService.danger(err.error.errorMessage ? err.error.errorMessage : 'Image upload failed', 'Error');
    });
  }

  changeProfile(event: any) {
    this.isLoading = true;
    this.userID = this.profileService.id;
    let object;
    if (event.target && event.target.files && event.target.files[0]) {
      object = { file: event.target.files[0], url: this.dataurl };
    }
    const file = object.file;
    const sd: any = new FormData();
    sd.append('Content-Type', file.type);
    sd.append('file', file);
    this.profileService.uploadFile(sd, this.userID).subscribe((res: any) => {
      this.isLoading = false;
      this.imageURL = res.url;
      this.profileSave();
    }, err => {
      this.toastrService.danger(err.error.errorMessage ? err.error.errorMessage : 'Image upload failed', 'Error');
    });
  }
  readURL(event: any): void {
    this.profilePictureEvent = event;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageURL = reader.result;
      reader.readAsDataURL(file);
    }
  }
  getRecord(event) {
    this.devices = JSON.stringify(event);
  }

  getSurvey(event) {
    this.surveys = JSON.stringify(event);
    console.log('event', event);

  }
}
