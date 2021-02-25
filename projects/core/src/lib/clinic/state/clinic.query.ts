import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ClinicStore, ClinicState } from './clinic.store';

@Injectable({ providedIn: 'root' })
export class ClinicQuery extends Query<ClinicState> {

  constructor(protected store: ClinicStore) {
    super(store);
  }

}
