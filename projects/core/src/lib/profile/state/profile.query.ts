import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ProfileStore, ProfileState } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileQuery extends Query<ProfileState> {

  constructor(protected store: ProfileStore) {
    super(store);
  }

}
