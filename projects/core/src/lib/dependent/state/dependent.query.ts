import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { DependentStore, DependentState } from './dependent.store';

@Injectable({ providedIn: 'root' })
export class DependentQuery extends Query<DependentState> {

  constructor(protected store: DependentStore) {
    super(store);
  }

}
