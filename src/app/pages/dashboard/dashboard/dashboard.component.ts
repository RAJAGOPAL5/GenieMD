import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';
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

  constructor() { }
  active = 1;
  canvas: any;
  ctx: any;
  canvas1: any;
  ctx1: any;
  canvas2: any;
  ctx2: any;
  canvas3: any;
  ctx3: any;
  timeduration: any;
  duration: any;

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.canvas1 = this.mychart1.nativeElement;
    this.ctx1 = this.canvas1.getContext('2d');
    this.canvas2 = this.mychart2.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas3 = this.mychart3.nativeElement;
    this.ctx3 = this.canvas3.getContext('2d');
    this.timeduration = [
      { title: '1 Week', val: '1w', class: '' },
      { title: '1 Month', val: '1m', class: '' },
      { title: '3 Month', val: '3m', class: 'selected' },
      { title: '6 Month', val: '6m', class: '' },
      { title: '1 Year', val: '1y', class: '' },
      { title: 'All', val: 'all', class: '' }];
    this.duration = 'all';
    const myChart = new Chart(this.ctx, {
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
          text: 'Blood Perssure'
        }
      }
    });
    const myChart1 = new Chart(this.ctx1, {
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
    const myChart2 = new Chart(this.ctx2, {
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
          text: 'Weight'
        }
      }
    });
    const totalChart = new Chart(this.ctx3, {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
      datasets: [{
          data: [11, 16, 7, 3, 14 ],
          backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'
          ],
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

}
