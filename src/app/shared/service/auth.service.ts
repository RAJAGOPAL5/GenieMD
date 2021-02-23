import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ClinicService } from './clinic.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  userInfo: any;
  constructor(private http: HttpClient, private router: Router, private clinicService: ClinicService) { }

  logIn(email: string, password: string) {
    this.user = {
      email,
      password
    };
    return this.http.post('Email/SignIn/', this.user)
      .pipe(
        map((project: any) => {
          return project;
        })
      );
  }

  register(payload: any) {
    return this.http.put('Email/SignUp/', payload);
  }

  forget(email: string) {
    const param = {
      emailAddress: email,
      appName: ''
    };
    return this.http.post('Email/ResetPassword', param);
  }

  logout() {
    this.userInfo = undefined;
    const clinicId = this.clinicService.id;
    this.router.navigate(['auth/login'], { queryParams: { clinicID: clinicId } });
    localStorage.clear();
  }
}
