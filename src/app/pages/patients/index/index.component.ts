import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  tabs = [
    // {
    //   title: 'Route tab #1',
    //   route: '/pages/description',
    //   icon: 'home',
    //   responsive: true, // hide title before `route-tabs-icon-only-max-width` value
    // },
    // {
    //   title: 'Route tab #2',
    //   route: '/pages/images',
    // },
    {
      title: 'Vitals #3',
      route: '/pages/',
    },
    {
      title: 'Alerts #4',
      route: '/pages/',
    },
    {
      title: 'Visits #5',
      route: '/pages/',
    },
    {
      title: 'Care Team #6',
      route: '/pages/',
    },
    {
      title: 'Profile #7',
      route: '/pages/',
    },
    {
      title: 'History #8',
      route: '/pages/',
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
