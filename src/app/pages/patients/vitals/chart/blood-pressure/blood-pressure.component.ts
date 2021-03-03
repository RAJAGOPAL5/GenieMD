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
    {
      borderColor: 'black',
      backgroundColor: 'rgba(100,0,0,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(150,0,0,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
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
        }
      }]
    }
  };
  chartData: any;
  @Input()
  get data() {
    return this.chartData;
  }
  set data(res) {
    this.chartData = res;
    this.getData();
  }
  constructor(private vitalService: VitalsService) { }

  ngOnInit(): void {

  }
  getData() {
    const fromDate = this.chartData.fromDate || moment('1900-02-01').valueOf();
    const toDate = this.chartData.toDate || moment().add(1, 'days').valueOf();
    const heartRateData = {
      data: [],
      label: 'Heart Rate',
      backgroundColor: 'rgba(100,0,0,0.3)',

    };
    const systolicData = {
      data: [],
      label: 'Systolic',
      backgroundColor: 'rgba(200,0,0,0.3)',


    };
    const dialosticData = {
      data: [],
      label: 'Dialostic',
      backgroundColor: 'rgba(255,0,0,0.3)',
    };
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, 1).subscribe((data: any) => {
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
        this.lineChartData.push(heartRateData);
        this.lineChartData.push(systolicData);
        this.lineChartData.push(dialosticData);

      }
    }, error => {
      throw error;
    });
  }

}
