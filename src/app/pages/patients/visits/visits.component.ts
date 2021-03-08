import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  timeSlots = ['9:00 AM', '9:30 AM', '10.30 AM', '11.00 AM', '12:30 PM', '1:40 PM']

  constructor() { }

  ngOnInit(): void {
  }

}
