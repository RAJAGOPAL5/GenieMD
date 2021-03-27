import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreConfig } from '@datorama/akita';

export interface ClinicState {
  //  key?: string;
  //  member?: boolean;
  //  oemID?: number;
  //  clinicID?: string;
  clinicConfig?: any;
  //  mainClinic?: boolean;
  //  languageID?: number;
  clinic?: any;
}

export function createClinicState(): ClinicState {
  return {
    // key: '',
    // member: false,
    // oemID: 0,
    // clinicID: '',
    // clinicConfig: '',
    // mainClinic: false,
    // languageID: 0,
  };
}

@Injectable()
@StoreConfig({ name: 'clinic' })
export class ClinicStore extends Store<ClinicState> {

  constructor(private http: HttpClient, private router: Router) {
    super(createClinicState());
  }

}
