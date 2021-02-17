import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private clinicService: ClinicService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log(this.clinicService.config);
    this.route.queryParams.subscribe(res => {
      console.log('res', res);
      this.clinicID = res.clinicID || '1000202';
      if (this.clinicID) {
        localStorage.setItem('nurselineClinicID', this.clinicID);
        // this.getClinic();
      }
    });
  }

  // login() {
  //   this.spinner.show();
  //   this.authService.signInUser(this.user.email, this.user.password).subscribe((res: any) => {
  //     this.profileService.getUser(res.userID).subscribe((profile: Profile) => {

  //       if (profile.providerStatus !== 'P') {
  //         this.authService.userInfo = { userID: res.userID };
  //         localStorage.setItem('nurselineCurrentUserID', res.userID);
  //         localStorage.setItem('nurselineUserEmail', this.user.email);
  //       } else {
  //         console.log('Login failed');
  //         this.spinner.hide();
  //         this.toastrService.warning('Sorry, You don\'t have access to this portal');
  //       }
  //     });
  //   }, (err) => {
  //     console.log(err, 'err');
  //     this.toastrService.error('Login failed. Check your credentials and try again.');
  //     this.spinner.hide();
  //   });
  // }
  // getClinic() {
  //   const payload = {
  //     userID: this.authService.getUserId(),
  //     clinicID: this.clinicID
  //   };
  //   this.clinicService.getClinic(payload).subscribe((clinic: Clinic) => {
  //     this.clinicConfig = JSON.parse(clinic.clinicConfig);
  //     this.title = this.clinicConfig.tagLine ? this.clinicConfig.tagLine : 'What brings you in today';
  //     this.clinicLogo = this.clinicConfig.config ? this.clinicConfig.config.logo : this.clinicConfig.logo;
  //     this.dataService.titleChange(this.title);
  //     if (this.clinicConfig.backgroundIcon) {
  //       const idName = document.getElementById('backgroundImage');
  //       idName.style.background = `url(${this.clinicConfig.backgroundIcon}) no-repeat center center`;
  //       idName.style.backgroundSize = 'cover';
  //     }
  //     if (this.clinicConfig.profileIcon) {
  //       this.tabIcon = document.getElementById('tabIcon');
  //       this.tabIcon.href = this.clinicConfig.profileIcon;
  //     }
  //   });
  // }


}
