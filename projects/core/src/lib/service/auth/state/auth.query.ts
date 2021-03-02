import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';

@Injectable()
export class AuthQuery extends Query<AuthState> {
  isLoggedIn$ = this.select('userID');
  constructor(protected store: AuthStore) {
    super(store);
  }

}
