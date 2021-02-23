import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ClinicStore } from './clinic.store';

@Injectable({ 
  providedIn: 'root' 
})
export class ClinicService {
  seTitle(title: any) {
    throw new Error('Method not implemented.');
  }
  clinic: any = {};
  private cliniConfig: any = {};
  constructor(private clinicStore: ClinicStore, private http: HttpClient) {
  }

  get config(): any {
    return this.cliniConfig;
  }

  get id() {
    return localStorage.getItem('clinicId');
  }

  find(id: string): any {
    return this.http.get<any>(`Clinics/${id || '1000202'}`)
    .pipe(
      map(project => {
        this.clinic = project;
        localStorage.setItem('clinicId', id);
        try {
          this.cliniConfig = JSON.parse(this.clinic.clinicConfig)
        } catch (error) {
          this.cliniConfig = {};
        }
        return project || {};
      })
    );
  }
}
