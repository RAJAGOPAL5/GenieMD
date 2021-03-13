import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { DependentStore, DependentState } from './dependent.store';

@Injectable({ providedIn: 'root' })
export class DependentQuery extends Query<DependentState> {
  dependent$ = this.select('dependent');
  dependentInfoById$ = this.select('dependentInfo');
  constructor(protected store: DependentStore) {
    super(store);
  }

}
