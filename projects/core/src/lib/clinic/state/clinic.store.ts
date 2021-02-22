import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ClinicState {
   key: string;
}

export function createInitialState(): ClinicState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'clinic' })
export class ClinicStore extends Store<ClinicState> {

  constructor() {
    super(createInitialState());
  }

}
