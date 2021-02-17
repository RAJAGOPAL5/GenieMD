import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getUser(id: string) {
    return this.http.get(`Profile/${id}`);
  }

  updateProfile(payload:any) {
    return this.http.post(`Profile/Update`, payload);
  }

  addPatient(payload:any) {
    return this.http.post(`Clinics/AddPatient`, payload);
  }
  sendEmail(payload:any) {
    return this.http.post(`system/SendEmail`, payload);
  }
}
