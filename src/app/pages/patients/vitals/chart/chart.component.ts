import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vital-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() type: number;
  constructor() { }

  ngOnInit(): void {
  }

}
