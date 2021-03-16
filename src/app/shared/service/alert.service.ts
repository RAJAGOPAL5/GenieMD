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
  getHeaders(userId?) {
    console.log(this.route, 'userid');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('token', '3c660a0a1b08448997fa382666217225');
    return httpHeaders;
  }

}
