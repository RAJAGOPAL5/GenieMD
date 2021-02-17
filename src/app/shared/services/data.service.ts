import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private patientSelected = new BehaviorSubject(false);
  isPatientSelected = this.patientSelected.asObservable();

  updateSelectedStatus(data: any) {
    this.patientSelected.next(data);
  }

  constructor(private http: HttpClient) { }
}
