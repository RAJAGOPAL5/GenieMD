import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import { PatientService } from 'projects/core/src/lib/patient/state/patient.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { VitalsService } from 'src/app/shared/service/vitals.service';
import { vitals } from 'src/app/shared/constnts/consstnt';


@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss']
})
export class VitalsComponent implements OnInit {

  @ViewChild('pressureChart') mychart: any;
  @ViewChild('spoChart') mychart1: any;
  @ViewChild('weightChart') mychart2: any;
  @ViewChild('totalChart') mychart3: any;
  chartInfo: { patientId: string; fromDate: string; toDate: string; };
  constructor(
    private vitalsService: VitalsService, private profileService: ProfileService,
    private ls: LanguageService,private patientService: PatientService,
    private translate: TranslateService, private route: ActivatedRoute, private clinicService: ClinicService) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }
  BPChartLabels: any;
  BPChartDatasets1: any;
  BPChatType = 'line';
  BPChartShow = false;
  BPChartOptions = {
    legend: { display: false },
    title: {
      display: true,
      text: 'Blood Pressure'
    }
  }
  weightChartLabels: any;
  weightChartdatasets: any;
  weightChartType = 'line';
  weightChartShow = false;
  weightChartOptions = {
    legend: { display: false },
    title: {
      display: true,
      text: 'Weight'
    }
  }
  spo2ChartData = [{ data: [], label: '' }]
  spo2ChartLabels = []
  spo2ChartType = 'line'
  spo2ChartOptions = {
    legend: { display: false },
    title: {
      display: true,
      text: 'SPO2'
    }
  }
  chartLabels = ['Blood Pressure', 'Weight', 'SpO2'];
  chartData = [100, 200, 150];
  chartLegend = true;
  timeduration: any;
  duration!: any;
  userID: any;
  vitals = [];
  

  ngOnInit(): void {
    console.log('route', this.route.snapshot.parent.params.patientId)
    const patientID = this.route.snapshot.parent.params.patientId;
    this.getData(patientID);
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
    this.userID = this.profileService.id;
    // this.getBloodPerssure(fromDate, toDate);
    // this.getWeight(fromDate, toDate);

  }
  getBloodPerssure(fromDate: any, toDate: any) {
    this.vitalsService.getBloodPressure(this.userID, fromDate, toDate).subscribe((data: any) => {
      if (data.vitalsList.length) {
        this.BPChartLabels = data.vitalsList.map((i: any) => {
          return moment(i.vitalDate).format("DD-MM-YYYY")
        })
        var dataset1 = data.vitalsList.map((i: any) => {
          var vitalDatas = JSON.parse(i.vitalData)
          return parseInt(vitalDatas.S)
        })
        var dataset2 = data.vitalsList.map((i: any) => {
          var vitalDatas = JSON.parse(i.vitalData)
          return parseInt(vitalDatas.D)
        })
        this.BPChartDatasets1 = [
          {
            data: dataset1,
            label: 'Systolic Blood Pressure'
          }, {
            data: dataset2,
            label: 'Diastolic Blood Pressure'
          }
        ]
        this.BPChartShow = true
      }
    })
  }
  getWeight(fromDate, toDate) {
    this.vitalsService.getWeight(this.userID, fromDate, toDate).subscribe((data: any) => {
      if (data.vitalsList.length) {
        this.weightChartLabels = data.vitalsList.map((i: any) => {
          return moment(i.vitalDate).format("DD-MM-YYYY")
        })
        var datasets = data.vitalsList.map((i: any) => {
          var vitalDatas = JSON.parse(i.vitalData)
          return parseInt(vitalDatas.W)
        })
        this.weightChartdatasets = [{
          data: datasets,
          label: 'Weight'
        }]
      }
      this.weightChartShow = true
      // this.weightChart.update();
    })
  }
  getList(event: any) {
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
    this.getBloodPerssure(fromDate, toDate)
    this.getWeight(fromDate, toDate)
  }
  getData(patientId) {
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: patientId
    };
    this.patientService.findById(payload).subscribe((data: any) => {
      console.log('patientIdpatientId', data);
      const patientData = data;
      let extraData;
      try {
        extraData = JSON.parse(patientData.extraData);
      } catch (error) {
        extraData = patientData.extraData || {};
      }
      this.vitals = !!extraData.vitals ? extraData.vitals : [];
      this.chartInfo = { patientId: patientData.userID, fromDate: '', toDate: '' };
    }, error => {
      throw error;
    });
  }
}
