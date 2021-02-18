import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      console.log(params, this.activatedRoute);
    });
  }

  getData() {
    // this.patientService
  }

}
