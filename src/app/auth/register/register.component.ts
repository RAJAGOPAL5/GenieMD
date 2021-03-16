import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthService, NbRegisterComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { LanguageService } from 'src/app/shared/service/language.service';
import { TranslateService } from '@ngx-translate/core';


interface ViewModal {
  firstName?: string;
  email?: string;
  password?: any;
  confirmPassword?: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {
  version: string = environment.version;
  logo: any;
  title: any;
  isLoading = false;
  model: ViewModal = { firstName: '', email: '', password: '', confirmPassword: '' };
  userID: any;
  profile: any;
  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  profileForm: FormGroup;
  clinic: any;

  constructor(
    private clinicService: ClinicService,
    private authService: AuthService,
    private toastrService: NbToastrService,
    @Inject(NB_AUTH_OPTIONS)
    protected service: NbAuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private translate: TranslateService,
  ) {
    super(service, {}, cd, router);
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
    this.clinic = this.clinicService.clinic;
    this.createForm();
  }

  register() {
    const signUpPayload = {
      email: this.model.email,
      password: this.model.password,
      appVersion: ''
    };
    this.authService.register(signUpPayload).subscribe((res: any) => {
      this.userID = res.userID;
      this.getProfile();
      this.toastrService.success('Registered Successfully', 'Success');
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage, 'Error');
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  createForm() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dob: ['', Validators.required],
      gender: 0,
      address: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
    });
  }

  saveProfile() {
    this.submitted = true;
    let date = '';
    if (this.profileForm.value.dob && this.profileForm.value.dob !== '') {
      date = moment(this.profileForm.value.dob).format('YYYY-MM-DD');
    }
    const registerPayload = {
      email: '',
      dob: date || '',
      birthdate: moment(this.profileForm.value.dob).valueOf(),
      cellNumber: this.profileForm.value.phoneNumber,
      languageId: '',
      state: this.profileForm.value.state ? this.profileForm.value.state : '',
      address: this.profileForm.value.address ? this.profileForm.value.address : '',
      city: this.profileForm.value.city ? this.profileForm.value.city : '',
      country: this.profileForm.value.country ? this.profileForm.value.country : '',
      zipCode: this.profileForm.value.zipcode ? this.profileForm.value.zipcode : '',
      extraData: {
        clinicID: this.clinic.clinicID,
        clinicName: this.clinicService.config ? this.clinicService.config.name : this.clinicService.clinic.name,
        companyCode: '',
        dateofbirth: this.profileForm.value.dob,
        governmentID: '',
        ms: '0',
        notifications: {
          email: true,
          push: true,
          sms: true
        },
        password: '',
        phoneNumber: this.profileForm.value.phoneNumber,
        planID: -1,
        planMemberCount: -1,
        planName: '',
        referralCode: ''
      },
      userID: this.userID,
    };
    this.profileService.update(registerPayload).subscribe((res: any) => {
      this.isLoading = false;
      this.toastrService.success('Profile Updated Successfully', 'Success');
      this.router.navigate([this.clinicService.id, 'auth']);
    }, error => {
      this.isLoading = false;
    });
  }

  getProfile() {
    this.profileService.get(this.userID).subscribe((res: any) => {
      this.profile = res;
      // this.updateProfile();
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage, 'Error');
    });
  }
}
