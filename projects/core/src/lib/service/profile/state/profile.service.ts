import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ProfileStore } from './profile.store';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  profile: any;
  extraData: any;
  constructor(private profileStore: ProfileStore, private http: HttpClient) {
  }

  get id() {
    return this.profile.userID;
  }

  async get(id: string) {
    try {
      this.profileStore.setLoading(true);
      await this.http.get(`Profile/${id}`)
        .pipe(
          tap(project => {
            this.profile = project;
            try {
              this.extraData = JSON.parse(this.profile.extraData);
            } catch (error) {
              this.extraData = {};
            }
            this.profileStore.update({
              profile: project,
              extraData: this.extraData
            })
          })
        ).toPromise();
    } catch (error) {
      this.profileStore.setError(error);
    } finally {
      this.profileStore.setLoading(false);
    }
  }

  async sendEmail(payload) {
    try{
      this.profileStore.setLoading(true);
      await this.http.post(`system/SendEmail`, payload).toPromise();

    }catch(error){   
      this.profileStore.setError(error);
    }finally{
      this.profileStore.setLoading(false);
    }
  }



  async update(payload) {
    try{
      this.profileStore.setLoading(true);
      await this.http.post(`Profile/Update`, payload).toPromise();

    }catch(error){
      this.profileStore.setError(error);
    }finally{
      this.profileStore.setLoading(false);
    }
  }
  async add(payload) {
    try{
      this.profileStore.setLoading(true);
      await this.http.post(`Clinics/AddPatient`, payload).toPromise();

    }catch(error){
      this.profileStore.setError(error);
    }finally{
      this.profileStore.setLoading(false);
    }

  }

}
