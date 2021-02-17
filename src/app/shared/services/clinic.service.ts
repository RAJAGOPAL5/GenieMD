import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(
    private http: HttpClient
  ) { }

  get(id: string) {
    return this.http.get(`Clinics/${id}`).toPromise();
  }
}
