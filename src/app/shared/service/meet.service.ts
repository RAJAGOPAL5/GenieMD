import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetService {

  constructor(private http: HttpClient) { }

  createMeeting(payload) {
    return this.http.post(`Meetings/Create`, payload);
  }

  startMeeting(payload) {
    return this.http.post(`Meetings/Start`, payload);
  }
  generateUniqueID(payload) {
    return this.http.post(`Meetings/GenerateUniqueID`, payload);
  }
  destroyMeeting(payload) {
    return this.http.post(`Meetings/Delete`, payload);
  }
  destroyEncounter(payload) {
    return this.http.post(`Encounters/Delete`, payload);
  }
  checkTimeSlot(payload) {
    return this.http.post(`Meetings/CheckSlot`, payload);
  }
  getLog(payload) {
    return this.http.post(`Meetings/GetMeetingLogs`, payload);
  }
  addParticipant(payload) {
    return this.http.post(`Meetings/AddParticipant`, payload);
  }
  add(payload) {
    return this.http.post(`Encounters/Add`, payload);
  }
  encountersUpdate(payload) {
    return this.http.post(`Encounters/Update`, payload);
  }
  sendEmail(payload) {
    return this.http.post(`system/SendEmail`, payload);
  }
  callUser(payload) {
    return this.http.post(`Notifications/CallUser`, payload);
  }
  auditFollowup(payload) {
    return this.http.post(`Audits/AddAudit`, payload);
  }
}
