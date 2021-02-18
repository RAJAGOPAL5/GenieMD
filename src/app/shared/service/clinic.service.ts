import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  seTitle(title: any) {
    throw new Error('Method not implemented.');
  }
  clinic: any = {};
  id: string = '';
  private cliniConfig: any = {};
  constructor(
    private http: HttpClient
  ) { }

  get config(): any {
    return this.cliniConfig;
  }

  find(id: string): any {
    return this.http.get<any>(`Clinics/${id}`)
    .pipe(
      map(project => {
        this.clinic = project;
        this.id = id;
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
