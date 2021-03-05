import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import { vitals } from 'src/app/shared/constant/constant';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { VitalsService } from 'src/app/shared/service/vitals.service';
import { extendMoment } from 'moment-range';
const momentRange = extendMoment(moment);

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
  chartInfo: { patientId: string; fromDate: number; toDate: number; eventRange : string };
  form: FormGroup = this.formBuilder.group({
    dateRange: ''
  });
  constructor(
    private vitalsService: VitalsService, private profileService: ProfileService,
    private ls: LanguageService, private patientService: PatientsService,
    private translate: TranslateService, private route: ActivatedRoute,
    private clinicService: ClinicService, private formBuilder: FormBuilder) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }
  timeduration: any;
  duration!: any;
  userID: any;
  vitals = [];
  patientId: any;
  isLoading = false;
  event: any;
  ngOnInit(): void {
    console.log('route', this.route.snapshot.parent.params.patientId)
    this.route.parent.paramMap.subscribe(params => {
      console.log('params', params);
      this.patientId = params.get('patientId');
      this.getData(this.patientId);
    });

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
    this.chartInfo = { patientId: this.patientId, fromDate: fromDate, toDate: toDate, eventRange: event || 'all' };
  }
  getData(patientId) {
    this.isLoading = true;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: patientId
    };
    this.patientService.findById(payload).subscribe((data: any) => {
      this.isLoading = false;
      const patientData = data;
      let extraData;
      try {
        extraData = JSON.parse(patientData.extraData);
      } catch (error) {
        extraData = patientData.extraData || {};
      }
      if (!!extraData.vitals) {
        this.vitals = vitals.filter(k => (extraData.vitals || []).find(i => k.vitalType === i));
      } else {
        this.vitals = [];
      }
      this.patientId = patientData.userID
      const fromDates = moment('1900-02-01').valueOf();
      const toDates = moment().add(1, 'days').valueOf();
      this.chartInfo = { patientId: patientData.userID, fromDate: fromDates, toDate: toDates, eventRange: 'all' };
    }, error => {
      throw error;
    });
  }
  selectedDate() {
    console.log('dateRange');
  }
}
