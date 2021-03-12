import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { VitalsService } from 'src/app/shared/service/vitals.service';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: '',
    }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    { // blue
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'blue',
      pointBackgroundColor: 'blue',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'blue'
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
          stepSize: 20,
          max: 400,
          min: 50
        },
        scaleLabel: {
          display: true,
          labelString: 'lbs',
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
    ];
    this.getData();
  }
  constructor(
    private vitalService: VitalsService,
    private themeService: NbThemeService,
  ) { }

  ngOnInit(): void {
    this.themeService.onThemeChange().subscribe(theme => {
      console.log('Theme changed: ', theme);
      this.theme = theme.name;
      this.chartOptions(this.chartData.fromDate, this.chartData.toDate,this.chartData.unit, this.chartData.range);
    });
  }
  getData() {
    this.isLoading = true;
    const fromDate = this.chartData.fromDate || moment('1900-02-01').valueOf();
    const toDate = this.chartData.toDate || moment().add(1, 'days').valueOf();
    const weightData = {
      data: [],
      label: 'Weight',
      backgroundColor: 'rgba(255, 204, 153,0.3)',
      lineTension: 0
    };
    this.vitalService.getData(this.chartData.patientId, fromDate, toDate, 6).subscribe((data: any) => {
      this.isLoading = false;
      if (!!data.vitalsList) {
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
          if (vialData.W) {
            weightData.data.push(vialData.W);
          }
        });
        this.lineChartData = [weightData]
      } else {
        this.lineChartData = []
      }
      this.chartOptions(this.chartData.fromDate, this.chartData.toDate,this.chartData.unit, this.chartData.range);
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }


  chartOptions(fromDate, toDate, unit, range) {
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

    const xAxesScales: any = {
      scaleLabel: {
        display: true,
        labelString: 'Date',
        fontColor: theme === 'dark' ? '#3366ff' : 'black',
        fontStyle: 'bold'
      },
      type: 'time',

      ticks: {
        fontColor: theme === 'dark' ? 'white' : 'black',
      }
    };
    if (range == -1) {
      xAxesScales.time = {
        unit: 'day',
        parser: 'DD/MM/YY',
      };
      xAxesScales.ticks.source = 'data';
    } else {
      xAxesScales.time = {
        unit,
      };
      xAxesScales.ticks.min =  fromDate;
      xAxesScales.ticks.max = toDate;
    }

    const yAxesScales = {
      ticks: {
        beginAtZero: true,
        stepSize: 20,
        max: 400,
        min: 50,
        fontColor: theme === 'dark' ? 'white' : 'black',
      },
      scaleLabel: {
        display: true,
        labelString: 'lbs',
        fontColor: theme === 'dark' ? 'white' : 'black',
        fontStyle: "bold"
      }
    };
    lineChartOptions.scales.yAxes = [yAxesScales];
    lineChartOptions.scales.xAxes = [xAxesScales];
    this.lineChartOptions = lineChartOptions;
  }

}
