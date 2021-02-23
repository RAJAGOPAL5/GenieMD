import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ProfileState {
   dob: string;
   userID: string;
   bloodType: string;
   firstName: string;
   lastName: string;
   zipCode: string;
   gender: number;
   pregnant: number;
   birthdate: number;
   height: number;
   weight: number;
   userName: string;
   privateKey: string;
   extraData: any;
   email: string;
   longitude: number;
   latitude: number;
   city: string;
   cellNumber: string;
   licenseNumber?: string;
   npi: string;
   profileEmail: string;
   languageName: string;
   oemID: number;
   imageURL: string;
   screenName: string;
   locationTime: number;
   appVersion: string;
   directEmailAddress: string;
   loopSocialId: number;
   languageId: number;
   sendPushNotification: boolean;
   userKey: string;
   secretCode: string;
   premium: number;
   providerStatus: string;
   subscriptionExpiration: number;
   employerID: string;
   emrID: string;
   passport: string;
   ethnicity: string;
   activated: boolean;
   providerId: string;
   stringDob: string;
   address: string;
   state: string;
   publicKey: string;
   country: string;
   providerGMTOffset?: string
}

export function createInitialState(): ProfileState {
  return {
    dob: '',
    userID: '',
    bloodType: '',
    firstName: '',
    lastName: '',
    zipCode: '',
    gender: 0,
    pregnant: 0,
    birthdate: 0,
    height: 0,
    weight: 0,
    userName: '',
    privateKey: '' ,
    extraData: '',
    email: '',
    longitude: 0,
    latitude: 0,
    city: '',
    cellNumber: '',
    licenseNumber: '',
    npi: '',
    profileEmail: '',
    languageName: '',
    oemID: 0,
    imageURL: '',
    screenName: '',
    locationTime: 0,
    appVersion: '',
    directEmailAddress: '',
    loopSocialId: 0,
    languageId: 0,
    sendPushNotification: false,
    userKey: '',
    secretCode: '',
    premium: 0,
    providerStatus: '',
    subscriptionExpiration: 0,
    employerID: '',
    emrID: '',
    passport: '',
    ethnicity: '',
    activated: false,
    providerId: '',
    stringDob: '',
    address: '',
    state: '',
    publicKey: '',
    country: '',
    providerGMTOffset: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'profile' })
export class ProfileStore extends Store<ProfileState> {

  constructor() {
    super(createInitialState());
  }

}
