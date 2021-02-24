import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { NbAuthService, NbRequestPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LanguageService } from 'src/app/shared/service/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends NbRequestPasswordComponent implements OnInit {
  user: any = {
    email: ''
  };
  isLoading = false;
  position: 'top-right';
  logo: string;
  title: string;
  
  constructor(private clinicService: ClinicService, 
    private authService: AuthService,
    private ls: LanguageService,
    private translate: TranslateService,
    @Inject(NB_AUTH_OPTIONS)
    protected service: NbAuthService, 
    protected cd: ChangeDetectorRef, 
    protected router: Router,
    private toastrService: NbToastrService

    ) {
    super(service, {}, cd, router);  
    translate.use('en');
    translate.setTranslation('en', this.ls.state);  
  }
  

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
  }
  submit() {
    this.isLoading = true;
    this.authService.forget(this.user.email).subscribe(res => {
      this.isLoading = false;
      this.toastrService.show('Success', 'Email Sent');
      this.router.navigate([this.clinicService.id,'auth']);
    }, error => {
      this.isLoading = false;
      this.toastrService.show('Error', 'Something Went Worng');
    });
  }
}
