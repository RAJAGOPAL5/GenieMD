import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { NbAuthService, NbRequestPasswordComponent, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends NbRequestPasswordComponent implements OnInit {
  user: any = {};
  // email = '';
  isLoading = false;
  position: 'top-right';
  logo: string;
  title: string;
  
  constructor(private clinicService: ClinicService, 
    private authService: AuthService,
    @Inject(NB_AUTH_OPTIONS)
    protected service: NbAuthService, 
    protected cd: ChangeDetectorRef, 
    protected router: Router,
    private toastrService: NbToastrService

    ) {
    super(service, {}, cd, router);  
  }
  

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
  }
  submit() {
    this.isLoading = true;
    this.authService.forget(this.user).subscribe(res => {
      this.isLoading = false;
      this.toastrService.show('Success', 'Email Sent');
      this.router.navigate(['auth/login']);
    }, error => {
      this.isLoading = false;
      this.toastrService.show('Error', 'Something Went Worng');
    });
  }
}
