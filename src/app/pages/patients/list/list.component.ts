import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { AddComponent } from '../add/add.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

interface ViewModel {
  search?: string;
  monitored?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  genter?: number;
}

@Component({
  selector: 'app-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('SearchInput', { static: true }) patientSearchInput: ElementRef;
  model: ViewModel = {
    monitored: 1
  };
  users: any = [];
  isLoading = false;
  searchText = '';
  clinic: any;
  filterPayload = { firstName: '', lastName: '', dob: '', gender: ''};
  isFilter = false;
  registrationForm: FormGroup;
  dialogRef: any;
  isSearching: boolean;
  searchValue = { firstName: '', lastName: '', dob: '', gender: 0, monitored: 1 };
  payloadScroll = {
    clinicID: this.clinicService.id,
    name: this.searchText,
    providerID: '',
    userID: this.profileService.id,
    count: 25,
    pageNumber: 1,
    monitored : this.model.monitored,
  };
  constructor(
    private patientService: PatientsService,
    private profileService: ProfileService,
    private clinicService: ClinicService,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private ls: LanguageService,
    private translate: TranslateService,
    private toastrService: NbToastrService,

  ) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic;
    this.showBadge();
    fromEvent(this.patientSearchInput.nativeElement, 'keydown').pipe(
      map((event: any) => {
        return event.target.value;
      })
      // , filter(res => res.length > 2)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.getData();
    });
  }

  getData(monitored?: number) {
    this.isLoading = true;
    // tslint:disable-next-line:prefer-const
    let payload = {
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      userID: this.profileService.id,
      pageNumber: 1,
      count: 25,
      // alarm: 0,
      monitored,
      // morbidity: 0,
    };
    // tslint:disable-next-line:no-unused-expression
    monitored === undefined ? payload.name === '' && delete payload.monitored : '';
    this.patientService.find(payload).pipe(debounceTime(1000)).subscribe((data: any) => {
      this.users = data.clinicPatientList
      .filter(item => (!!item.firstName || !!item.lastName))
      .map(item => {
        item.name = `${item.firstName} ${item.lastName}`.trim();
        return item;
      });
      this.isLoading = false;
      return;
    }, error => {
      this.isLoading = false;
    });
  }

  showBadge() {
    this.isFilter = Object.keys(this.filterPayload).some(k => {
      return !!this.filterPayload[k];
      });
  }
  addPatient(patientID?: number) {
    const modal = this.dialogService.open(AddComponent, { closeOnBackdropClick: false });
    modal.componentRef.instance.patientID = patientID;
    modal.onClose.subscribe(data => {
      if (!!data) {
        this.getData();
      }
    });
  }

  filterPatient() {
    const modal = this.dialogService.open(FilterDialogComponent, {});
    modal.componentRef.instance.data = this.filterPayload;
    modal.onClose.subscribe(data => {
      if (!!data && data.type === 'filter') {
        this.users = data.data;
        this.filterPayload = data.payload;
      } else if (!!data && data.type === 'clear') {
        this.filterPayload = { firstName: '', lastName: '', dob: '', gender: ''};
        this.getData();
      }
      this.showBadge();
    });
  }

  loadNext() {
    /* Eleminate the initial call */
    if (this.isSearching) { this.isSearching = false; } else {
    /* Search infinite scroll */
    if (this.searchText.length > 0) {
      this.payloadScroll.name = this.searchText;
      this.isLoading = true;
      this.patientService.find(this.payloadScroll).subscribe((data: any) => {
        if (this.users !== undefined && this.users.length < data.total) {
          data.clinicPatientList = data.clinicPatientList.map(item => {
            item.name = `${item.firstName} ${item.lastName}`.trim();
            return item;
          });
          // tslint:disable-next-line:no-unused-expression
          data.clinicPatientList.length !== 0 ? this.users.push(...data.clinicPatientList) : '';
          this.payloadScroll.pageNumber++;
        }
        this.isLoading = false;
        return true;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error);
      });
    } else {
        /* Default infinite scroll */
      this.isLoading = true;
      this.patientService.find(this.payloadScroll).subscribe((data: any) => {
        if (this.users !== undefined && this.users.length < data.total) {
          data.clinicPatientList = data.clinicPatientList.map(item => {
            item.name = `${item.firstName} ${item.lastName}`.trim();
            return item;
          });
          // tslint:disable-next-line:no-unused-expression
          data.clinicPatientList.length !== 0 ? this.users.push(...data.clinicPatientList) : '';
          this.payloadScroll.pageNumber++;
        }
        this.isLoading = false;
        return true;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error);
      });
    }
  }
  }
}
