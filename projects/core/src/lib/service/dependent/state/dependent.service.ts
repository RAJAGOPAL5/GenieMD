import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { DependentStore } from './dependent.store';

@Injectable({ providedIn: 'root' })
export class DependentService {

  constructor(private dependentStore: DependentStore, private http: HttpClient) {
  }
  async find(payload: { userID: any; patientID: any; }) {
    try {
      this.dependentStore.setLoading(true);
      await this.http.get(`DependentResources/CareGivers/${payload.userID}/${payload.patientID}`)
        .pipe(
          tap((dependents: any) => {
            console.log("dependent object::", dependents);
            this.dependentStore.update({
              dependent: dependents.list,
            })
          })
        ).toPromise();
    } catch (error) {
      this.dependentStore.setError(error);
    } finally {
      this.dependentStore.setLoading(false);
    }
  }

  async findById(payload: { name: string; userID: string; }) {
    try {
      this.dependentStore.setLoading(true);
      await this.http.post(`DependentResources/CreateDependent`, payload)
        .pipe(
          tap((dependentInfo: any) => {
            console.log("dependent Info::", dependentInfo);
            this.dependentStore.update({
              dependentInfo: dependentInfo
            })
          })
        ).toPromise();
    } catch (error) {
      this.dependentStore.setError(error);
    } finally {
      this.dependentStore.setLoading(false);
    }

  }

}
