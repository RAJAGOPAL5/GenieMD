import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { FilterDialogComponent } from 'src/app/shared/components/filter-dialog/filter-dialog.component';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { DataService } from 'src/app/shared/service/data.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { AddComponent } from 'src/app/shared/components/add/add.component';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  isLoading = false;
  data = [];
  userId: any;
  searchText = '';
  filterPayload = { firstName: '', lastName: '', dob: '', gender: '' };
  users: any = [];
  payloadFilter = { pageNumber: 1 };
  isFilter = false;
  ColumnMode = ColumnMode;
  columns = [];
  pageNumber = 1;
  profile: any;
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  readonly pageLimit = 10;
  clinicVitals = [];

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private dataService: DataService,
    private el: ElementRef,
  ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
    this.dataService.patientData.subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (data == true) {
        this.getList();
      }
    });
  }

  ngOnInit(): void {
    this.profile = this.profileService.profile;
    this.columns = [
      { name: 'No.' },
      { prop: 'name', name: 'Name' }, { prop: 'dob', name: 'DOB', width: 10 },
      { name: 'Monitors', width: 10 },
      { prop: 'careManager', name: 'Assigned Care Manager' },
      { prop: 'patientID', name: 'Contact', width: 10 }];
    this.getList();
    this.userId = this.route.parent.snapshot.params.userID;
    this.clinicVitals = this.clinicService.getVitals();
  }
  open(id) {
    console.log('idd', id);
  }
  onCustomAction(event) {
    console.log('event', event);
  }

  getList() {
    this.isLoading = true;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      pageNumber: this.pageNumber,
    };
    this.patientService.find(payload)
      .subscribe((data: any) => {
        const clinicPatientList = data.clinicPatientList.map(item => {
          try {
            item.extraData = JSON.parse(item.extraData);
          } catch (error) {
            item.extraData = {};
          }
          item.vitals = this.getPatientVitals(item.extraData);
          item.name = `${item.firstName} ${item.lastName}`.trim();
          item.careManager = 'James';
          return item;
        });
        this.data = [...this.data, ...clinicPatientList];
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error, 'Error');
      });

  }
  getRow(event) {
    this.router.navigate([this.clinicService.id, this.userId, 'patients', event.data.patientID, 'vitals']);
  }

  filterPatient() {
    const modal = this.dialogService.open(FilterDialogComponent, {});
    modal.componentRef.instance.data = this.filterPayload;
    modal.onClose.subscribe(data => {
      if (!!data && data.type === 'filter') {
        this.searchText = '';
        this.data = data.data;
        this.filterPayload = data.payload;
        this.payloadFilter = data.payloadService;
        this.payloadFilter.pageNumber++;
      } else if (!!data && data.type === 'clear') {
        this.filterPayload = { firstName: '', lastName: '', dob: '', gender: '' };
      }
      this.showBadge();
      return;
    });
  }

  showBadge() {
    this.isFilter = Object.keys(this.filterPayload).some(k => {
      return !!this.filterPayload[k];
    });
  }
  getRowHeight(row) {
    return row.height;
  }
  onPage(event) {
    this.pageNumber = event.offset + 1;
    if (!this.isLoading) {
      this.getList();
    }
  }

  onScroll(offsetY: number) {
    // total height of all rows in the viewport
    const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= this.data.length * this.rowHeight) {
      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.data.length === 0) {
        // calculate the number of rows that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      console.log('limit', limit);
      this.pageNumber = limit;
      this.getList();
    }
  }
  getPatientVitals(extraData) {
    const vitals = extraData?.vitals || [];
    const patientVitals = [];
    vitals.map(item => {
      this.clinicVitals.map(k => {
        // tslint:disable-next-line:triple-equals
        if (k.id == item) {
          patientVitals.push(k.name);
        }
      });
    });
    return patientVitals.length ? patientVitals.toString() : 'No vitals enabled';
  }
  onActivate(event) {
    // tslint:disable-next-line:triple-equals
    if (event.type == 'click') {
      this.isLoading = true;
      this.router.navigate([this.clinicService.id, this.userId, 'patients', event.row.patientID, 'vitals']);
    }
  }
  addPatient(patientID?: number) {
    const modal = this.dialogService.open(AddComponent, { closeOnBackdropClick: false });
    modal.componentRef.instance.patientID = patientID;
    modal.onClose.subscribe(data => {
      if (!!data) {
        this.getList();
      }
    });
  }
}
