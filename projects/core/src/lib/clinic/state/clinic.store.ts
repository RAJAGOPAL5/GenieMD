import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ClinicState {
   key: string;
   member: boolean;
   oemID: number;
   clinicID: string;
   clinicConfig: string;
   mainClinic: boolean;
   languageID: number;
}

export function createInitialState(): ClinicState {
  return {
    key: '',
    member: false,
    oemID: 0,
    clinicID: '',
    clinicConfig: '',
    mainClinic: false,
    languageID: 0,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'clinic' })
export class ClinicStore extends Store<ClinicState> {

  constructor() {
    super(createInitialState());
  }

}
