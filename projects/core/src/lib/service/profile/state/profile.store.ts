import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ProfileState {
profile?:any;
extraData?:any;
}

export function createInitialState(): ProfileState {
  return {
  
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profile' })
export class ProfileStore extends Store<ProfileState> {

  constructor() {
    super(createInitialState());
  }

}
