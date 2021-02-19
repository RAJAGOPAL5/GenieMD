import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { PatientsService } from 'src/app/shared/service/patients.service';

interface ViewModal { 
  profile?: any;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  model: ViewModal = {};
  tabs = [
    {
      title: 'Vitals',
      route: '/patients/patientId/vitals',
    },
    {
      title: 'Alerts',
      route: '/patients/patientId/alerts',
    },
    {
      title: 'Visits',
      route: '/patients/patientId/visits',
    },
    {
      title: 'Care Team',
      route: '/patients/patientId/care-team/',
    },
    {
      title: 'History',
      route: '/patients/patientId/history/',
    },

  ];
  patientID: any;
  patient: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientsService,
    private clinicService: ClinicService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params, this.activatedRoute);
      this.patientID = params.get('patientId');
      console.log('patient id',this.patientID);
      this.getData();
    });

  }

  getData() {
      const payload = {
        userID: localStorage.getItem('userID'),
        clinicID: localStorage.getItem('clinicID'),
        patientID: this.patientID 
      }

      this.patientService.findById(payload).subscribe((data: any) => {
       console.log('data', data);
       this.patient = data;
       
      }, error => {
        console.log('error');
  
      })
    }
  }
