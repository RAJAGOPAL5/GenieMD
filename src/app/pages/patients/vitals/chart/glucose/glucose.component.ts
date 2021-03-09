import { Component, Input, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
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

  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: '',
    }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    { // Orange
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgb(255,69,0)',
      pointBackgroundColor: 'rgb(255,69,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255,69,0)'
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
          max: 600,
          min: 0
        },
        scaleLabel: {
          display: true,
          labelString: 'mg/dL',
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
  theme: string;
  @Input()
  get data() {
    return this.chartData;
  }
  set data(res) {
    this.chartData = res;
    this.lineChartData = [
      {
        data: [],
        label: '',
      }
    ];    this.getData();
  }
  constructor(
    private vitalService: VitalsService,
    private themeService: NbThemeService,
  ) { }

  ngOnInit(): void {
    this.themeService.onThemeChange().subscribe(theme => {
      console.log('Theme changed: ', theme);
      this.theme = theme.name;
      this.chartOptions();
    });
  }
  getData() {
    this.isLoading = true;
    const fromDate = this.chartData.fromDate || moment('1900-02-01').valueOf();
    const toDate = this.chartData.toDate || moment().add(1, 'days').valueOf();
    const GlucoseData = {
      data: [],
      label: 'Glucose',
      backgroundColor: 'rgba(255, 204, 153,0.3)',
      lineTension: 0
    };
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, 2).subscribe((data: any) => {
      this.isLoading = false;

      if (data) {
        (data.vitalsList || [])
        .sort((a, b) => {
          return new Date(a.vitalDate) > new Date(b.vitalDate) ? 0 : -1;
        })
        .forEach(item => {
          this.lineChartLabels.push(moment(item.vitalDate).format('DD/MM/YY'));
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
      this.chartOptions();
    }, error => {
      this.isLoading = false;

      throw error;
    });
  }


  chartOptions() {
    const theme = this.theme;
    const lineChartOptions: any = {
      scales: {
        yAxes: [],
        xAxes: []
      },
      legend: {
        labels: {
          usePointStyle: true,
          fontColor: theme === 'dark' ? 'white' : 'black'
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

    const yAxesScales = {
      ticks: {
        beginAtZero: true,
        stepValue: 20,
        steps: 2,
        max: 600,
        min: 0,
        fontColor: theme === 'dark' ? 'white' : 'black',
      },
      scaleLabel: {
        display: true,
        labelString: 'mg/dL',
        fontColor: theme === 'dark' ? '#3366ff' : 'black',
        fontStyle: "bold"
      }
    }

    const xAxesScales = {
      ticks: {
        fontColor: theme === 'dark' ? 'white' : 'black',
        source: 'data'
      },
      scaleLabel: {
        display: true,
        labelString: 'Date',
        fontColor: theme === 'dark' ? '#3366ff' : 'black',
        fontStyle: "bold"
      },
      type: 'time',
      distribution: 'series',
      time: {
        unit: 'day',
        parser: 'DD/MM/YY',
      }
    };

    lineChartOptions.scales.yAxes = [yAxesScales];
    lineChartOptions.scales.xAxes = [xAxesScales];

    this.lineChartOptions = lineChartOptions;
  }


}
