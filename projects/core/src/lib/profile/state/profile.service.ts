import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProfileStore } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  profile: any;
  extraData: any;
  constructor(private profileStore: ProfileStore, private http: HttpClient) {
  }

  get id() {
    return this.profile.userID
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
