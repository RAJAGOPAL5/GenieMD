import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuditService {

  constructor( private http: HttpClient
    ) { }

  addAudits(auditPayload) {
    return this.http.post(`Audits/AddAudit`, auditPayload);
  }
  getAudits(data) {
    return this.http.get(`Audits/GetAudits/${data.userId}/${data.patientId}`);
  }
}
