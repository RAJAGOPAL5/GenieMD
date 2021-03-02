import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreConfig } from '@datorama/akita';

export interface AuthState {
  RegistrationComplete?:string;
  userID?: string;
}

export function createInitialState(): AuthState {
  return {};
}

@Injectable()
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor(private http: HttpClient, private router: Router) {
    super(createInitialState());
  }

}
