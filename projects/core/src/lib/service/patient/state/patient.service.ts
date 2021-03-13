import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { PatientStore } from './patient.store';

@Injectable({ providedIn: 'root' })
export class PatientService {

  constructor(private patientStore: PatientStore, private http: HttpClient) {
  }
  async find(payload: { clinicId: string; name: string;providerID: string; userID: string;}){
    try {
      this.patientStore.setLoading(true);
      await this.http.post('Clinics/PatientList/', payload)
      .pipe(
        tap((data: any) => {
          console.log('find result:', data);
          this.patientStore.update({
            users: data.clinicPatientList,
          })
        })
      ).toPromise();
    } catch (error) {
      this.patientStore.setError(error);
    } finally {
      this.patientStore.setLoading(false);
    }
  }
    // find(payload: { clinicID: string; name: string; providerID: string; userID: string; }) {
    //   return this.http.post(`Clinics/PatientList`, payload);
   // }
    
  async findById(payload: { userID: any; clinicID: any; patientID: any; }){
    try{
      this.patientStore.setLoading(true);
      await this.http.get(`Clinics/ClinicPatient/${payload.userID}/${payload.clinicID}/${payload.patientID}`)
      .pipe(
        tap((data: any) => {
          console.log('findById result', data);
          this.patientStore.update({
            patientInfo: data,
          })
        })
      ).toPromise();
    } catch (error){
      this.patientStore.setError(error);
    } finally {
      this.patientStore.setLoading(false);
    }
  }
  // findById(payload: { userID: any; clinicID: any; patientID: any; }) {
  //   return this.http.get(`Clinics/ClinicPatient/${payload.userID}/${payload.clinicID}/${payload.patientID}`);
  // }

  async deleteCareGiver(payload){
    try{
      this.patientStore.setLoading(true);
      await this.http.post(`DependentResources/DeleteCareGiver`, payload).toPromise();
    } catch (error){
      this.patientStore.setError(error);
    }finally {
      this.patientStore.setLoading(false)
    }
  }
}