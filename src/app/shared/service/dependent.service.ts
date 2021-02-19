import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DependentService {

  constructor(private http: HttpClient) { }

  find(payload: { userID: any; patientID: any; }) {
    return this.http.get(`DependentResources/CareGivers/${payload.userID}/${payload.patientID}`);
  }

  findById(payload: { name: string; userID: string; }) {
    return this.http.post(`DependentResources/CreateDependent`, payload);
  }
}
