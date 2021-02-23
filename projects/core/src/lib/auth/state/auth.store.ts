import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
   key: string;
   userID?:string;
   email: string;
   password?: string;
}

export function createInitialState(): AuthState {
  return {
    key: '',
    userID:'',
    email: '',
    password: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor(private http: HttpClient, private router: Router) {
    super(createInitialState());
  }

}
