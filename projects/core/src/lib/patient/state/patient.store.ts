import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface PatientState {
   key: string;
}

export function createInitialState(): PatientState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'patient' })
export class PatientStore extends Store<PatientState> {

  constructor() {
    super(createInitialState());
  }

}
