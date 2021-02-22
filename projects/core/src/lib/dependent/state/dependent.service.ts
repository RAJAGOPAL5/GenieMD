import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DependentStore } from './dependent.store';

@Injectable({ providedIn: 'root' })
export class DependentService {

  constructor(private dependentStore: DependentStore, private http: HttpClient) {
  }


}
