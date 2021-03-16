import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  get(payload: { clinicID: string; patientId: string; }): Observable<any> {
    return this.http.get(`Alerts/List/${payload.clinicID}/${payload.patientId}`, { headers: this.getHeaders() });
  }
  getAlertActions(patientId): Observable<any> {
    return this.http.get(`Alerts/AlertActionsForPatient/${patientId}`, { headers: this.getHeaders() });
  }
  getAlertActionsById(alertId): Observable<any> {
    return this.http.get(`Alerts/AlertActions/${alertId}`, { headers: this.getHeaders() });
  }
  addAlertAction(payload): Observable<any> {
    return this.http.post(`Alerts/AddAlertAction`, payload, { headers: this.getHeaders() });
  }
  getHeaders() {
    const userID = this.route.firstChild.firstChild.snapshot.params.userID;
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('token', userID);
    return httpHeaders;
  }

}
