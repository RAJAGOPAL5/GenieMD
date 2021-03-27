import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface VitalsState {
  userID: any;
  fromDate: any;
  toDate: any;
  vitalType: any;
}

export function createVitalState(): VitalsState {
  return {
    userID: '',
    fromDate: '',
    toDate: '',
    vitalType: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'vitals' })
export class VitalsStore extends Store<VitalsState> {

  constructor() {
    super(createVitalState());
  }

}
