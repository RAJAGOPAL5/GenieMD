import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  providerNPiID: string;
  profile: any;
  extraData: any;
  id: string;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute) {
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

  getPatientProfile(id) {
    return this.http.get(`Profile/${id}`);
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

  getProviderName(npiID) {
    return this.http.get(`User/GetUsername/${npiID}`);
  }

  getUserStart(payload) {
    return this.http.post(`Encounters/GetStats`, payload);
  }

  getAvailable(payload) {
    return this.http.post(`Appointments/RecurringCollection`, payload);
  }

  uploadFile(payLoad, userId) {
    return this.http.post('Files/UploadFile/' + userId, payLoad);
  }

  getDevices(): Observable<any> {
    return this.http.get(`Devices/SmartDevices/List`, { headers: this.getHeaders() });
  }

  getHeaders() {
    const userID = this.route.firstChild.firstChild.snapshot.params.userID;
    console.log('router', this.route);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('userID', userID);
    return httpHeaders;
  }

  getProtocol(data) {
    if (data.npiId === '0') {
      return this.http.get(`Protocol/Get/${data.userId}/${data.clinicId}`);
    } else {
      return this.http.get(`Protocol/GetProviderProtocols2/${data.userId}/${data.npiId}`);
    }
  }

  getAudits(data) {
    return this.http.get(`Audits/GetAudits/${data.userId}/${data.patientId}`);
  }

  // getProtocol(data) {
  //     return this.http.get(`Protocol/Get/${data.userId}/${data.clinicId}`);
  // }
}
