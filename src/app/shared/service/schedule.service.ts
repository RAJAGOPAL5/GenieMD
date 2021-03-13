import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getAppointmentList(userID) {
    return this.http.get(`Encounters/ListBasedOnMeeting/${userID}`);
  }

  deleteAppointment(content) {
    return this.http.post(`Meetings/Delete`, content);
  }

  updateProvider(content) {
    return this.http.post(`Encounters/Update`, content);
  }

  notificationUser(content) {
    return this.http.post(`Notifications/NotifyUsersWithOptions`, content);
  }
}
