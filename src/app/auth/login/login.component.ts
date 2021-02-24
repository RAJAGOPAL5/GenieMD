import { ChangeDetectorRef, Component, Inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { environment } from 'src/environments/environment.prod';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';


interface ViewModal {
  username?: string;
  password?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends NbLoginComponent implements OnInit  {
  version: string = environment.version;
  isLoading = false;
  model: ViewModal = {username: '', password: ''};
  logo: string;
  title: string;
  showMessages: any = {};

  constructor(private clinicService: ClinicService, 
    private authService: AuthService,
    @Inject(NB_AUTH_OPTIONS)
    protected service: NbAuthService, 
    protected cd: ChangeDetectorRef, 
    protected router: Router
    ) {
    super(service, {}, cd, router);  
  }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
  }
  
  

  login() {
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
