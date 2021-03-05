import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { VitalsService } from 'src/app/shared/service/vitals.service';


@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss']
})
export class BloodPressureComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgb(0, 214, 143)',
      pointBackgroundColor: 'rgb(0, 214, 143)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(0, 214, 143)'
    },
    { // pink
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#ff3d71',
      pointBackgroundColor: '#ff3d71',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#ff3d71'
    },
    { // blue
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgb(51, 102, 255)',
      pointBackgroundColor: 'rgb(51, 102, 255)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(51, 102, 255)'
    }
   
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public lineChartOptions: any = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepValue: 20,
          steps: 20,
          max: 250,
          min: 40
        },
        scaleLabel: {
          display: true,
          labelString: 'mmHG',
          fontColor: 'black',
          fontStyle: "bold"
       }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontColor: 'black',
          fontStyle: "bold"
       },
       type: 'time',
       time: {
         unit: 'day'
       }
      }]
    },
    legend: {
      labels: {
        usePointStyle: true
      }
    },
    elements:
    {
      point:
      {
        radius: 5,
        hitRadius: 5,
        hoverRadius: 5,
        hoverBorderWidth: 2,
      }
    }
  };
  isLoading = false;
  chartData: any;
  @Input()
  get data() {
    return this.chartData;
  }
  set data(res) {
    this.chartData = res;
    this.lineChartData = [];
    this.getData();
  }
  constructor(private vitalService: VitalsService) { }

  ngOnInit(): void {

  }
  getData() {
    this.isLoading = true;
    const fromDate = this.chartData.fromDate || moment('1900-02-01').valueOf();
    const toDate = this.chartData.toDate || moment().add(1, 'days').valueOf();
    const heartRateData = {
      data: [],
      label: 'Heart Rate',
      backgroundColor: 'rgba(255, 204, 153,0.3)',
      lineTension: 0
    };
    const systolicData = {
      data: [],
      label: 'Systolic',
      backgroundColor: 'rgba(179, 218, 255,0.3)',
      lineTension: 0
    };
    const dialosticData = {
      data: [],
      label: 'Dialostic',
      backgroundColor: 'rgba(153, 171, 128,0.3)',
      lineTension: 0
    };
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, 1).subscribe((data: any) => {
      this.isLoading = false;

      if (data) {
        (data.vitalsList || []).forEach(item => {
          this.lineChartLabels.push(moment(item.vitalDate).format('DD/MM'));
          let vialData;
          try {
            vialData = JSON.parse(item.vitalData);
          } catch (error) {
            vialData = {};
          }
          if (vialData.S) {
            systolicData.data.push(vialData.S);
          }
          if (vialData.D) {
            dialosticData.data.push(vialData.D);
          }
          if (vialData.R) {
            heartRateData.data.push(vialData.R);
          }
        });
        this.lineChartData = [heartRateData, systolicData, dialosticData]
      }
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }

}
