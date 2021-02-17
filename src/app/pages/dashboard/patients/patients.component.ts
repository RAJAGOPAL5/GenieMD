import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/services/patients.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ContentLayoutComponent } from 'src/app/layouts/content-layout/content-layout.component';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

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
  patientSelected: any;
  patientProfile: any;
  patientProfileView = false;
  patientAvatar: any;
  patientName: string | undefined;
  patientGender: string | undefined;
  
  @Output() result: EventEmitter<any> = new EventEmitter();
  userID: any;
  value: any;
  activatedRoute: any;
  clinicID: any;


  constructor(private patientService: PatientsService,private dataService: DataService,
    private router: Router, private route: ActivatedRoute, ) { }
  const : Routes = [
    {
      path: 'dashboard/:clinicID/:userID', component: ContentLayoutComponent ,
    },
  ];
  
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
  selectedPatient(patient: any) {
    this.patientSelected = patient;
    this.result.emit(this.patientSelected);
    console.log("patient",this.patientSelected)
    this.patientlist.map((data: any) =>{
      data.isSelected = false;
    })
    this.dataService.updateSelectedStatus(true);
    const userPayload = {
      userID:"0f2fe8efc977494cbbeecb78e348cae5",
      clinicID:"1000208",
      patientID:  localStorage.getItem('rpmSelectedSubClinic'),
    };
    localStorage.setItem('rpmSelectedSubClinic',patient.patientID)
    this.patientService.getPatient(userPayload).subscribe((res:any) =>{
      this.patientProfile = res;
      this.patientProfileView = true;
      localStorage.setItem('patientProfile','true');
      localStorage.setItem('rpmSelectedSubClinic', res.userID);
      if(this.patientProfileView) {
        this.patientAvatar = this.patientProfile.imageUrl;
        this.patientName = this.patientProfile.firstName + '' + this.patientProfile.lastName;
        if(this.patientProfile && this.patientProfile.gender == 0){
          this.patientGender = 'Male';
        } else if(this.patientProfile && this.patientProfile.gender == 1){
          this.patientGender = 'Female';
        } else if(this.patientProfile && this.patientProfile.gender == 2) {
          this.patientGender = 'Other';
        } else {
          this.patientGender = '';
        }
      }
    })
    }
    goBackToPatients(){
      this.patientProfileView = false;
    }
}
  
