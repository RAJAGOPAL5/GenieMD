import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  id: string;
  clinic: any = {};
  private cliniConfig: any = {};
  constructor(
    private http: HttpClient
  ) { }

  get config(): any {
    return this.cliniConfig;
  }
  getVitals() {
    const extendedSettings = this.config.extendedSettings?.vitals;
    let vitalList = [];
    if (!!extendedSettings) {
      try {
        vitalList = JSON.parse(extendedSettings);
      } catch (error) {
        vitalList = [];
      }
    }
    return vitalList;
  }

  getLanguageList() {
    return this.http.get(`system/LanguageCodes`);
  }

  find(id: string): any {
    return this.http.get<any>(`Clinics/${id}`)
      .pipe(
        map(project => {
          this.clinic = project;
          this.id = id;
          try {
            this.cliniConfig = JSON.parse(this.clinic.clinicConfig);
          } catch (error) {
            this.cliniConfig = {};
          }
          return project || {};
        })
      );
  }
  searchPatients(payload) {
    return this.http.post(`Clinics/SearchPatients`, payload);
  }

  getProvidersList(payload) {
    return this.http.post(`HealthcareProvider/NetworkHcp/List`, payload);
  }

  getPhysicianCategoryList(payload) {
    return this.http.get(`HealthcareProvider/NetworkCategory/List/${payload}`);
  }

  getProviderList(clinicID) {
    return this.http.get(`Clinics/Providers/List/${clinicID}`);
   }

}
