import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PatientStore } from './patient.store';

@Injectable({ providedIn: 'root' })
export class PatientService {

  constructor(private patientStore: PatientStore, private http: HttpClient) {
  }
  find(payload: { clinicID: string; name: string; providerID: string; userID: string; }) {
    return this.http.post(`Clinics/PatientList`, payload);
  }

  findById(payload: { userID: any; clinicID: any; patientID: any; }) {
    return this.http.get(`Clinics/ClinicPatient/${payload.userID}/${payload.clinicID}/${payload.patientID}`);
  }

}
