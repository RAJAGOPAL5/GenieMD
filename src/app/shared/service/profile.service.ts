import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  profile: any;
  extraData: any;
  id: string;
  constructor(private http: HttpClient) {
  }

  setId(id: string) {
    this.id = id;
  }

  get(id: string) {
    return this.http.get(`Profile/${id}`)
    .pipe(
      tap(project => {
        this.profile = project;
        try {
          this.extraData = JSON.parse(this.profile.extraData);
        } catch (error) {
          this.extraData = {};
        }
      })
    );
  }

  sendEmail(payload) {
    return this.http.post(`system/SendEmail`, payload);
  }

  update(payload) {
    return this.http.post(`Profile/Update`, payload);
  }
  add(payload) {
    return this.http.post(`Clinics/AddPatient`, payload);
  }

}
