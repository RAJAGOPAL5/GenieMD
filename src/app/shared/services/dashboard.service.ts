import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }
  getBloodPressure(fromDate,toDate){
    return this.http.get(`Vitals/List/bf91654af14f48ff9cc796dc9fe9fd8e/1/${fromDate}/${toDate}`)
  }
  getWeight(fromDate,toDate){
    return this.http.get(`Vitals/List/ca78e5be1b7c461eb9375e8a8f885c6a/6/${fromDate}/${toDate}`)

  }
}
