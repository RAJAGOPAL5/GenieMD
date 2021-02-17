import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  userInfo: any;
  constructor(private http: HttpClient, private router: Router) { 
    
}

signInUser(email: string, password: string) {
  this.user = {
    email,
    password
  };
  return this.http.post('Email/SignIn/', this.user);
}
signUp(payload:any) {
  return this.http.put('Email/SignUp/', payload);
}


}
