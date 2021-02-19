import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PatientStore } from './patient.store';

@Injectable({ providedIn: 'root' })
export class PatientService {

  constructor(private patientStore: PatientStore, private http: HttpClient) {
  }


}
