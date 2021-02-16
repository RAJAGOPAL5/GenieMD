import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

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

  constructor(private patientService: PatientsService ) { }

  ngOnInit() {
    this.mySubject.pipe(debounceTime(1000))
      .subscribe((data) => {
        if (data == '') {
          this.patientlist = []
          this.totalPatient = []
        } else {
          const payload = {
            
            "clinicID":"1000208",
            "name": "test",
            "providerID":"",
            "userID":"0f2fe8efc977494cbbeecb78e348cae5"
          };


          // this.spinner.show();
          this.patientService.getPatients(payload).subscribe((data:any) => {
            this.patientFullList = true;
            this.totalPatient = data.clinicPatientList;
            this.totalPatient.map((item) => {
              try {
                // const dob = item.dob.split('-');
                // if (dob[1].length == 1) {
                //   dob[1] = '0' + dob[1];
                // }
                // if (dob[2].length == 1) {
                //   dob[2] = '0' + dob[2];
                // }
                // item.dob = dob[0] + '-' + dob[1] + '-' + dob[2];
              } catch (e) {
                // item.dob = '';
              }
            });
            // this.spinner.hide()
            this.totalPatient = this.totalPatient.sort((a, b) => {

              return 0;
            });
            this.patientlist = this.totalPatient;
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


}
  
