import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private assessmentData = new BehaviorSubject({});
  data = this.assessmentData.asObservable();

  private clinicData = new BehaviorSubject({});
  clinic = this.clinicData.asObservable();

  private changeTitle = new BehaviorSubject({});
  name = this.changeTitle.asObservable();

  private colorTeam = new BehaviorSubject({});
  color = this.colorTeam.asObservable();

  private requestClinic = new BehaviorSubject({});
  requestData = this.requestClinic.asObservable();

  private patientAdded = new BehaviorSubject(false);
  patientData = this.patientAdded.asObservable();

  phrevent: EventEmitter<any> = new EventEmitter(false);


  constructor() { }

  emitNavChangeEvent(data) {
    this.phrevent.emit(data);
  }

  addData(data: any) {
    this.assessmentData.next(data);
  }

  addClinic(data: any) {
    this.clinicData.next(data);
  }

  titleChange(name: any) {
    this.changeTitle.next(name);
  }

  changeColor(name: any) {
    this.colorTeam.next(name);
  }
  changeRequestClinic(data: any) {
    this.requestClinic.next(data);
  }
  getNavChangeEmitter() {
    return this.phrevent;
  }
  updatePatientList(data: any) {
    this.patientAdded.next(data);
  }
}
