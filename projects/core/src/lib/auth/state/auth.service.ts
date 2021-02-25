import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private authStore: AuthStore, private http: HttpClient, private router: Router) {
  }
  
  logIn(email: string, password: string) {
    const user = {
      email,
      password
    };
    return this.http.post('Email/SignIn/', user)
      .pipe(
        map((project: any) => {
          localStorage.setItem('userID', project.userID)
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
    const clinicId = localStorage.getItem('clinicId');
    this.router.navigate(['auth/login'], { queryParams: { clinicID: clinicId } });
    localStorage.clear();
  }
}
