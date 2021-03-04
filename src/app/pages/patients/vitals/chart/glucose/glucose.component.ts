import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { VitalsService } from 'src/app/shared/service/vitals.service';

@Component({
  selector: 'app-glucose',
  templateUrl: './glucose.component.html',
  styleUrls: ['./glucose.component.scss']
})
export class GlucoseComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [];
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
          max: 600,
          min: 0
        },
        scaleLabel: {
          display: true,
          labelString: 'mg/dL',
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
    const GlucoseData = {
      data: [],
      label: 'Glucose',
      backgroundColor: 'rgba(255, 204, 153,0.3)',
    };
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, 2).subscribe((data: any) => {
      if (data) {
        (data.vitalsList || []).forEach(item => {
          this.lineChartLabels.push(moment(item.vitalDate).format('DD/MM'));
          let vialData;
          try {
            vialData = JSON.parse(item.vitalData);
          } catch (error) {
            vialData = {};
          }
          if (vialData.V) {
            GlucoseData.data.push(vialData.V);
          }
        });
        this.lineChartData = [GlucoseData]
      }
    }, error => {
      throw error;
    });
  }

}
