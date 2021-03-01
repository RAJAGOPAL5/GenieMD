import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbRegisterComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

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
  logo: any;
  title: any;
  isLoading = false;
  model: ViewModal = { firstName: '', email: '', password: '', confirmPassword: '' };
  userID: any;
  profile: any;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  constructor(
    private clinicService: ClinicService,
    private authService: AuthService,
    private toastrService: NbToastrService,
    @Inject(NB_AUTH_OPTIONS)
    protected service: NbAuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private profileService: ProfileService
  ) {
    super(service, {}, cd, router);
    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.strategy = this.getConfigValue('forms.register.strategy');
  }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
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
      this.toastrService.success('Registered Successfully');
      this.router.navigate([this.clinicService.id,'auth']);
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage);
    });
  }

  getProfile() {
    this.profileService.get(this.userID).subscribe((res: any) => {
      this.profile = res;
      // this.updateProfile();
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage);
    });
  }

}
