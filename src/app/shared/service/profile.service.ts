import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  getUser(id: string) {
    return this.http.get(`Profile/${id}`);
  }

  sendEmail(payload) {
    return this.http.post(`system/SendEmail`, payload);
  }
  updateProfile(payload) {
    return this.http.post(`Profile/Update`, payload);
  }

  addPatient(payload) {
    return this.http.post(`Clinics/AddPatient`, payload);
  }
}
