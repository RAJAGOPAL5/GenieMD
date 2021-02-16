import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  clinicData: any;
  constructor(private http: HttpClient) { }

  getPatients(payload: { clinicID: string; name: string; providerID: string; userID: string; }) {
    return this.http.post(`Clinics/PatientList`, payload);
  }
}