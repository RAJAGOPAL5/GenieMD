import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbIconLibraries } from '@nebular/theme';
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
  patientName: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientsService,
    private iconLibraries: NbIconLibraries
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
      console.log('patient id', this.patientID);
      this.getData();
      console.log(params, this.activatedRoute, this.clinicService.config, this.clinicService.clinic);
    });
  }

  getData() {
    const payload = {
      userID: localStorage.getItem('userID'),
      clinicID: localStorage.getItem('clinicId'),
      patientID: this.patientID
    }
    this.patientService.findById(payload).subscribe((data: any) => {
      console.log('data', data);
      this.patient = data;
      this.patientName =`${this.patient.firstName} ${this.patient.lastName}`
        
      if(this.patient.gender == 0){
        this.patient.gender = 'Male';
      }
      if(this.patient.gender == 1){
        this.patient.gender = 'Female';
      }
      if(this.patient.gender == 2){
        this.patient.gender = 'Others';
      }    
    }, error => {
      console.log('error');
    })
  }
}
