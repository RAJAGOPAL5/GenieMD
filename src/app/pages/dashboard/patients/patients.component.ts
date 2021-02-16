import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientComponent } from './add-patient/add-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  addPatient() {
    const modalRef = this.modalService.open(AddPatientComponent, { backdrop: 'static', keyboard: false });
    // modalRef.componentInstance.clinic = this.clinic;
    modalRef.result.then(items => {
      if (items) {
        // this.loadData(items);
        // console.log(items, ' res add patientcomponent');
      }

    });
  }
}
