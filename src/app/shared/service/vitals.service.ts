import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VitalsService {

  constructor(private http: HttpClient) { }
  getBloodPressure(userID: any, fromDate: any, toDate: any) {
    return this.http.get(`Vitals/List/${userID}/1/${fromDate}/${toDate}`)
  }
  getWeight(userID: any, fromDate: any, toDate: any) {
    return this.http.get(`Vitals/List/${userID}/6/${fromDate}/${toDate}`)
  }
}
