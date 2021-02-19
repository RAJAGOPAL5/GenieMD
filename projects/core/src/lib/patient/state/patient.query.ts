import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PatientStore, PatientState } from './patient.store';

@Injectable({ providedIn: 'root' })
export class PatientQuery extends Query<PatientState> {

  constructor(protected store: PatientStore) {
    super(store);
  }

}
