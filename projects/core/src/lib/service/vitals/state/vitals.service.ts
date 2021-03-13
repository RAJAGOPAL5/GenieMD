import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { VitalsStore } from './vitals.store';

@Injectable({ providedIn: 'root' })
export class VitalsService {

  constructor(private vitalsStore: VitalsStore, private http: HttpClient) {
  }
  async getData(userID: any, vitalType: any, fromDate: any, toDate: any) {
    try {
      this.vitalsStore.setLoading(true);
      await this.http.get(`Vitals/List/${userID}/${vitalType}/${fromDate}/${toDate}`)
      .pipe(
        tap((res: any) => {
          this.vitalsStore.update({
            userID: res.userID,
            fromDate: res.fromDate,
            toDate: res.toDate,
            vitalType: res.vitalType,
          });
        })
      ).toPromise();
    } catch (error) {
      this.vitalsStore.setError(error);
    }
  }

}
