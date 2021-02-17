import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patientSelected: any;

  constructor() { }
  active = 1;


  ngOnInit(): void {
  }
  selectedPatient(result: string) {
    this.patientSelected = result;
  }

}
