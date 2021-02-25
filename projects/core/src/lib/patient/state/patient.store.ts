import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface PatientState {
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  clinicPatientID: number;
  patientID: string;
  clinicID: string;
  userID: string;
  providerID: string;
}

export function createInitialState(): PatientState {
  return {
  email: '',
  firstName: '',
  lastName: '',
  imageUrl: '',
  clinicPatientID: 0,
  patientID: '',
  clinicID: '',
  userID: '',
  providerID: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'patient' })
export class PatientStore extends Store<PatientState> {

  constructor() {
    super(createInitialState());
  }

}
