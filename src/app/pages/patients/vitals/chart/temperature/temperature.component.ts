import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { VitalsService } from 'src/app/shared/service/vitals.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    { // pink
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#FF69B4	',
      pointBackgroundColor: '#FF69B4	',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FF69B4	'
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
          steps: 2,
          max: 100,
          min: 25
        },
        scaleLabel: {
          display: true,
          labelString: 'Celcius',
          fontColor: '#3366ff',
          fontStyle: "bold"
       }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Date',
          fontColor: '#3366ff',
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
    const TempData = {
      data: [],
      label: 'Temperature',
      backgroundColor: 'rgba(255, 204, 153,0.3)',
      lineTension: 0
    };
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, 14).subscribe((data: any) => {
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
          if (vialData.T) {
            TempData.data.push(vialData.T);
          }
        });
        this.lineChartData = [TempData]
      }
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }

}
