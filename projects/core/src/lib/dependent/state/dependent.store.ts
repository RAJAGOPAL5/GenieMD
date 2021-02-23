import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DependentState {
  userID: any; 
  patientID: any;
}

export function createInitialState(): DependentState {
  return {
    userID: '',
    patientID: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dependent' })
export class DependentStore extends Store<DependentState> {

  constructor() {
    super(createInitialState());
  }

}
