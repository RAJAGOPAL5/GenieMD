import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  tabs: any[];
  constructor() { }

  ngOnInit(): void {
    this.prepareTabs();
  }
  prepareTabs() {
    this.tabs = [
      {
        title: 'Patients',
        route: `patients`,
      },
      {
        title: 'Adherence',
        route: `adherence`,
      },
      {
        title: 'Measurements',
        route: `measurements`,
      }
    ];
  }

}
