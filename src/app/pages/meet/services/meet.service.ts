import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetService {

  constructor(private http: HttpClient) { }

  generateUniqueID(payload) {
    return this.http.post(`Meetings/GenerateUniqueID`, payload);
  }
  createMeeting(payload) {
    return this.http.post(`Meetings/Create`, payload);
  }
  add(payload) {
    return this.http.post(`Encounters/Add`, payload);
  }
  encountersUpdate(payload) {
    return this.http.post(`Encounters/Update`, payload);
  }
}
