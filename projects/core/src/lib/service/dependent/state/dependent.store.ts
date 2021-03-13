import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DependentState {
  dependent?: any;
  dependentInfo?: any;
}

export function createInitialState(): DependentState {
  return {};
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dependent' })
export class DependentStore extends Store<DependentState> {

  constructor() {
    super(createInitialState());
  }

}
