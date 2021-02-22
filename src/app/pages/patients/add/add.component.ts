import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import * as moment from 'moment';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  profileForm: FormGroup;
  userID: any;
  profile: any;
  clinic: any;
  states: any[] = [];
  languages: any[] = [];
  morbidityDisease: any[] = [];

  // date:any;
  @ViewChild('birthDate', { static: false }) birthDate: any;


  constructor(private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService,
    private clinicService: ClinicService, private router: Router) { }

  ngOnInit(): void {
    this.states = [{ name: 'Alabama', abbreviation: 'AL' }, { name: 'Alaska', abbreviation: 'AK' }, { name: 'Arizona', abbreviation: 'AZ' }, { name: 'Arkansas', abbreviation: 'AR' }, { name: 'California', abbreviation: 'CA' }, { name: 'Colorado', abbreviation: 'CO' }, { name: 'Connecticut', abbreviation: 'CT' }, { name: 'District Of Columbia', abbreviation: 'DC' }, { name: 'Delaware', abbreviation: 'DE' }, { name: 'Florida', abbreviation: 'FL' }, { name: 'Georgia', abbreviation: 'GA' }, { name: 'Hawaii', abbreviation: 'HI' }, { name: 'Idaho', abbreviation: 'ID' }, { name: 'Illinois', abbreviation: 'IL' }, { name: 'Indiana', abbreviation: 'IN' }, { name: 'Iowa', abbreviation: 'IA' }, { name: 'Kansas', abbreviation: 'KS' }, { name: 'Kentucky', abbreviation: 'KY' }, { name: 'Louisiana', abbreviation: 'LA' }, { name: 'Maine', abbreviation: 'ME' }, { name: 'Marshall Islands', abbreviation: 'MH' }, { name: 'Maryland', abbreviation: 'MD' }, { name: 'Massachusetts', abbreviation: 'MA' }, { name: 'Michigan', abbreviation: 'MI' }, { name: 'Minnesota', abbreviation: 'MN' }, { name: 'Mississippi', abbreviation: 'MS' }, { name: 'Missouri', abbreviation: 'MO' }, { name: 'Montana', abbreviation: 'MT' }, { name: 'Nebraska', abbreviation: 'NE' }, { name: 'Nevada', abbreviation: 'NV' }, { name: 'New Hampshire', abbreviation: 'NH' }, { name: 'New Jersey', abbreviation: 'NJ' }, { name: 'New Mexico', abbreviation: 'NM' }, { name: 'New York', abbreviation: 'NY' }, { name: 'North Carolina', abbreviation: 'NC' }, { name: 'North Dakota', abbreviation: 'ND' }, { name: 'Northern Mariana Islands', abbreviation: 'MP' }, { name: 'Ohio', abbreviation: 'OH' }, { name: 'Oklahoma', abbreviation: 'OK' }, { name: 'Oregon', abbreviation: 'OR' }, { name: 'Palau', abbreviation: 'PW' }, { name: 'Pennsylvania', abbreviation: 'PA' }, { name: 'Puerto Rico', abbreviation: 'PR' }, { name: 'Rhode Island', abbreviation: 'RI' }, { name: 'South Carolina', abbreviation: 'SC' }, { name: 'South Dakota', abbreviation: 'SD' }, { name: 'Tennessee', abbreviation: 'TN' }, { name: 'Texas', abbreviation: 'TX' }, { name: 'Utah', abbreviation: 'UT' }, { name: 'Vermont', abbreviation: 'VT' }, { name: 'Virgin Islands', abbreviation: 'VI' }, { name: 'Virginia', abbreviation: 'VA' }, { name: 'Washington', abbreviation: 'WA' }, { name: 'West Virginia', abbreviation: 'WV' }, { name: 'Wisconsin', abbreviation: 'WI' }, { name: 'Wyoming', abbreviation: 'WY' }
    ];
    this.languages = [{ name: 'English', id: 1 }, { name: 'Spanish', id: 2 }, { name: 'Chinese', id: 3 }, { name: 'Japanese', id: 4 }, { name: 'Russian', id: 5 }, { name: 'Portuguese', id: 6 }, { name: 'French', id: 7 }, { name: 'Italian', id: 8 }, { name: 'Arabic', id: 9 }, { name: 'German', id: 10 }, { name: 'Korean', id: 11 }];
    this.morbidityDisease = [{ name: 'Lung Disease', id: 1 }, { name: 'Heart Disease', id: 2 }];

    this.clinic = this.clinicService.clinic
    this.createForm();

    console.log('sesdfdsf', this.clinic)
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
      morbidity: ['',]
    });
  }
  onSubmit() {
    const signUpPayload = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
      appVersion: ''
    };
    this.authService.register(signUpPayload).subscribe((res: any) => {
      this.userID = res.userID;
      this.getProfile();
    })
  }

  getProfile() {
    this.profileService.getUser(this.userID).subscribe((res: any) => {
      this.profile = res;
      this.updateProfile();
    }, error => {
      // this.toastrService.error(error.error.errorMessage);
      // this.spinner.hide();
      // this.toaster.error(error.error.errorMessage);
    });
  }

  updateProfile() {
    let date = "";

    if (this.profileForm.value.dob && this.profileForm.value.dob !== "") {
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
        password: this.profileForm.value.password,
        phoneNumber: this.profileForm.value.handphone ? this.profileForm.value.handphone : '',
        planID: -1,
        planMemberCount: -1,
        planName: '',
        referralCode: ''
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
    };
    this.profileService.updateProfile(registerPayload).subscribe((res: any) => {
      console.log('updatedprofle', res);
      const firstList = {
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        patientID: this.profileForm.value.email
      };
      this.addPatient();

    }, error => {
    });
  }
  addPatient() {
    const payload = {
      clinicID: this.clinic.clinicID,
      patientID: this.profile.userName,
      providerID: '',
      userID: this.profile.userID ? this.profile.userID : this.userID
    };
    this.profileService.addPatient(payload).subscribe(res => {
      console.log('add patient  service ', res)
    }, error => {
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

  cancelPatient(){
    this.router.navigate(['patients']);

  }
}
