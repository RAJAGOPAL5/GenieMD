import { DashboardService } from './../../../shared/services/dashboard.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('pressureChart') mychart: any;
  @ViewChild('spoChart') mychart1: any;
  @ViewChild('weightChart') mychart2: any;
  @ViewChild('totalChart') mychart3: any;

  constructor(private dashboardService: DashboardService, private route: ActivatedRoute) { }
  active = 1;
  BPcanvas: any;
  Spo2canvas: any;
  Weightcanvas: any;
  allCanvas: any;
  timeduration: any;
  duration!: any;
  chartLabels: any
  chartSystolicBP: any
  chartDiastolicBP: any
  BPChart:any
  Spo2Chart:any
  myChart2:any
  weightChart:any
  userID: any;
  ngOnInit(): void {
    this.duration = 'all';
    this.timeduration = [
      { title: '1 Week', val: '1w', class: '' },
      { title: '1 Month', val: '1m', class: '' },
      { title: '3 Month', val: '3m', class: 'selected' },
      { title: '6 Month', val: '6m', class: '' },
      { title: '1 Year', val: '1y', class: '' },
      { title: 'All', val: 'all', class: '' }];
      const fromDate = moment('1900-02-01').valueOf();
      const toDate = moment().add(1, 'days').valueOf();
      this.route.params.subscribe(item => {
        this.userID = item.userID;
      });
    this.getBloodPerssure(fromDate,toDate)
    this.getWeight(fromDate, toDate)
  }
  ngAfterViewInit(): void {
    this.BPcanvas = this.mychart.nativeElement.getContext('2d');
    this.Spo2canvas = this.mychart1.nativeElement.getContext('2d');
    this.Weightcanvas = this.mychart2.nativeElement.getContext('2d');
    this.allCanvas = this.mychart3.nativeElement.getContext('2d');
    this.Spo2Chart = new Chart(this.Spo2canvas, {
      type: 'line',
      data: {
        labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
        datasets: [{
          label: 'Blood Pressure',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132,0.4)',
          fill: true,
          data: [0, 59, 75, 20, 20, 55, 40],
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Spo2'
        }
      }
    });
    this.BPChart = new Chart(this.BPcanvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Systolic Blood Pressure,',
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192,0.4)',
          data: [],
        },
        {
          label: 'Diastolic Pressure',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132,0.4)',
          data: [],
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Blood Perssure'
        }
      }
    });
    this.weightChart = new Chart(this.Weightcanvas, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Weight',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132,0.4)',
          fill: true,
          data: [],
        }]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Weight'
        }
      }
    });
    const totalChart = new Chart(this.allCanvas, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow'],
        datasets: [{
          data: [11, 16, 7],
          backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56'],
          label: 'My dataset' // for legend
        }],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Weight'
        }
      }
    });

  }
  getBloodPerssure(fromDate: any, toDate: any) {
    this.dashboardService.getBloodPressure(this.userID,fromDate,toDate).subscribe((data: any) => {
      console.log(data)
      if (data.vitalsList.length) {
        this.BPChart.data.labels = data.vitalsList.map((i: any) => {
          return moment(i.vitalDate).format("DD-MM-YYYY")
        })
        this.BPChart.data.datasets[0].data = data.vitalsList.map((i: any) => {
          var vitalDatas = JSON.parse(i.vitalData)
          return parseInt(vitalDatas.S)
        })
        this.BPChart.data.datasets[1].data = data.vitalsList.map((i: any) => {
          var vitalDatas = JSON.parse(i.vitalData)
          return parseInt(vitalDatas.D)
        })
      }
      console.log(this.BPChart.data.dataset)
      this.BPChart.update();
    })
  }
  getWeight(fromDate,toDate){
    this.dashboardService.getWeight(this.userID,fromDate,toDate).subscribe((data: any) => {
      if (data.vitalsList.length) {
        this.weightChart.data.labels = data.vitalsList.map((i: any) => {
          return moment(i.vitalDate).format("DD-MM-YYYY")
        })
        this.weightChart.data.datasets[0].data = data.vitalsList.map((i: any) => {
          var vitalDatas = JSON.parse(i.vitalData)
          return parseInt(vitalDatas.W)
        })
      }
      this.weightChart.update();
    })
  }
  getList(event:any) {
    let fromDate = moment().add(-118, 'years').valueOf();
    const toDate = moment().valueOf();
    if (event === '1w') {
      fromDate = moment().add(-7, 'days').valueOf();
    } else if (event === '1m') {
      fromDate = moment().add(-1, 'months').valueOf();
    } else if (event === '3m') {
      fromDate = moment().add(-3, 'months').valueOf();
    } else if (event === '6m') {
      fromDate = moment().add(-6, 'months').valueOf();
    } else if (event === '1y') {
      fromDate = moment().add(-1, 'years').valueOf();
    } else if (event === 'all') {
      fromDate = moment('1900-02-01').valueOf();
    }
    console.log(fromDate, toDate)
    this.getBloodPerssure(fromDate,toDate)
    this.getWeight(fromDate,toDate)

  }
}
