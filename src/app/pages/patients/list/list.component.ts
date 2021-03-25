import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { debounceTime, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterDialogComponent } from 'src/app/shared/components/filter-dialog/filter-dialog.component';
import { AddComponent } from 'src/app/shared/components/add/add.component';

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
    monitored: -1
  };
  users: any = [];
  isLoading = false;
  searchText: any;
  clinic: any;
  filterPayload = { firstName: '', lastName: '', dob: '', gender: '' };
  isFilter = false;
  registrationForm: FormGroup;
  dialogRef: any;
  isSearching: boolean;
  searchValue = { firstName: '', lastName: '', dob: '', gender: 0, monitored: -1 };
  payloadScroll: any;
  payloadFilter = { pageNumber: 1 };
  serviceHandle: boolean;
  filterStatus: boolean;
  patientData: any;
  userId: any;
  constructor(
    private patientService: PatientsService,
    private profileService: ProfileService,
    private clinicService: ClinicService,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private translate: TranslateService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic;
    this.userId = this.route.parent.snapshot.params.userID;

    this.loadNext(undefined, this.model.monitored);
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
      this.payloadScroll.pageNumber = 1;
      this.loadNext('search', this.model.monitored);
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
        this.payloadScroll.pageNumber = 1;
        this.loadNext('add', this.model.monitored);
      }
    });
  }

  filterPatient() {
    const modal = this.dialogService.open(FilterDialogComponent, {});
    modal.componentRef.instance.data = this.filterPayload;
    modal.onClose.subscribe(data => {
      if (!!data && data.type === 'filter') {
        this.users = [];
        this.searchText = '';
        this.users = data.data;
        this.filterPayload = data.payload;
        this.payloadFilter = data.payloadService;
        this.filterStatus = true;
        this.isSearching = false;
        this.payloadFilter.pageNumber++;
      } else if (!!data && data.type === 'clear') {
        this.filterPayload = { firstName: '', lastName: '', dob: '', gender: '' };
      }
      this.showBadge();
      return;
    });
  }

  loadNext(search?: string, monitored?: number) {
    this.payloadScroll = {
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      userID: this.profileService.id,
      count: 100,
      pageNumber: 1,
      monitored: this.model.monitored,
    };
    console.log('monitored', monitored);
    this.isLoading = true;
    /* Filter infinite scroll */
    if (this.filterStatus && !this.isSearching) {
      /* Eliminate multiple serveice call */
      if (this.serviceHandle) {
        return;
      }
      this.serviceHandle = true;
      /* end */

      this.clinicService.searchPatients(this.payloadFilter).subscribe((data: any) => {
        this.serviceHandle = false;
        if (this.users.length < data.total) {
          data.clinicPatientList.map(item => {
            item.name = `${item.firstName} ${item.lastName}`.trim();
            return item;
          });
          this.isLoading = false;
          this.payloadFilter.pageNumber++;
          this.users.push(...data.clinicPatientList);
          this.users.pageToLoadNext++;
          return;
        }
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error, 'Error');
      });

    } else {
      /* Default and search infinite scroll */

      /* Eliminate multiple serveice call */
      if (this.serviceHandle) {
        return;
      }
      this.serviceHandle = true;
      /* End */

      if (search !== undefined) {
        this.users = [];
      }
      if (monitored === undefined) {
        delete this.payloadScroll.monitored;
      } else {
        this.users = [];
        this.payloadScroll.name = this.searchText;
        this.payloadScroll.monitored = monitored;
        this.payloadScroll.pageNumber = 1;
      }
      // tslint:disable-next-line:no-unused-expression
      // this.searchText.length >= 0 && monitored === undefined ? this.payloadScroll.name = this.searchText : '';
      this.patientData = this.patientService.find(this.payloadScroll).subscribe((data: any) => {
        this.serviceHandle = false;
        this.filterStatus = false;
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
        return;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error, 'Error');
      });
    }
  }
  getCompactView() {
    this.router.navigate([this.clinicService.id, this.userId, 'dashboard', 'patients']);
  }
}
