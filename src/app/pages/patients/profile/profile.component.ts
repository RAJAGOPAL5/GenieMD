import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
  }

}
