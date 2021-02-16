import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
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
  constructor(private authService: AuthService,
    private route: ActivatedRoute,private profileService: ProfileService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      console.log('res', res);
      this.clinicID = res.clinicID || '1000202';
      if (this.clinicID) {
        localStorage.setItem('rpmClinicID', this.clinicID);
        // this.getClinic();
      }
    });
  }

  login() {
    // this.spinner.show();
    this.authService.signInUser(this.user.email, this.user.password).subscribe((res: any) => {
      this.profileService.getUser(res.userID).subscribe((profile: any) => {

        if (profile.providerStatus !== 'P') {
          this.authService.userInfo = { userID: res.userID };
          localStorage.setItem('rpmUserId', res.userID);
          localStorage.setItem('rpmUserEmail', this.user.email);
        } else {
          console.log('Login failed');
          // this.spinner.hide();
          // this.toastrService.warning('Sorry, You don\'t have access to this portal');
        }
      });
    }, (err) => {
      console.log(err, 'err');
      // this.toastrService.error('Login failed. Check your credentials and try again.');
      // this.spinner.hide();
    });
  }

}
