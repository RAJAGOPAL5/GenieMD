import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DependentState {
   key: string;
}

export function createInitialState(): DependentState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dependent' })
export class DependentStore extends Store<DependentState> {

  constructor() {
    super(createInitialState());
  }

}
