import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
   userID?:string;
   email?: string;
}

export function createInitialState(): AuthState {
  return {
    userID:'',
    email: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor(private http: HttpClient, private router: Router) {
    super(createInitialState());
  }

}
