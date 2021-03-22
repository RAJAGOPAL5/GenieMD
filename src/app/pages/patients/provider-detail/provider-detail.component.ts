import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { DataService } from 'src/app/shared/service/data.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ScheduleService } from 'src/app/shared/service/schedule.service';
import * as _ from 'underscore';

const timeZone = require('moment-timezone');
const momentjs = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(momentjs);
@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.scss']
})
export class ProviderDetailComponent implements OnInit {
  clinicID: string;
  clinic: any;
  cliniConfig: any;
  userID: string;
  npiId: string;
  patientID: string;
  appointmentlistResult: any;
  isLoading = false;
  date = new Date();
  dateTag = false;
  selectedDate: any;
  advScheduleDate: Date;
  takenAppointments: any;
  Slotsavailables: any;
  data: any;
  providerGMTOffset: any;
  isNext = true;
  count = 1;
  forFirstAvailableDate = true;
  firstAvailableDate: any;
  timeSlots = [];
  videoFee: any;
  callbackFee: any;
  asyncFee: any;
  scheduleFeeList: any;
  providerDetails: any;
  providerData: any;
  providerName: any;
  serviceType: any;
  OffLine = false;
  waitingRoom = false;
  calander = false;
  scheduleVisit = false;
  asyncVisit = false;
  callBack = false;
  spinner: any;
  wType: number;
  wCount: number;
  toasterService: any;
  selectedTimeSlot: any;
  AppointmentDay: number;
  scheduledFee: any;
  rescheduleTime: number;
  rescheduleSlot: any;
  oldStartTime: any;
  encounter: any;
  firstSlotTime: any;

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private router: Router,
    private scheduleService: ScheduleService,
    public config: NgbDatepickerConfig,
    private translate: TranslateService,
    private ls: LanguageService,
    private dataService: DataService
  ) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {
    this.clinicID = this.clinicService.id;
    this.clinic = this.clinicService.clinic;
    this.cliniConfig = this.clinicService.config;
    this.userID = this.profileService.id;
    this.npiId = '0';
    this.activatedRoute.parent.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
    });
    this.getAvailable();
    this.getProvidersList();
    this.getAppointments(this.userID);
  }

  getAppointments(userId) {
    this.scheduleService.getAppointmentList(userId).subscribe((data: any) => {
      this.appointmentlistResult = data.encounterList;
      console.log('appointment list', this.appointmentlistResult);
    });
  }

  getUserName(npiId) {
    this.profileService.getProviderName(this.npiId).subscribe((data: any) => {
      this.providerData = data;
      this.providerName = this.providerData.username;
    }, error => {
      this.isLoading = false;
    }
    );
  }

  getProvidersList() {
    this.isLoading = true;
    const payload = {
      categoryID: '',
      city: '',
      distance: 10000,
      itemsCount: 1000,
      latitude: 0.000000,
      longitude: 0.000000,
      name: '',
      networkId: this.clinicID,
      pageNumber: 1,
      practiceStates: '',
      // practiceType: 0,
      sortBy: 'name',
      specialties: '',
      // specialties: qryparams.speciality ? qryparams.speciality !== 'All' ? qryparams.speciality.trim() : '' : '',
      state: '',
      taxonomyCode: '',
      zipcode: ''
    };

    this.clinicService.getProvidersList(payload).subscribe((data: any) => {
      this.isLoading = false;
      // tslint:disable-next-line:triple-equals
      if (data.networkHcpList.find(a => a.npi == this.npiId)) {
        // tslint:disable-next-line:triple-equals
        this.providerDetails = data.networkHcpList.find(a => a.npi == this.npiId);
        console.log(this.providerDetails, 'providerDetails name');
        const payLoad = {
          userID: this.userID,
          clinicID: this.clinicID,
          providerID: this.providerName,
          types: [
            { type: 6, providerOnly: true, status: [0, 1, 4] },
            { type: 0, providerOnly: false, status: [0, 1] },
            { type: 3, providerOnly: false, status: [0, 1] },
            { type: 4, providerOnly: true, status: [7], },
            { type: 7, providerOnly: true, status: [2] },
            { type: 1, providerOnly: true, status: [0, 1, 4] }
          ]
        };
        this.providerAvailableDetails(payLoad);
      }
    }, err => {
      this.isLoading = false;
      this.toastrService.danger(err.error.errorMessage ? err.error.errorMessage : this.translate.instant('kSomethingWentWrong'));

    });
  }

  providerAvailableDetails(payLoad) {
    // tslint:disable-next-line:no-bitwise
    this.serviceType = this.providerDetails.serviceType;
    // tslint:disable-next-line:no-bitwise
    if ((this.serviceType & 1) === 0) {
      this.OffLine = true;
      this.waitingRoom = false;
      this.calander = false;
      this.scheduleVisit = false;
      this.asyncVisit = false;
      // tslint:disable-next-line:no-bitwise
    } else if ((this.serviceType & 2) === 2) {
      this.scheduleVisit = false;
      this.waitingRoom = true;
      this.calander = false;
      this.asyncVisit = false;
      // tslint:disable-next-line:triple-equals
      // tslint:disable-next-line:no-bitwise
    } else if ((this.serviceType & 8) === 8) {
      this.scheduleVisit = true;
      this.calander = false;
      this.waitingRoom = false;
      this.asyncVisit = true;
      // tslint:disable-next-line:triple-equals
      // tslint:disable-next-line:no-bitwise
    } else if ((this.serviceType & 16) === 16) {
      this.scheduleVisit = true;
      this.calander = false;
      this.callBack = true;
      this.asyncVisit = false;
    } else {
      this.calander = false;
      this.OffLine = false;
      this.callBack = false;
      this.waitingRoom = false;
      this.scheduleVisit = false;
      this.asyncVisit = false;

    }
    // tslint:disable-next-line:no-bitwise
    if (this.serviceType & 4) {
      this.calander = true;
      this.getAvailable();

    }
    if (this.waitingRoom) {
      this.getStats(payLoad);
    }
    // if (!this.OffLine) {
    //   this.calander = true;
    // }


  }
  getStats(payLoad) {
    this.profileService.getUserStart(payLoad).subscribe((data: any) => {
      this.spinner.hide();

      data.types.forEach(i => {
        // tslint:disable-next-line:triple-equals
        if (i.type == 0) {
          // tslint:disable-next-line:triple-equals
        } else if (i.type == 1) {
          // tslint:disable-next-line:triple-equals
        } else if (i.type == 3) {
          // tslint:disable-next-line:triple-equals
        } else if (i.type == 4) {
          // tslint:disable-next-line:triple-equals
        } else if (i.type == 6) {
          this.wType = Number(i.type);
          this.wCount = Number(i.count);
          // tslint:disable-next-line:triple-equals
        } else if (i.type == 7) {

        }
      });
    }, err => {
      this.spinner.hide();
      this.toasterService.error(err.error.errorMessage ? err.error.errorMessage :
        this.translate.instant('kPhysicianProtocolsNotSetupCorrectly'));
    });
  }

  dataChange(date, event) {
    const classListArray = event.target.className;
    if (!classListArray.includes('custom-select') &&
      !classListArray.includes('ngb-dp-navigation-chevron') &&
      !classListArray.includes('btn btn-link ngb-dp-arrow-btn')) {
      this.isLoading = true;
      this.dateTag = false;
      this.selectedDate = new moment(date).format('YYYY/MM/DD');
      console.log('select', this.selectedDate);
      this.getAvailable();
    }
  }

  dateSelect() {
    this.dateTag = !this.dateTag;
  }

  getAvailable() {
    this.isLoading = true;
    const payload = {
      date: moment(this.selectedDate).format('x'),
      npiList: [this.npiId ? this.npiId : 1174784501]
    };
    this.scheduleService.getAvailableSlots(payload).subscribe((response: any) => {
      this.isLoading = false;
      let numberOfAdvScheduling;
      if (response.recurringScheduleListCollection[0].general) {
        if (Number(JSON.parse(response.recurringScheduleListCollection[0].general).numberOfAdvScheduling)) {
          numberOfAdvScheduling = Number(JSON.parse(response.recurringScheduleListCollection[0].general).numberOfAdvScheduling);
        } else {
          numberOfAdvScheduling = 30;
        }
      }
      const nowDate = new Date();
      this.advScheduleDate = new Date((nowDate.setDate(nowDate.getDate() + numberOfAdvScheduling)));
      console.log('adcScheduleDate', this.advScheduleDate);
      const someDate = new Date();
      const millDays = someDate.setDate(someDate.getDate() + numberOfAdvScheduling);
      const advDay = new Date(millDays).getDate();
      const advMonth = new Date(millDays).getMonth();
      const advYear = new Date(millDays).getFullYear();
      this.config.minDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
      this.config.maxDate = { year: advYear, month: advMonth + 1, day: advDay };
      this.config.outsideDays = 'hidden';
      this.takenAppointments = response.recurringScheduleListCollection[0].appointmentList;
      this.Slotsavailables = response.recurringScheduleListCollection.map((itemsAvailable) => {
        this.data = {};
        this.providerGMTOffset = itemsAvailable.providerGMTOffset;
        this.data.serviceType = itemsAvailable.serviceType;
        try {
          itemsAvailable._enabledDays = JSON.parse(itemsAvailable.enabledDays);
        } catch (error) {
          this.isLoading = false;
          itemsAvailable._enabledDays = {
            sunday: false,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
          };
        }

        try {
          const availableMessage = JSON.parse(itemsAvailable.comment);
          this.data.message = {
            commentMessage: availableMessage.commentMessage,
            cancellationEnabled: availableMessage.cancellationEnabled,
            cancellationPeriod: availableMessage.cancellationPeriod,
            cancellationFee: availableMessage.cancellationFee,
            callbackCharge: availableMessage.callbackCharge,
            videoDuration: availableMessage.videoDuration,
            callBackDuration: availableMessage.callBackDuration,
            clinicCode: availableMessage.clinicCode,
            callBackEnabled: availableMessage.callBackEnabled,
            videoChargeEnabled: availableMessage.videoChargeEnabled,
            videoCharge: availableMessage.videoCharge,
            intervalToFirstAppointmentSlot: availableMessage.intervalToFirstAppointmentSlot,
            noShowPeriod: availableMessage.noShowPeriod,
            noShowFee: availableMessage.noShowFee,
            noShowEnabled: availableMessage.noShowEnabled,
            states: availableMessage.states,
            asyncCharge: availableMessage.asyncCharge,
            asyncChargeEnabled: availableMessage.asyncChargeEnabled,
            online: availableMessage.online,
            currency: availableMessage.currency,
            currencyMultiplier: availableMessage.currencyMultiplier,
            waitingRoomURL: availableMessage.waitingRoomURL,
            numberOfAdvScheduling: availableMessage.numberOfAdvScheduling
          };
        } catch (e) {
          this.isLoading = false;
          this.data.message = {

          };
        }
        const recurring = _.chain(itemsAvailable.recurringScheduleList)
          .map((item: any) => {
            item.startTime = this.getTimeFromMins(item.startMin);
            item.endTime = this.getTimeFromMins(item.endMin);
            item.dayName = (moment.weekdays()[item.day - 1]);
            item.start = moment([moment().format('YYYY/MM/DD'), item.startTime].join(' '));
            item.end = moment([moment().format('YYYY/MM/DD'), item.endTime].join(' '));
            item.range = moment.range(item.start, item.end);
            return item;
          }).value();
        this.data.sunday = { items: _.where(recurring, { day: 1 }) || [], isOpen: Boolean(itemsAvailable._enabledDays.sunday) };
        this.data.monday = { items: _.where(recurring, { day: 2 }) || [], isOpen: Boolean(itemsAvailable._enabledDays.monday) };
        this.data.tuesday = { items: _.where(recurring, { day: 3 }) || [], isOpen: Boolean(itemsAvailable._enabledDays.tuesday) };
        this.data.wednesday = { items: _.where(recurring, { day: 4 }) || [], isOpen: Boolean(itemsAvailable._enabledDays.wednesday) };
        this.data.thursday = { items: _.where(recurring, { day: 5 }) || [], isOpen: Boolean(itemsAvailable._enabledDays.thursday) };
        this.data.friday = { items: _.where(recurring, { day: 6 }) || [], isOpen: Boolean(itemsAvailable._enabledDays.friday) };
        this.data.saturday = { items: _.where(recurring, { day: 7 }) || [], isOpen: Boolean(itemsAvailable._enabledDays.saturday) };
        this.data.ranges = recurring.map((item) => {
          return { range: item.range, day: item.day };
        });
        this.data.npi = itemsAvailable.npi;
        if (itemsAvailable.unavailableSchedules.count === 0) {
          this.data.breaks = [];
        } else {
          this.data.breaks = _.map(itemsAvailable.unavailableSchedules.unavailableScheduleList, function(item: any) {
            item.startTime = this.getTimeFromMins(item.fromMin);
            item.endTime = this.getTimeFromMins(item.toMin);
            item.fromDate = moment(item.unAvailabilityDateFrom).format('YYYY/MM/DD');
            item.allDay = item.allDay;
            item.toDate = moment(item.unAvailabilityDateTo).format('YYYY/MM/DD');
            return item;
          }, this);
        }
        this.data.bookings = _.map(itemsAvailable.appointmentList, (item: any) => {
          item.startAt = moment([moment(item.appointmentDate).format('YYYY/MM/DD'), this.getTimeFromMins(item.slot)].join(' '));
          item.allDay = false;
          return item;
        });
        return this.data;
      });

      // for skipping all-day unavailable dates
      const completedbreakDates = this.Slotsavailables[0].breaks.filter(item => item.allDay === true);
      completedbreakDates.forEach(item => {
        let unavailableTimeFrom = moment(item.unAvailabilityDateFrom).format('DD/MM/YYYY');
        let unavailableTimeTo = moment(item.unAvailabilityDateTo).format('DD/MM/YYYY');
        let selectedDate = moment(this.selectedDate).format('DD/MM/YYYY');
        unavailableTimeFrom = moment(unavailableTimeFrom, 'DD/MM/YYYY');
        unavailableTimeTo = moment(unavailableTimeTo, 'DD/MM/YYYY');
        selectedDate = moment(selectedDate, 'DD/MM/YYYY');
        // const unavailableTimeFrom = new Date(item.unAvailabilityDateFrom);
        // const unavailableTimeTo = new Date(new Date(item.unAvailabilityDateTo).setHours(23, 59, 59));
        // const selectedDate = new Date(this.selectedDate);
        if ((moment(selectedDate).isBetween(unavailableTimeFrom, unavailableTimeTo) ||
          selectedDate.isSame(unavailableTimeFrom) || selectedDate.isSame(unavailableTimeTo))
          && this.isNext) {
          this.nextDate();
        } else if (moment(selectedDate).isBetween(unavailableTimeFrom, unavailableTimeTo) && !this.isNext) { this.prevDate(); }
      });

      const inCompletedbreakDates = this.Slotsavailables[0].breaks.filter(item => item.allDay !== true);

      const availability = this.Slotsavailables.map((item) => {
        item.selectedDate = this.selectedDate;
        const newItem = {
          npi: item.npi, // item.id,
          slot: this.getAvailableSlotForDate(this.selectedDate)
        };
        return newItem;
      });
      // for dynamic time slot per day (eg: monday, tuesday)
      let slots = [];
      let endMinutes = 0;
      availability[0].slot.items.map(item => {
        slots = slots.concat(item.slots);
        if (endMinutes < item.endMin) {
          endMinutes = item.endMin;
        }
        // to remove the last reoccuring slot record with respect to the endMinutes
        if (endMinutes !== 0) {
          slots = slots.filter((data) => data.minutes < endMinutes);
        }
      });
      // let slots = availability[0].slot.items[0] ? availability[0].slot.items[0].slots : [];
      // const endMinutes = availability[0].slot.items[0] ? availability[0].slot.items[0].endMin : 0;
      // tslint:disable-next-line:triple-equals
      if (slots.length == 0) {
        if (this.isNext) {
          this.count = this.count + 1;
          if (this.count >= 30) {
            this.toastrService.danger(this.translate.instant('kNoAppointments3'));
            return;
          } else {
            this.nextDate();
          }
        } else {
          this.count = + 1;
          this.prevDate();
        }
      }

      if (this.forFirstAvailableDate && slots.length > 0) {
        this.forFirstAvailableDate = false;
        this.firstAvailableDate = this.selectedDate;
      }
      // if (endMinutes !== 0) {
      //   slots = slots.filter((item) => item.minutes < endMinutes);
      // }
      // for filtering slots from current time
      console.log('actual time slots', JSON.parse(JSON.stringify(slots)));


      // for filtering unavailable slots
      const unavailableSlot = [];
      console.log('incomplete-break-dates', inCompletedbreakDates);
      console.log('selected-dates', this.selectedDate);
      inCompletedbreakDates.forEach(item => {
        item.unAvailabilityDateFrom = moment(item.unAvailabilityDateFrom).format('DD/MM/YYYY');
        item.unAvailabilityDateTo = moment(item.unAvailabilityDateTo).format('DD/MM/YYYY');
        let currentDate = moment(this.selectedDate).format('DD/MM/YYYY');
        const startDate = moment(item.unAvailabilityDateFrom, 'DD/MM/YYYY');
        const endDate = moment(item.unAvailabilityDateTo, 'DD/MM/YYYY');
        currentDate = moment(currentDate, 'DD/MM/YYYY');
        // item.unAvailabilityDateFrom = moment(item.unAvailabilityDateFrom).format('YYYY/MM/DD');
        // if (new Date(item.unAvailabilityDateFrom).getFullYear() === new Date(this.selectedDate).getFullYear()) {
        //   if (new Date(item.unAvailabilityDateFrom).getMonth() === new Date(this.selectedDate).getMonth()) {
        //     if (new Date(item.unAvailabilityDateFrom).getDate() === new Date(this.selectedDate).getDate()) {
        if (currentDate.isBetween(startDate, endDate) || currentDate.isSame(startDate) || currentDate.isSame(endDate)) {
          slots.forEach((slot) => {
            const hh = parseInt(slot.HH.split(':')[0], 10);
            const mm = parseInt(slot.HH.split(':')[1], 10);
            const startTime = moment(item.startTime, ['h:mm A']).format('HH:mm');
            const endTime = moment(item.endTime, ['h:mm A']).format('HH:mm');
            const startHH = parseInt(startTime.split(':')[0], 10);
            const startMM = parseInt(startTime.split(':')[1], 10);
            const endHH = parseInt(endTime.split(':')[0], 10);
            const endMM = parseInt(endTime.split(':')[1], 10);
            const dayStartTime = new Date(new Date(new Date(this.selectedDate).setHours(startHH, startMM, 0)).getTime());
            const dayEndTime = new Date(new Date(new Date(this.selectedDate).setHours(endHH, endMM, 0)).getTime());
            const afterOffsetTime = new Date(new Date(this.selectedDate).setHours(hh, mm));
            if (moment(afterOffsetTime).isBetween(dayStartTime, dayEndTime) || moment(afterOffsetTime).isSame(dayStartTime)) {
              unavailableSlot.push(slot);
            }
          });
        }
      });

      this.timeSlots = slots.filter(value => -1 === unavailableSlot.indexOf(value));
      this.timeSlots = this.timeSlots.map(item => item)
        .filter((value, index, self) => self.indexOf(value) === index);
      // this.timeSlots = slots;
      console.log('filtered time slot', JSON.parse(JSON.stringify(this.timeSlots)));
      const gmtOffset = new Date().getTimezoneOffset();
      console.log('current offset', new Date().getTimezoneOffset());
      const providerOffset = this.providerGMTOffset * 60;
      console.log('provider offset', this.providerGMTOffset);
      const calculateTotalOffset = (gmtOffset) + (providerOffset);
      console.log('total offset', calculateTotalOffset);

      // for filtering overflowing slots for the day
      this.timeSlots = this.timeSlots.filter((item) => {
        const hh = parseInt(item.HH.split(':')[0], 10);
        const mm = parseInt(item.HH.split(':')[1], 10);
        const dayStartTime = new Date(new Date(new Date(this.selectedDate).setHours(0, 0, 0)).getTime());
        const dayEndTime = new Date(new Date(new Date(this.selectedDate).setHours(23, 59, 59)).getTime());
        const afterOffsetTime = new Date(new Date(this.selectedDate).setHours(hh, mm + ((-1) * calculateTotalOffset)));
        if (moment(afterOffsetTime).isBetween(dayStartTime, dayEndTime)) {
          return item;
        }
      });
      console.log('after filtering offset overflowing slots', this.timeSlots);
      // for changing time slot from the provider timezone to patient timezone
      this.timeSlots = this.timeSlots.map((item) => {
        const hh = parseInt(item.HH.split(':')[0], 10);
        const mm = parseInt(item.HH.split(':')[1], 10);
        const afterOffsetTime = new Date(new Date().setHours(hh, mm + ((-1) * calculateTotalOffset)));
        item.oldMinutes = item.minutes + ((-1) * (this.providerGMTOffset * 60));
        // item.oldMinutes = item.minutes;
        item.minutes = item.minutes + ((-1) * calculateTotalOffset);
        item.HH = JSON.stringify(afterOffsetTime.getHours()).concat(':' + JSON.stringify(afterOffsetTime.getMinutes()));
        item.hh = new Date(afterOffsetTime).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
        if (item.HH.split(':')[1].length === 1) {
          item.HH = item.HH.split(':')[0].concat(':' + '0' + item.HH.split(':')[1]);
        }
        return item;
      });
      console.log('after offset timeslots', this.timeSlots);
      // to filter the already taken time slot
      this.takenAppointments.map((item) => {
        // tslint:disable-next-line:triple-equals
        const index = this.timeSlots.findIndex(item2 => item2.oldMinutes == item.slot);
        // tslint:disable-next-line:triple-equals
        if (index != -1) {
          this.timeSlots.splice(index, 1);
        }
      });
      // for current day intervalToFirstAppointmentSlot calculation
      if ((new Date(this.selectedDate).getDate() === new Date().getDate()) && this.timeSlots.length) {
        try {
          this.firstSlotTime = this.Slotsavailables[0].message.intervalToFirstAppointmentSlot
            ? JSON.parse(this.Slotsavailables[0].message.intervalToFirstAppointmentSlot) : 0;
        } catch {
          this.firstSlotTime = this.Slotsavailables[0].message.intervalToFirstAppointmentSlot
            ? this.Slotsavailables[0].message.intervalToFirstAppointmentSlot : 0;
        }
        const m = moment();
        m.add(this.firstSlotTime, 'minutes');
        const minutes = (m.hour() * 60) + m.minute();
        this.timeSlots = _.filter(this.timeSlots, (slotitem: any) => minutes <= slotitem.minutes);
      }

      // for filtering slots from current time
      const filteredSlots = [];
      if (new Date(this.selectedDate).getDate() === new Date().getDate()) {
        this.timeSlots.forEach(item => {
          const hh = parseInt(item.HH.split(':')[0], 10);
          const mm = parseInt(item.HH.split(':')[1], 10);
          const timeSlot = new Date(new Date().setHours(hh, mm, 0)).getTime();
          const currentTime = new Date(new Date().setHours(new Date().getHours(), new Date().getMinutes())).getTime();
          console.log('time-slot-date', new Date(timeSlot));
          console.log('time-slot-date', new Date(currentTime));
          if (timeSlot > currentTime) {
            filteredSlots.push(item);
          }
        });
        this.timeSlots = filteredSlots;
      }
      this.videoFee = JSON.parse(response.recurringScheduleListCollection[0].general).videoCharge;
      this.callbackFee = JSON.parse(response.recurringScheduleListCollection[0].general).callbackCharge;
      this.asyncFee = JSON.parse(response.recurringScheduleListCollection[0].general).asyncCharge;
      this.scheduleFeeList = response.recurringScheduleListCollection[0].recurringScheduleList;
      console.log('video', this.videoFee);
      if (!this.videoFee) {
        this.videoFee = 0;
      }
      if (!this.callbackFee) {
        this.callbackFee = 0;
      }
      if (!this.asyncFee) {
        this.asyncFee = 0;
      }
    }, error => {
      console.log(error);
      this.toastrService.danger(error.error.errorMessage);
    });

  }


  getTimeFromMins(mins) {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    // tslint:disable-next-line:no-bitwise
    if (mins >= 24 * 60 || mins < 0) {
      // commented, dont throw any error as it will stop the code flow
      // throw new RangeError('Valid input should be greater than or equal to 0 and less than 1440.');
    }
    // tslint:disable-next-line:no-bitwise
    const h = mins / 60 | 0;
    // tslint:disable-next-line:no-bitwise
    const m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format('hh:mm a');
  }
  getOffDays() {
    const breaks = this.getBreakSlots();
    return _.chain(breaks).filter((item: any) => {
      return item.allDay;
    }).map((item: any) => {
      return moment(item.fromDate).format('YYYY/MM/DD');
    }).value();
  }

  getBreakSlots() {
    const breaks = this.Slotsavailables[0].breaks;
    return breaks.map((item) => {
      item.toDate = item.toDate || item.fromDate;
      item.startAt = moment([item.fromDate, item.startTime].join(' '));
      item.endAt = moment([item.toDate, item.endTime].join(' '));
      item._ranges = moment.range(item.startAt, item.endAt);
      const ranges = [];
      item._ranges.by('day', (time) => {
        const start = time.clone().hours(item.startAt.hours()).minutes(item.startAt.minutes());
        const end = time.clone().hours(item.endAt.hours()).minutes(item.endAt.minutes());
        ranges.push({ range: moment.range(start, end), allDay: item.allDay });
      });
      item.ranges = ranges;
      return item;
    });
  }

  getOffsetTime(slot: any) {
    const now = moment(this.selectedDate);
    const currentTime = moment();
    if (now.isSame(currentTime, 'day')) {
      now.hours(currentTime.hours()).minutes(currentTime.minutes());
    }

    const slotBreak = slot.break || 0;
    const interval = slot.interval || 0;
    const timeSlot = interval + slotBreak;


    if (now.isBetween(slot.startTime, slot.endTime) || slot.startTime.isBefore(now)) {
      return this.getNearMinute(slot.startTime, timeSlot);
    } else {
      return this.getNearMinute(slot.startTime, timeSlot);
    }
  }

  getNearMinute(date: any, interval) {
    let rounded = Math.round(date.minutes() / interval) * interval;
    // var rounded = (date.minutes() / interval) * interval;
    // added by sheik (instead of above line)
    rounded = Math.ceil(date.minutes() / interval) * interval;
    date.minutes(rounded);
    date.second(0);
    return date;
  }

  getColorScheme(time) {
    const morning = moment(this.selectedDate).hours(11).minutes(59);
    const evening = moment(this.selectedDate).hours(18).minutes(0);
    const night = moment(this.selectedDate).hours(18).minutes(0);
    const slot = this.getDateTime(time.hh);
    if (slot.isBefore(morning) || slot.isSame(morning)) {
      time.class = 'btn btn-warning';
    } else if (slot.isBefore(evening) || slot.isSame(morning)) {
      time.class = 'btn btn-primary btn_white';
    } else if (slot.isAfter(evening) || slot.isSame(evening)) {
      time.class = 'btn btn-default btn_white';
    }
    return time;
  }

  getDateTime(time, date?: any) {
    date = date || moment(this.selectedDate);
    return moment([date.format('YYYY/MM/DD'), time].join(' '));
  }

  getTimeSlots(slot, offsetTime) {
    const breakSlot = slot.break || 0;
    slot.endTime.add(slot.interval + breakSlot, 'minutes');
    const timeSlot = slot.interval + breakSlot;
    const minutes = slot.endTime.diff(offsetTime, 'minutes');
    const time = moment(this.selectedDate).hours(offsetTime.hours()).minutes(offsetTime.minutes());
    const now = new moment();
    return _.chain((minutes / timeSlot)).range().map((item) => {
      const start = moment(this.selectedDate);
      const end = moment(this.selectedDate).hours(23).minutes(59);
      if (time.isBetween(start, end) || now.isSame(time) || time.isSame(start)) {
        const data = this.getColorScheme({
          HH: time.format('H:mm'), hh: time.format('hh:mm a'), minutes: (time.hour() * 60) + time.minute()
        });
        time.add(timeSlot, 'minutes');
        return data;
      } else {
        time.add(timeSlot, 'minutes');
        return;
      }
    }).compact().filter((item) => {
      return this.isValidTimeSlot(slot, item);
    }).filter((item) => {
      return this.getValidTimeSlotFromBookings(slot, item);
    }).uniq('minutes').sortBy('minutes').value();
  }

  getValidTimeSlotFromBookings(slot, time) {
    const offsetTime = moment([slot.startTime.format('YYYY/MM/DD'), time.hh].join(' '));
    const bookings = this.data.bookings;
    const result = _.filter(bookings, (item: any) => {
      return offsetTime.isSame(item.startAt);
    });
    return result.length === 0;
  }

  isValidTimeSlot(slot, time) {
    const breaks = this.getBreakSlots();
    const offsetTime = moment([slot.startTime.format('YYYY/MM/DD'), time.hh].join(' '));
    const result = _.chain(breaks).pluck('ranges').flatten().find((item) => {
      return offsetTime.within(item.range) && !item.allDay || item.range.start.isSame(offsetTime, 'mintues');
    }).value();
    return !result;
  }

  getAvailableSlotForDate(date) {
    date = new moment(date);
    const name = date.format('dddd').toLowerCase();
    let day;
    // that = this,
    const breaks = this.getOffDays();
    if (this.Slotsavailables.length > 0) {
      day = this.Slotsavailables[0][name];
    }
    // day = this.get(name);
    if (!day.isOpen || breaks.indexOf(date.format('YYYY/MM/DD')) > -1) {
      return { items: [], isOpen: day.isOpen, name };
    }
    const items = _.chain(day.items).map((item: any) => {
      item.startTime = moment([date.format('YYYY/MM/DD'), item.startTime].join(' '));
      item.endTime = moment([date.format('YYYY/MM/DD'), item.endTime].join(' '));
      item._start = item.startTime.format('hh:mm a');
      item._end = item.endTime.format('hh:mm a');
      item.slots = [];
      item.minutes = (item.startTime.hour() * 60) + item.startTime.minute();
      const offsetTime = this.getOffsetTime(item);
      if (offsetTime.isBetween(item.startTime, item.endTime) || offsetTime.isSame(item.startTime)) {
        item.slots = this.getTimeSlots(item, offsetTime);
      }
      return item;
    }).uniq('minutes').sortBy('minutes').value();
    return { items, isOpen: day.isOpen, name };
  }

  nextDate() {
    const currentDate = new Date(this.selectedDate);
    const nextDate = new Date((currentDate.setDate(currentDate.getDate() + 1)));
    if ((moment(new Date(nextDate)).isBetween(new Date(), this.advScheduleDate))) {
      console.log('isBetween: ', true);
      this.date = nextDate;
      this.selectedDate = new moment(this.date).format('YYYY/MM/DD');
      this.isNext = true;
      this.getAvailable();
    } else {
      this.toastrService.danger(this.translate.instant('kExceedsAdvanceScheduleDate'));
    }
  }

  prevDate() {
    this.isNext = false;
    if (new Date(this.selectedDate) > new Date() && (this.selectedDate > this.firstAvailableDate)) {
      const currentDate = new Date(this.selectedDate);
      this.date = new Date((currentDate.setDate(currentDate.getDate() - 1)));
      this.selectedDate = new moment(this.date).format('YYYY/MM/DD');
      this.getAvailable();
    } else {
      this.toastrService.danger(this.translate.instant('kNoAppointmentsAvail'));
    }
  }

  getDate(type) {
    if (type && type !== '') {
      return type;
    } else {
      return 'Not specified';
    }
  }

  getColor() {
    this.dataService.color.subscribe((data: any) => {
      document.documentElement.style.setProperty('--primary-color', data);
    });
  }

  selectedTime(item) {
    this.selectedTimeSlot = item;
    const time = this.selectedTimeSlot;
    this.AppointmentDay = this.date.getDay() + 1;
    console.log('day', this.date.getDay());
    this.scheduleFeeList.map(items => {
      if (items.day === this.AppointmentDay) {
        this.scheduledFee = items.fee;
        console.log(items.fee);
        console.log('fee', this.scheduledFee);
      }
    }
    );
    if (!this.scheduledFee) {
      this.scheduledFee = 0;
    }
    const getTime = time.HH.split(':');
    const payload = {
      userID: this.userID,
      providerID: this.providerName,
      // startTime: moment(this.selectedDate).add('minutes', time.minutes).format('x'),
      // startTime: moment(new Date(this.selectedDate).toUTCString()).add('minutes', time.minutes).format('x'),
      startTime: new Date(this.selectedDate).setHours(getTime[0], getTime[1]),
      //  + (new Date().getTimezoneOffset() * 60 * 1000),
      duration: 20,
      type: 'CheckSlot'
    };
    const object = {
      slot: time.oldMinutes,
      providerName: this.providerName,
      npiID: this.npiId,
      // startTime: moment(this.selectedDate).add('minutes', time.minutes).format('x'),
      startTime: new Date(this.selectedDate).setHours(getTime[0], getTime[1]),
      //  + (new Date().getTimezoneOffset() * 60 * 1000),
      type: '1',
      userName: this.providerName,
      fee: this.scheduledFee
    };
    if (this.profileService.id) {
      this.rescheduleTime = new Date(this.selectedDate).setHours(getTime[0], getTime[1]);
      this.rescheduleSlot = time.oldMinutes;
    }
    this.dataService.addData(object);
    this.scheduleService.checkTimeSlot(payload).subscribe((data: any) => {
      if (data.slotAvailable) {
        if (this.profileService.id) {
          // this.cancelMeeting();
        } else {
          // this.pageRedirect();
        }
      } else {
        this.toastrService.danger(this.translate.instant('kStringTimeSlotNotAvailable'));
      }
    }, error => {
      this.toastrService.danger('Provider ID not found');
    });
  }

}
