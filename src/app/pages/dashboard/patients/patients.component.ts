import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ClinicService } from 'src/app/shared/services/clinic.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  searchValue = {'firstName':'', 'lastName': '', 'gender':'', 'dob':''};
  mySubject = new Subject();
  patientlist: any;
  totalPatient = [];
  totalPatientCount: any;
  pageNumber = 1;
  pageSize = 20;
  patientFullList = false;
  showPatient = false;
  searchText: any;
  clinicID: any;
  userID: any;
  clinic:any;

  constructor(private route: ActivatedRoute, private patientService: PatientsService, private modalService: NgbModal,
    private clinicService: ClinicService ) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      console.log('res', res);
      this.clinicID = res.clinicID ;
      this.userID = res.userID;
    })
    this.mySubject.pipe(debounceTime(1000))
      .subscribe((data) => {
        if (data == '') {
          this.patientlist = []
          this.totalPatient = []
        } else {
          const payload = {
            
            clinicID: this.clinicID ,
            name: "test",
            providerID:"",
            userID:this.userID,
          };


          // this.spinner.show();
          this.patientService.getPatients(payload).subscribe((data:any) => {
            this.patientFullList = true;
            this.patientlist = data.clinicPatientList;
            // this.spinner.hide()
            this.totalPatient = this.totalPatient.sort((a, b) => {

              return 0;
            });
          }, error => {
            // this.spinner.hide();
            // this.toaster.error('Failed to search patient');
          });
        }
      });
  }
  onSearchChange(){
    this.mySubject.next();
  }

  addPatient() {
    const modalRef = this.modalService.open(AddPatientComponent, { backdrop: 'static', keyboard: false });
    modalRef.componentInstance.clinicID = this.clinicService.id;
    modalRef.componentInstance.clinic = this.clinicService.clinic;

    modalRef.result.then(items => {
      if (items) {
        // this.loadData(items);
        // console.log(items, ' res add patientcomponent');
      }

    });
  }
}
  
