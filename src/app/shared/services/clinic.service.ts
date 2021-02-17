import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) { }

  getClinic(payload:any) {
    const clinicID = payload.clinicID;
    if (payload.userID && payload.userID !== '' && payload.userID !== null) {
      return this.http.get(`Clinics/${clinicID}/${payload.userID}`);
    } else {
      return this.http.get(`Clinics/${clinicID}`);
    }

  }
}
