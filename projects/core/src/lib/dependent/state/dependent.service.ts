import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DependentStore } from './dependent.store';

@Injectable({ providedIn: 'root' })
export class DependentService {

  constructor(private dependentStore: DependentStore, private http: HttpClient) {
  }
  find(payload: { userID: any; patientID: any; }) {
    return this.http.get(`DependentResources/CareGivers/${payload.userID}/${payload.patientID}`);
  }

  findById(payload: { name: string; userID: string; }) {
    return this.http.post(`DependentResources/CreateDependent`, payload);
  }

}
