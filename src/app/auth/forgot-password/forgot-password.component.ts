import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  isLoading = false;
  position: 'top-right';
  logo: string;
  constructor( private authService: AuthService, private router: Router, private toastrService: NbToastrService, private clinicService : ClinicService) { }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
  }
  submit() {
    this.isLoading = true;
    this.authService.forget(this.email).subscribe(res => {
      this.isLoading = false;
      this.toastrService.show('Success', 'Email Sent');
      this.router.navigate(['auth/login']);
    }, error => {
      this.isLoading = false;
      this.toastrService.show('Error', 'Something Went Worng');
    });
  }
}
