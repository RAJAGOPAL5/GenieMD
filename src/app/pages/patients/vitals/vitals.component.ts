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
  chartInfo: { patientId: string; fromDate: any; toDate: any; unit: string, range?: number };
  form: FormGroup = this.formBuilder.group({
    dateRange: ''
  });
  // clinicVitals: any[] = [];
  // vitalsList: any[];
  constructor(
    private vitalsService: VitalsService, private profileService: ProfileService,
    private languageService: LanguageService, private patientService: PatientsService,
    private translate: TranslateService, private route: ActivatedRoute,
    private clinicService: ClinicService, private formBuilder: FormBuilder,
    ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }
  timeduration: any;
  duration!: any;
  userID: any;
  vitals = [];
  patientId: any;
  isLoading = false;
  event: any;
  noOfDays = -1;
  selectedDateRange = {
    start: new Date('1900-02-01'),
    end: new Date()
  };
  ngOnInit(): void {
    this.route.parent.paramMap.subscribe(params => {
      this.patientId = params.get('patientId');
      this.getData(this.patientId);
    });

    this.duration = -1;
    this.timeduration = [
      { title: '1 Week', val: 7, class: '' },
      { title: '1 Month', val: 31, class: '' },
      { title: '3 Month', val: 90, class: 'selected' },
      { title: '6 Month', val: 180, class: '' },
      { title: '1 Year', val: 365, class: '' },
      { title: 'All', val: -1, class: '' }];
    this.userID = this.profileService.id;
    // this.clinicVitals = this.clinicService.getVitals();
    // this.vitalsList = this.clinicVitals;
  }
  getList(event: any) {
    let fromDate = moment().add(-118, 'years').valueOf();
    const toDate = moment().valueOf();
    this.noOfDays = event;
    let unit;
    switch (event) {
      case -1: fromDate = moment('1900-02-01').valueOf(); unit = 'month'; break;
      case 7: fromDate = moment().add(-7, 'days').valueOf(); unit = 'day'; break;
      case 31: fromDate = moment().add(-1, 'months').valueOf(); unit = 'day'; break;
      case 90: fromDate = moment().add(-3, 'months').valueOf(); unit = 'month'; break;
      case 180: fromDate = moment().add(-6, 'months').valueOf(); unit = 'month'; break;
      case 365: fromDate = moment().add(-1, 'years').valueOf(); unit = 'month'; break;
      default: fromDate = moment().add(-118, 'years').valueOf(); unit = 'month';
    }
    this.selectedDateRange = {
      start: new Date(fromDate),
      end: new Date(toDate)
    };
    this.chartInfo = { patientId: this.patientId, fromDate, toDate, unit, range: event  };
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
      this.patientId = patientData.userID;
      const fromDates = new Date(this.selectedDateRange.start).getTime();
      const toDates = new Date(this.selectedDateRange.end).getTime();
      this.chartInfo = { patientId: patientData.userID, fromDate: fromDates, toDate: toDates, unit: 'month', range: -1};
      if (!!extraData.vitals) {
        this.vitals = this.vitals.filter(k => (extraData.vitals || []).find(i => k.vitalType === i));
      } else {
        this.vitals = [];
      }
    }, error => {
      throw error;
    });
  }
  selectedDate(event) {
    const ranges = event;
    if (ranges.start && ranges.end) {
      const days = moment(ranges.end).diff(moment(ranges.start), 'days');
      this.chartInfo = {
        patientId: this.patientId,
        fromDate: ranges.start.getTime(),
        toDate: ranges.end.getTime(),
        unit: days <= 31 ? 'day' : 'month',
        range: 0
      };
    }
  }
}
