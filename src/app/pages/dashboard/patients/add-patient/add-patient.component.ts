import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { Profile } from 'src/app/shared/models/profile.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClinicService } from 'src/app/shared/services/clinic.service';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  addressType = 1;
  registerForm: FormGroup;
  registerSubmit: boolean;
  enable: boolean;
  profile: Profile;
  sendEmail: any;
  emailJson: any;
  appLink: any;

  @ViewChild('birthDate', { static: false }) birthDate: any;

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth() + 1;
  currentDay = this.currentDate.getDate();
  states: any[] = [];
  languages: any[] = [];
  morbidityDisease: any[] = [];
  userID: any;
  clinicID: string;

  constructor(
    private clinicService: ClinicService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private activeModal: NgbActiveModal,private spinner: NgxSpinnerService,
              private toaster: ToastrService, private authService:AuthService, private profileService :ProfileService, private http: HttpClient) { }

  ngOnInit(): void {   
    this.createForm();
    this.states = [{ name: 'Alabama', abbreviation: 'AL' }, { name: 'Alaska', abbreviation: 'AK' }, { name: 'Arizona', abbreviation: 'AZ' }, { name: 'Arkansas', abbreviation: 'AR' }, { name: 'California', abbreviation: 'CA' }, { name: 'Colorado', abbreviation: 'CO' }, { name: 'Connecticut', abbreviation: 'CT' }, { name: 'District Of Columbia', abbreviation: 'DC' }, { name: 'Delaware', abbreviation: 'DE' }, { name: 'Florida', abbreviation: 'FL' }, { name: 'Georgia', abbreviation: 'GA' }, { name: 'Hawaii', abbreviation: 'HI' }, { name: 'Idaho', abbreviation: 'ID' }, { name: 'Illinois', abbreviation: 'IL' }, { name: 'Indiana', abbreviation: 'IN' }, { name: 'Iowa', abbreviation: 'IA' }, { name: 'Kansas', abbreviation: 'KS' }, { name: 'Kentucky', abbreviation: 'KY' }, { name: 'Louisiana', abbreviation: 'LA' }, { name: 'Maine', abbreviation: 'ME' }, { name: 'Marshall Islands', abbreviation: 'MH' }, { name: 'Maryland', abbreviation: 'MD' }, { name: 'Massachusetts', abbreviation: 'MA' }, { name: 'Michigan', abbreviation: 'MI' }, { name: 'Minnesota', abbreviation: 'MN' }, { name: 'Mississippi', abbreviation: 'MS' }, { name: 'Missouri', abbreviation: 'MO' }, { name: 'Montana', abbreviation: 'MT' }, { name: 'Nebraska', abbreviation: 'NE' }, { name: 'Nevada', abbreviation: 'NV' }, { name: 'New Hampshire', abbreviation: 'NH' }, { name: 'New Jersey', abbreviation: 'NJ' }, { name: 'New Mexico', abbreviation: 'NM' }, { name: 'New York', abbreviation: 'NY' }, { name: 'North Carolina', abbreviation: 'NC' }, { name: 'North Dakota', abbreviation: 'ND' }, { name: 'Northern Mariana Islands', abbreviation: 'MP' }, { name: 'Ohio', abbreviation: 'OH' }, { name: 'Oklahoma', abbreviation: 'OK' }, { name: 'Oregon', abbreviation: 'OR' }, { name: 'Palau', abbreviation: 'PW' }, { name: 'Pennsylvania', abbreviation: 'PA' }, { name: 'Puerto Rico', abbreviation: 'PR' }, { name: 'Rhode Island', abbreviation: 'RI' }, { name: 'South Carolina', abbreviation: 'SC' }, { name: 'South Dakota', abbreviation: 'SD' }, { name: 'Tennessee', abbreviation: 'TN' }, { name: 'Texas', abbreviation: 'TX' }, { name: 'Utah', abbreviation: 'UT' }, { name: 'Vermont', abbreviation: 'VT' }, { name: 'Virgin Islands', abbreviation: 'VI' }, { name: 'Virginia', abbreviation: 'VA' }, { name: 'Washington', abbreviation: 'WA' }, { name: 'West Virginia', abbreviation: 'WV' }, { name: 'Wisconsin', abbreviation: 'WI' }, { name: 'Wyoming', abbreviation: 'WY' }
    ];
    this.languages = [{ name: 'English', id: 1 }, { name: 'Spanish', id: 2 }, { name: 'Chinese', id: 3 }, { name: 'Japanese', id: 4 }, { name: 'Russian', id: 5 }, { name: 'Portuguese', id: 6 }, { name: 'French', id: 7 }, { name: 'Italian', id: 8 }, { name: 'Arabic', id: 9 }, { name: 'German', id: 10 }, { name: 'Korean', id: 11 }];
    this.morbidityDisease = [{ name: 'Lung Disease', id: 1 }, { name: 'Heart Disease', id: 2 }];

  }

  changeType(type: any) {
    this.addressType = type;
  }
  get g() { return this.registerForm.controls; }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: 0,
      dob: [''],
      password: 'Temp1234',
      languageId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      handphone: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      // country: [this.clinicConfig.config.defaultCountry ? this.clinicConfig.config.defaultCountry : '', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      morbidity:['',]

    });
  }
  chooseDate() {
    this.birthDate.toggle();
  }
  closeModal() {
    this.activeModal.close();
  } 

  register() {
    this.spinner.show();
    this.registerSubmit = true;
    if (this.registerForm.invalid) {
      this.spinner.hide();
      return;
    }
    if (!this.userID) {
      this.registerForm.value.firstName = this.registerForm.value.firstName.trim();
      this.registerForm.value.lastName = this.registerForm.value.lastName.trim();
      this.registerForm.value.handphone = this.registerForm.value.handphone.replace(/[^\w\s]/gi, '');
      this.registerForm.value.handphone = this.registerForm.value.handphone.replace(/ +/g, '');

      const signUpPayload = {
        email: this.registerForm.value.email,
        // email: `${this.registerForm.value.firstName}-${this.registerForm.value.lastName}-${created}`,
        password: this.registerForm.value.password,
        appVersion: ''
      };
      this.authService.signUp(signUpPayload).subscribe((res: any) => {
        this.userID = res.userID;
        this.getProfile();
        // this.getClinicInfo();
      }, error => {
        this.spinner.hide();
        this.toaster.error(error.error.errorMessage);
      });
    } else {
      // this.getClinicInfo();
    }
  }


  getProfile() {
    this.profileService.getUser(this.userID).subscribe((res: any) => {
      this.profile = res;
      this.updateProfile();
    }, error => {
      // this.toastrService.error(error.error.errorMessage);
      this.spinner.hide();
      this.toaster.error(error.error.errorMessage);
    });
  }

  updateProfile() {
    let date = "";

    if (this.registerForm.value.dob && this.registerForm.value.dob !== "") {
      date = this.registerForm.value.dob.year + '-' + ('0' + (this.registerForm.value.dob.month)).slice(-2) + '-' + ('0' + this.registerForm.value.dob.day).slice(-2);

 }
    const registerPayload = {
      email: this.registerForm.value.email,
      // dob: this.setDOB(this.registerForm.value.dob),
      dob: date || '',
      birthdate: moment(this.registerForm.value.dob).valueOf(),
      cellNumber: this.registerForm.value.handphone ? this.registerForm.value.handphone : '',
      languageId: this.registerForm.value.languageId ? this.registerForm.value.languageId : '',
      state: this.registerForm.value.state ? this.registerForm.value.state : '',
      address: this.registerForm.value.address ? this.registerForm.value.address : '',
      city: this.registerForm.value.city ? this.registerForm.value.city : '',
      country: this.registerForm.value.country ? this.registerForm.value.country : '',
      zipCode: this.registerForm.value.zipCode ? this.registerForm.value.zipCode : '',
      // morbidity: this.registerForm.value.morbidity ? this.registerForm.value.morbidity : '',

      extraData: {
        clinicID: this.clinicService.id,
        clinicName: this.clinicService.config ? this.clinicService.config.name : this.clinicService.clinic.name,
        companyCode: '',
        dateofbirth: this.setDOB(this.registerForm.value.dob),
        governmentID: '',
        ms: '0',
        notifications: {
          email: true,
          push: true,
          sms: true
        },
        password: this.registerForm.value.password,
        phoneNumber: this.registerForm.value.handphone ? this.registerForm.value.handphone : '',
        planID: -1,
        planMemberCount: -1,
        planName: '',
        referralCode: ''
      },
      firstName: this.registerForm.value.firstName,
      gender: `${this.registerForm.value.gender}`,
      imageURL: '',
      lastName: this.registerForm.value.lastName,
      latitude: '0',
      locationTime: this.profile.locationTime ? this.profile.locationTime : '',
      longitude: '0',
      oemID: this.clinicService.clinic.oemID,
      passport: '',
      pregnant: '0',
      profileEmail: this.registerForm.value.email,
      providerStatus: 'P',
      screenName: this.registerForm.value.firstName + ' ' + this.registerForm.value.lastName,
      updateDirectEmail: true,
      userID: this.profile.userID ? this.profile.userID : this.userID,
    };
    this.profileService.updateProfile(registerPayload).subscribe((res: any) => {
      console.log('updatedprofle', res);
      const firstList = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        patientID: this.registerForm.value.email
      };
      this.addPatient();
      this.spinner.hide();                                         
      this.activeModal.close(firstList);

      // this.closeModal();
      // this.addPatient();
      // this.spinner.hide();
      this.toaster.success('Patient added Successfully');
      if (this.clinicService.config && this.clinicService.config.advancedSettings) {
        this.clinicService.config.advancedSettings.map((item:any) => { 
          if (item.key === "patientRegistration") {
            try {
              this.emailJson = item.value;
              this.sendEmail = JSON.parse(this.emailJson)
              return this.http.get(this.sendEmail.url.trim(''));
            } catch (e) {
              this.sendEmail = {};
            };
          }
        })
      }
     
      if (this.sendEmail.sendEmail && this.sendEmail.sendEmail === true) {
        this.mailPatient(this.sendEmail.url);
      }

    }, error => {
      this.spinner.hide();
      this.toaster.error(error.error.errorMessage);
    });
  }
 
  setDOB(dob:any) {
    if (dob.year && dob.month && dob.day) {
      return dob.year + '-' + dob.month + '-' + dob.day;
    } else {
      return '';
    }
  }

  mailPatient(appLink:any) {
    let bgColor = '#6699ff';
    const payload = {
      userID: this.profile.userID ? this.profile.userID : this.userID,
      emailList: [this.profile.email],
      body: `<body>
      <p style=\'font-family:helvetica; color: black; font-size: 18px;\'> Hi ${this.registerForm.value.firstName} ${this.registerForm.value.lastName},</p>
     <p style=\'font-family:helvetica; color: black; font-size: 18px;\'>For your reference, your username is <strong> ${this.profile.userName} </strong>
      and temporary password is <strong> ${this.registerForm.value.password} </strong> for logging in. Click the below button to download the app.</p>
      <p style=\'font-family:helvetica; margin-top: 80px;
      margin-bottom: 30px;     text-align: center;\'><a style=\'    display: block;
      width: 115px;
      height: 25px;
      background: ${bgColor};
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      text-decoration: none;'\
      href='${appLink}'>Download App </a></p>
         <p style=\'font-family:helvetica; font-size: 18px;\'>Thank you!</p>
         <p style=\'font-family:helvetica; font-size: 18px;\'>${this.clinicService.config ? this.clinicService.config.name : this.clinicService.config.name}</p>
         <div style=\'height: 100px;width: 100%;\'>
       <img  src='${this.clinicService.config.logo}' style=\'width: 140px;'\ />
  </div>
         </body>`,
      fromDisplayName: `NoReply@ ${this.clinicService.config ? this.clinicService.config.name : this.clinicService.clinic.name}`,
      subject: `Thanks for signing up!!!`
    };
    this.profileService.sendEmail(payload).subscribe(data => {
      this.toaster.success('Email Sent Successfully');
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toaster.error(error.error.errorMessage ? error.error.errorMessage : 'Something went wrong. Not able to send email');

    })
  }

  addPatient() {
    const payload = {
      clinicID:  this.clinicID,
      patientID: this.profile.userName,
      providerID: '',
      userID: this.profile.userID ? this.profile.userID : this.userID
    };
    this.profileService.addPatient(payload).subscribe(res => {
      console.log('add patient  service ',res)
    }, error => {
      this.toaster.error(error.error.errorMessage ? error.error.errorMessage : 'User not found');
    });
  }
  next(type: any) {
    if (this.registerForm.value.firstName === '' ||
      this.registerForm.value.lastName === '' ||
      this.registerForm.value.dob === '' ||
      this.registerForm.value.languageId === '' ||
      this.registerForm.value.email === '' ||
      this.registerForm.value.handphone === ''
      // this.registerForm.value.morbidity === ''
    ) {
      this.registerSubmit = true;
    } else {
      this.addressType = type;
      this.registerSubmit = false;
    }
  }
}
