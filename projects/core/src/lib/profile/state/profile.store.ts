import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ProfileState {
   key: string;
}

export function createInitialState(): ProfileState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profile' })
export class ProfileStore extends Store<ProfileState> {

  constructor() {
    super(createInitialState());
  }

}
