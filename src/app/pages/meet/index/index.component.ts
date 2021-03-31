import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  showVitals = false;
  constructor() { }

  ngOnInit(): void {
  }

  getRecord(event) {
    // tslint:disable-next-line:triple-equals
    if (event == 'vitals') {
      this.showVitals = !this.showVitals;
    }
  }
}
