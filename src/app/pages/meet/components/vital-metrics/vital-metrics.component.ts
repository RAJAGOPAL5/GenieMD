import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { VitalsService } from 'src/app/shared/service/vitals.service';

@Component({
  selector: 'app-vital-metrics',
  templateUrl: './vital-metrics.component.html',
  styleUrls: ['./vital-metrics.component.scss']
})
export class VitalMetricsComponent implements OnInit, OnDestroy {

  patientID: any;
  patientData: any;
  extraData: any;
  vitalsArray = [];
  vitals = [];
  vitalsRes: any;
  vitalList = [];
  vitalsOriginal = [];
  timmerLoad: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private profileService: ProfileService,
    private clinicService: ClinicService,
    private patientsService: PatientsService,
    private vitalsService: VitalsService,
    private toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.patientID = this.activatedRoute.snapshot.params.patientID;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.patientsService.findById(payload).subscribe((data: any) => {
      this.patientData = data;
      try {
        this.extraData = JSON.parse(this.patientData.extraData);
      } catch {
        this.extraData = {};
      }
      this.vitalsArray = this.extraData.vitals;
      console.log('this.vitalss ssid', this.vitalsArray);
      this.getVitals();
    });
    this.vitals = [
      { id: 1, BP: '120/80', SPO2: '98', Weight: '80', Temp: '97', Glucose: '240' },
      { id: 2, BP: '130/70', SPO2: '100', Weight: '100', Temp: '98', Glucose: '110' },
      { id: 3, BP: '125/75', SPO2: '99', Weight: '75', Temp: '97', Glucose: '350' },
      { id: 4, BP: '110/70', SPO2: '95', Weight: '95', Temp: '100', Glucose: '200' },
      { id: 5, BP: '120/60', SPO2: '96', Weight: '110', Temp: '95', Glucose: '300' }
    ];
  }

  getVitals() {
    this.vitalsService.getVital(this.patientData.userID).subscribe((res: any) => {
      this.vitalsRes = res.vitalsList;
      if (!!this.vitalsRes) {
        this.vitalsRes = this.vitalsRes.map(item => {
          const vitalName = this.vitalList.find((datas: any) => {
            if (datas.vitalType === item.vitalTypeID) {
              return datas;
            } else {
              return '';
            }
          });
          item.vitalName = vitalName?.name;
          try {
            item.vitalData = JSON.parse(item.vitalData);
          } catch {
            item.vitalData = {};
          }
          return item;
        });
      }
      this.arrangeVitalData();
      this.everyMinuteNotification();
    });
  }

  arrangeVitalData() {
    this.vitalsOriginal = [];
    this.vitalsRes = this.vitalsRes.map(item => {
      if (item?.vitalName === 'Blood Pressure') {
        const payload = {
          name: 'Blood Pressure',
          time: item.vitalDate,
          value: item.vitalData.S + '/' + item.vitalData.D
        };
        //  this.vitalString = + payload.toString();
        this.vitalsOriginal.push(payload);
        return item.vitalData.S + '/' + item.vitalData.D;
      } else if (item?.vitalName === 'Temperature') {
        const payload = {
          name: 'Temperature',
          time: item.vitalDate,
          value: item.vitalData.T
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.T;
      } else if (item?.vitalName === 'Weight') {
        const payload = {
          name: 'Weight',
          time: item.vitalDate,
          value: item.vitalData.W
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.W;
      } else if (item?.vitalName === 'Glucose') {
        const payload = {
          name: 'Glucose',
          time: item.vitalDate,
          value: item.vitalData.V
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.V;
      } else if (item?.vitalName === 'SPO2') {
        const payload = {
          name: 'SPO2',
          time: item.vitalDate,
          value: item.vitalData.O
        };
        this.vitalsOriginal.push(payload);
        return item.vitalData.O;
      }
    });
  }

  everyMinuteNotification() {
    this.timmerLoad = setInterval(() => {
      this.getVitals();
    }, 2000);
  }

  ngOnDestroy() {
    clearInterval(this.timmerLoad);
  }

}
