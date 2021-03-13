import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ClinicStore, ClinicState } from './clinic.store';

@Injectable()
export class ClinicQuery extends Query<ClinicState> {
  clinic$ = this.select('clinic');
  clinicConfig$ = this.select('clinicConfig');
  constructor(protected store: ClinicStore) {
    super(store);
  }

}
