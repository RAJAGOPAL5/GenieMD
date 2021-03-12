import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {of as observableOf,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  clinicData: any;
  constructor(private http: HttpClient) { }

  find(payload: { clinicID: string; name: string; providerID: string; userID: string; }) {
    return this.http.post(`Clinics/PatientList`, payload);
  }

  findById(payload: { userID: any; clinicID: any; patientID: any; }): Observable<any> {
    return this.http.get(`Clinics/ClinicPatient/${payload.userID}/${payload.clinicID}/${payload.patientID}`).pipe(catchError(error => {
      return observableOf(null);
    }));
  }

  deleteCareGiver(payload){
    return this.http.post(`DependentResources/DeleteCareGiver`,payload)
  }

}