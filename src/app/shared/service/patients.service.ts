import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  clinicData: any;
  constructor(private http: HttpClient) { }

  find(payload: { clinicID: string; name: string; providerID: string; userID: string; }) {
    return this.http.post(`Clinics/PatientList`, payload);
  }
  findById(payload: { userID: any; clinicID: any; patientID: any; }) {
    return this.http.get(`Clinics/ClinicPatient/${payload.userID}/${payload.clinicID}/${payload.patientID}`);
  }
}