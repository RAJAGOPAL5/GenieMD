import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

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
  @ViewChild('birthDate', { static: false }) birthDate: any;

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.currentDate.getMonth() + 1;
  currentDay = this.currentDate.getDate();
  states: any[] = [];
  languages: any[] = [];
  morbidityDisease: any[] = [];
  userID: any;

  constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal,private spinner: NgxSpinnerService,
              private toaster: ToastrService) { }

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
      languageId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      handphone: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      // country: [this.clinicConfig.config.defaultCountry ? this.clinicConfig.config.defaultCountry : '', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      morbidity:['',Validators.required]

    });
  }
  chooseDate() {
    this.birthDate.toggle();
  }
  closeModal() {
    this.activeModal.close();
  }
  register(){
    this.spinner.show();
    this.registerSubmit = true;
    if (this.registerForm.invalid) {
      this.spinner.hide();
      return;
    }
    if (!this.userID) {
      const created = parseInt(moment().format('x'), 0);
      const signUpPayload = {
        email: `${this.registerForm.value.firstName}-${this.registerForm.value.lastName}-${created}`,
        password: 'Temp1234',
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
  getProfile(): any{
    this.profileService.getUser(this.userID).subscribe((res: any) => {
      this.profile = res;
      this.updateProfile();
    }, error => {
      // this.toastrService.error(error.error.errorMessage);
      this.spinner.hide();
      this.toaster.error(error.error.errorMessage);
    });
  }
  updateProfile(): any{
    const registerPayload = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      dob: this.setDOB(this.registerForm.value.dob),
    };
    this.profileService.updateProfile(registerPayload).subscribe((res: any) => {
      console.log('updatedprofle', res);
      this.spinner.hide();
      this.closeModal();
      // this.addPatient();
      // this.spinner.hide();
      this.toaster.success('Patient added Successfully');
      // this.router.navigate(['/protocol'],
      //   { queryParams: { clinicID: this.assessmentInfo.clinicID, assessment: this.assessmentInfo.name } });


    }, error => {
      this.spinner.hide();
      this.toaster.error(error.error.errorMessage);
    });
  }
  setDOB(dob): any{
    if (dob.year && dob.month && dob.day) {
      return dob.year + '-' + dob.month + '-' + dob.day;
    } else {
      return '';
    }
  }
  next(type: any) {
    if (this.registerForm.value.firstName === '' ||
      this.registerForm.value.lastName === '' ||
      this.registerForm.value.dob === '' ||
      this.registerForm.value.languageId === '' ||
      this.registerForm.value.email === '' ||
      this.registerForm.value.handphone === '' ||
      this.registerForm.value.state === ''
    ) {
      this.registerSubmit = true;
    } else {
      this.addressType = type;
      this.registerSubmit = false;
    }
  }
}
