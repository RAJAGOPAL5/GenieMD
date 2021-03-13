import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ClinicStore } from './clinic.store';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  cliniConfig: any;

  constructor(private clinicStore: ClinicStore, private http: HttpClient, private router: Router) {
  }
  async find(id: string) {
    try {
      this.clinicStore.setLoading(true);
      await this.http.get<any>(`Clinics/${id}`)
        .pipe(
          tap((project: any) => {
            try {
              this.cliniConfig = JSON.parse(project?.clinicConfig);
            } catch (error) {
              this.cliniConfig = {};
            }
            localStorage.setItem('clinicId', id);
            this.clinicStore.update({
              clinic: project,
              clinicConfig: this.cliniConfig
            });
          })
        ).toPromise();
    } catch (error) {
      console.log('Clinic Finding error:', error.statusText);
      this.clinicStore.setError(error);
    } finally {
      this.clinicStore.setLoading(false);
    }
  }
}
