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
      route: '/patients/patientId/Care-Team',
    },
    {
      title: 'Visits',
      route: '/pages/',
    },
    {
      title: 'Care Team',
      route: '/patients/patientId/care-team/',
    },
    {
      title: 'Profile',
      route: '/pages/',
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
