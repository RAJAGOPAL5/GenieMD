import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VitalsService {

  constructor(private http: HttpClient) { }
  
  getData(userID: any, fromDate: any, toDate: any, vitalType: any) {
    return this.http.get(`Vitals/List/${userID}/${vitalType}/${fromDate}/${toDate}`);
  }
}
