import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface VitalsState {
   key: string;
}

export function createInitialState(): VitalsState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'vitals' })
export class VitalsStore extends Store<VitalsState> {

  constructor() {
    super(createInitialState());
  }

}
