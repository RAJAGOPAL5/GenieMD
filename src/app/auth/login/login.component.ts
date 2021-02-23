import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { environment } from 'src/environments/environment.prod';

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
  version: string = environment.version;
  isLoading = false;
  model: ViewModal = {username: '', password: ''};
  logo: string;
  title: string;
  constructor(
    private clinicService: ClinicService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
    console.log(this.clinicService.config);
  }

  submit() {
    this.isLoading = true;
    const username = this.model.username;
    const password = this.model.password;
    const result$ = this.authService.logIn(username, password)
    .subscribe(result => {
      this.router.navigate([this.clinicService.id ,result.userID,'patients']);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
    });
  }
}
