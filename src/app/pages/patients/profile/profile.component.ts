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
  tabs: any[];
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
      this.prepareTabs();
      this.getData();
    });
  }

  getData() {
    const payload = {
      userID: localStorage.getItem('userID'),
      clinicID: localStorage.getItem('clinicId'),
      patientID: this.patientID
    }
    this.patientService.findById(payload).subscribe((data: any) => {
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

  prepareTabs() {
    this.tabs = [
      {
        title: 'Vitals',
        route: `/patients/${this.patientID}/vitals`,
      },
      {
        title: 'Alerts',
        route: `/patients/${this.patientID}/alerts`,
      },
      {
        title: 'Visits',
        route: `/patients/${this.patientID}/visits`,
      },
      {
        title: 'Care Team',
        route: `/patients/${this.patientID}/care-team/`,
      },
      {
        title: 'History',
        route: `/patients/${this.patientID}/history/`,
      },
  
    ];
  }
}
