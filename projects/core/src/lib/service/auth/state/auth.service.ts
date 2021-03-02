import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthService {
  constructor(private authStore: AuthStore, private http: HttpClient, private router: Router) {
  }

  async logIn(email: string, password: string) {
    try {
      this.authStore.setLoading(true);
      const payload = {
        email,
        password
      };
      await this.http.post('Email/SignIn/', payload)
        .pipe(
          tap((project: any) => {
            console.log('Login result:', project);
            this.authStore.update({
              userID: project.userID,
              RegistrationComplete: project.RegistrationComplete
            })
          })
        ).toPromise();
    } catch (error) {
      console.log('Login error', error.statusText)
      this.authStore.setError(error);
    }
  }

  async register(payload: any) {
    try {
      this.authStore.setLoading(true);
      await this.http.put('Email/SignUp/', payload).toPromise();
    } catch (error) {
      this.authStore.setError(error);
    } finally {
      this.authStore.setLoading(false);
    }
  }

  async forget(email: string) {
    try {
      this.authStore.setLoading(true);
      const payload = {
        emailAddress: email,
        appName: ''
      };
      await this.http.post('Email/ResetPassword', payload).toPromise();
      this.authStore.setLoading(false);
    } catch (error) {
      this.authStore.setError(error);
    } finally {
      this.authStore.setLoading(false);
    }
  }

  logout() {
    const clinicId = localStorage.getItem('clinicId');
    this.router.navigate(['auth/login'], { queryParams: { clinicID: clinicId } });
    localStorage.clear();
  }
}
