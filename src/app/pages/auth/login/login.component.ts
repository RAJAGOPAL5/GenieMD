import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { ClinicService } from 'src/app/shared/services/clinic.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  // version: string = environment.version
  clinicID: any;
  clinicObject: any;
  tabIcon: any;
  clinicConfig: any;
  title: any;
  userID: any;
  cliniConfig:any;
  clinicConfigLog:any;
  constructor(
    private authService: AuthService, private router: Router,
    private route: ActivatedRoute, private profileService: ProfileService,
    private clinicService: ClinicService, private spinner: NgxSpinnerService, ) { }

  ngOnInit(): void {

    this.cliniConfig = this.clinicService.clinic;   
    this.clinicConfigLog  = JSON.parse(this.cliniConfig.clinicConfig)
    console.log('sezhian',this.clinicConfigLog)




    console.log(this.clinicService.config);
    this.route.queryParams.subscribe(res => {
      console.log('res', res);
      this.clinicID = res.clinicID || '1000202';
      this.userID = res.userID;
      if (this.clinicID) {
        localStorage.setItem('rpmClinicID', this.clinicID);
        // this.getClinic();
      }
    });
  }

  login() {
    this.spinner.show();
    this.authService.signInUser(this.user.email, this.user.password).subscribe((res: any) => {
      this.spinner.hide();
      this.profileService.getUser(res.userID).subscribe((profile: any) => {

        if (profile.providerStatus !== 'P') {
          this.authService.userInfo = { userID: res.userID };
          this.userID = res.userID;
          localStorage.setItem('rpmUserId', res.userID);
          localStorage.setItem('rpmUserEmail', this.user.email);
          if (this.user.email && this.user.password) {
            this.router.navigate([`dashboard/${this.clinicID}/${this.userID}`]);
          }
        } else {
          console.log('Login failed');
          this.spinner.hide();
          // this.toastrService.warning('Sorry, You don\'t have access to this portal');
        }
      });
    }, (err) => {
      console.log(err, 'err');
      this.spinner.hide();
      // this.toastrService.error('Login failed. Check your credentials and try again.');
    });

  }
  ForgetPassword() {
    this.router.navigate([`${this.clinicID}/forgetPassword`]);
  }

}
