import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';

interface ViewModal {
  username?: string;
  password?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  model: ViewModal = {username: '', password: ''};
  logo: string;
  constructor(
    private clinicService: ClinicService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    console.log(this.clinicService.config);
  }

  submit() {
    this.isLoading = true;
    const username = this.model.username;
    const password = this.model.password;
    const result$ = this.authService.logIn(username, password)
    .subscribe(result => {
      this.route.navigate(['/patients']);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }
}
