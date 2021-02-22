import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { VitalsStore } from './vitals.store';

@Injectable({ providedIn: 'root' })
export class VitalsService {

  constructor(private vitalsStore: VitalsStore, private http: HttpClient) {
  }


}
