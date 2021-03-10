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
  chartInfo: { patientId: string; fromDate: any; toDate: any; eventRange? : string };
  form: FormGroup = this.formBuilder.group({
    dateRange: ''
  });
  constructor(
    private vitalsService: VitalsService, private profileService: ProfileService,
    private ls: LanguageService, private patientService: PatientsService,
    private translate: TranslateService, private route: ActivatedRoute,
    private clinicService: ClinicService, private formBuilder: FormBuilder,
    ) {
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
  btnDeactive:any = 0;
  selectedDateRange = {
    start:new Date('1900-02-01'),
    end: new Date()
  }
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
    this.userID = this.profileService.id;
  }
  getList(event: any) {
    let fromDate = moment().add(-118, 'years').valueOf();
    const toDate = moment().valueOf();
    if (event === '1w') {
      this.btnDeactive=1;
      fromDate = moment().add(-7, 'days').valueOf();
    } else if (event === '1m') {
      this.btnDeactive=2;
      fromDate = moment().add(-1, 'months').valueOf();
    } else if (event === '3m') {
      this.btnDeactive=3;
      fromDate = moment().add(-3, 'months').valueOf();
    } else if (event === '6m') {
      this.btnDeactive=4;
      fromDate = moment().add(-6, 'months').valueOf();
    } else if (event === '1y') {
      this.btnDeactive=5;
      fromDate = moment().add(-1, 'years').valueOf();
    } else if (event === 'all') {
      this.btnDeactive=0;
      fromDate = moment('1900-02-01').valueOf();
    }
    this.selectedDateRange = {
      start: new Date(fromDate),
      end: new Date(toDate)
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
      this.patientId = patientData.userID
      const fromDates = new Date(this.selectedDateRange.start).getTime();
      const toDates = new Date(this.selectedDateRange.end).getTime();
      this.chartInfo = { patientId: patientData.userID, fromDate:fromDates, toDate:toDates };
      if (!!extraData.vitals) {
        this.vitals = vitals.filter(k => (extraData.vitals || []).find(i => k.vitalType === i));
      } else {
        this.vitals = [];
      }
    }, error => {
      throw error;
    });
  }
  selectedDate(event) {
    this.btnDeactive = 9;
    const ranges = event;
    if(ranges.start && ranges.end){
      this.chartInfo = { patientId: this.patientId, fromDate: ranges.start.getTime(), toDate: ranges.end.getTime()};
    }
  }
}