import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ClinicStore } from './clinic.store';

@Injectable({ providedIn: 'root' })
export class ClinicService {

  constructor(private clinicStore: ClinicStore, private http: HttpClient) {
  }


}
