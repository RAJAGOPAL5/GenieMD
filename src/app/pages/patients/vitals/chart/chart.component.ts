import { getLocaleDateFormat } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { VitalsService } from 'src/app/shared/service/vitals.service';

@Component({
  selector: 'app-vital-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() type: any;
  @Input() chartData: any;
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor(private vitalService: VitalsService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getData();
    this.getChartColor(this.type.vitalType);

  }
  getData() {
    const fromDate = this.chartData.fromDate || moment('1900-02-01').valueOf();
    const toDate = this.chartData.toDate || moment().add(1, 'days').valueOf();
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, this.type.vitalType).subscribe(data => {
      console.log('data', data);
    }, error => {
      throw error;
    });
  }
  getChartColor(type) {
    switch (type) {
      case 1: this.lineChartColors = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ];
        break;
      case 2: this.lineChartColors = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(153, 171, 128,0.3)',
        },
      ];
        break;
      case 3: this.lineChartColors = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(190, 212, 209,0.3)',
        },
      ];
        break;
      case 6: this.lineChartColors = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(172, 194, 232,0.3)',
        },
      ];
        break;
      case 14: this.lineChartColors = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(196, 171, 186,0.3)',
        },
      ];
        break;
      default: this.lineChartColors = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ];
        break;
    }

  }
}
