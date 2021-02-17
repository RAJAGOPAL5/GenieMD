import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  clinic: any = {};
  _config: any = {};
  constructor(
    private http: HttpClient
  ) { }

  get config() {
    return this._config
  }

  find(id: string) {
    return this.http.get<any>(`Clinics/${id}`)
    .pipe(
      map(project => {
        this.clinic = project;
        try {
          this._config = JSON.parse(this.clinic.clinicConfig)
        } catch (error) {
          this._config = {};
        }
        return project || {};
      })
    );
  }
}
