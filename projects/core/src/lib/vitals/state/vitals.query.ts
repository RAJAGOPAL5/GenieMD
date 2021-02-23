import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { VitalsStore, VitalsState } from './vitals.store';

@Injectable({ providedIn: 'root' })
export class VitalsQuery extends Query<VitalsState> {

  constructor(protected store: VitalsStore) {
    super(store);
  }

}
