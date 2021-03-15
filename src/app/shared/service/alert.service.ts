import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }

  find(payload: { clinicID: string; name: string; providerID: string; userID: string; }) {
    return this.http.post(`Clinics/PatientList`, payload);
  }
  get(payload: { clinicID: string; patientId: string; }): Observable<any> {
    return this.http.get(`Alerts/List/${payload.clinicID}/${payload.patientId}`);
  }

}
