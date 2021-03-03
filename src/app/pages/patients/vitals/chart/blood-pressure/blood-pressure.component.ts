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
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
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
    const chartData = {
      data: [],
      label: 'test'
    };
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, 1).subscribe((data: any) => {
      console.log('data', data);
      if(data) {
        (data.vitalsList || []).forEach(item => {
          this.lineChartLabels.push(moment(item.vitalDate).format('DD/MM'));
          let vialData;
          try {
            vialData = JSON.parse(item.vitalData);
          } catch (error) {
            vialData = {};
          }
          chartData.data.push(1);
        });
        this.lineChartData.push(chartData);
      }
    }, error => {
      throw error;
    });
  }

}
