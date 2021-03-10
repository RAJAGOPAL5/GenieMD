import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import * as moment from 'moment';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { languages, states, morbidity, gender, vitals } from 'src/app/shared/constant/constant';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/service/language.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  profileForm: FormGroup;
  profileData: any;
  userID: any;
  profile: any;
  clinic: any;
  states: any[] = [];
  languages: any[] = [];
  morbidityID: any[] = [];
  toggleNgModel = false;
  actionName: any;
  isLoading = false;
  patientID: any;
  genderArr = gender;
  vitals: any[] = [];
  selectedItem: any;
  profileExtraData: any;
  policyHolderName = [{ name: 'Self', id: 0 }, { name: 'Spouse', id: 1 }, { name: 'Other', id: 2 }];
  mediType = [{ name: 'Private', id: 0 }, { name: 'Medicare', id: 1 }, { name: 'Medicare advantage', id: 2 }, { name: 'Tricase', id: 3 }];

  @ViewChild('birthDate', { static: false }) birthDate: any;
  constructor(
    private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService,
    private clinicService: ClinicService, private router: Router, private route: ActivatedRoute,
    private toastrService: NbToastrService, private patientsService: PatientsService, protected dialogRef: NbDialogRef<any>,
    private ls: LanguageService,
    private translate: TranslateService
    ) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
     }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic;
    if (!!this.patientID) {
      this.isLoading = true;
      this.getProfilePatch();
    }
    this.actionName = this.patientID ? 'Edit Patient' : 'Create Patient';
    this.states = states;
    this.morbidityID = morbidity;
    this.vitals = vitals;
    this.languages = languages;
    this.createForm();
  }
  getProfilePatch() {
    const patientPayload = {
      userID: this.profileService.id,
      clinicID: this.clinic.clinicID,
      patientID: this.patientID
    };
    this.patientsService.findById(patientPayload).subscribe((items: any) => {
      const clinicPatient = items;
      this.profileService.get(clinicPatient.userID).subscribe((res: any) => {
        this.profileData = res;
        console.log('this.profileData', this.profileData);
        try {
          this.profileExtraData = JSON.parse(this.profileData.extraData);
        } catch (error) {
          this.profileExtraData = this.profileData.extraData || {};
        }
        console.log('this.profileExtraData', this.profileExtraData);

        this.profileForm.patchValue({
          firstName: this.profileData.firstName,
          lastName: this.profileData.lastName,
          gender: this.profileData.gender,
          dob: new Date(this.profileData.dob),
          handphone: this.profileData.cellNumber,
          email: this.profileData.email,
          country: this.profileData.country,
          state: this.profileData.state,
          zipcode: this.profileData.zipCode,
          address: this.profileData.address,
          city: this.profileData.city,
          morbidity: this.profileData.morbidity,
          language: this.profileData.languageId,
          vitals: !!this.profileExtraData.vitals ? this.profileExtraData.vitals : []
        });
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
      handphone: ['', Validators.required],
      language: ['', Validators.required],
      email: ['', Validators.required],
      password: 'Temp1234',
      gender: 0,
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      morbidity: ['', ],
      monitored: ['', ],
      vitals: [[]],
      policyHolder: ['', Validators.required],
      holderName: ['', Validators.required],
      insuranceDob: ['', Validators.required],
      claimAddress: ['', Validators.required],
      insuranceCarrier: ['', Validators.required],
      medType: ['', Validators.required],
      policyNumber: ['', Validators.required],
      groupNumber: ['', Validators.required],
      plan: ['', Validators.required],  
    });
  }

  onSubmit() {
    // console.log(this.profileForm, this.selectedItem);
    let extraData = {};
    if (this.profileExtraData) {
      extraData = this.profileExtraData;
      extraData['dateofbirth'] = this.setDOB(this.profileForm.value.dob);
      extraData['phoneNumber'] = this.profileForm.value.handphone ? this.profileForm.value.handphone : '';
      extraData['vitals'] = this.profileForm.value.vitals;
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
        extraData: extraData,
        firstName: this.profileForm.value.firstName,
        gender: `${this.profileForm.value.gender}`,
        imageURL: '',
        lastName: this.profileForm.value.lastName,
        latitude: '0',
        locationTime: this.profileData.locationTime ? this.profileData.locationTime : '',
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
      this.profileService.update(registerPayload).subscribe((res: any) => {
        console.log('edit paitent', res);
        this.isLoading = false;
        this.toastrService.success('Patient Updated Successfully');
        this.dialogRef.close(true);
      }, error => {
        this.isLoading = false;
      });
    } else {
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
        this.toastrService.danger(error.error.errorMessage);
      });
    }

  }

  getProfile() {
    this.profileService.get(this.userID).subscribe((res: any) => {
      this.profile = res;
      this.updateProfile();
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage);
    });
  }

  updateProfile() {
    let date = '';
    if (this.profileForm.value.dob && this.profileForm.value.dob !== '') {
      date = moment(this.profileForm.value.dob).format('YYYY-MM-DD');
    }
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
        notifications: {
          email: true,
          push: true,
          sms: true
        },
        insurance: {
          policyHolder: this.profileForm.value.policyHolder,
          holderName: this.profileForm.value.holderName,
          insuranceDob: this.profileForm.value.insuranceDob,
          claimAddress: this.profileForm.value.claimAddress,
          insuranceCarrier: this.profileForm.value.insuranceCarrier,
          medType: this.profileForm.value.medType,
          policyNumber: this.profileForm.value.policyNumber,
          groupNumber: this.profileForm.value.groupNumber,
          plan:this.profileForm.value.plan
        },
        password: this.profileForm.value.password,
        phoneNumber: this.profileForm.value.handphone ? this.profileForm.value.handphone : '',
        planID: -1,
        planMemberCount: -1,
        planName: '',
        referralCode: '',
        vitals: this.profileForm.value.vitals
      },
      firstName: this.profileForm.value.firstName,
      gender: `${this.profileForm.value.gender}`,
      imageURL: '',
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
      console.log('updatedprofle', res);
      const firstList = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        patientID: this.profileForm.value.email
      };
      this.addPatient();
      this.isLoading = false;
      this.toastrService.success('Patient added Successfully');
      // this.router.navigate(['patients']);
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage);
    });
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
      this.toastrService.danger(error.error.errorMessage);
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

  cancelPatient() {
    this.dialogRef.close();
  }
}
