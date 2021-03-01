import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { AddComponent } from '../add/add.component';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

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
  model: ViewModel = {
    monitored: 1
  };
  users: any;
  isLoading = false;
  searchText = '';
  clinic: any;
  filterPayload = { firstName: '', lastName: '', dob: '', gender: ''};
  isFilter = false;
  registrationForm: FormGroup;
  dialogRef: any;
  searchValue = { firstName: '', lastName: '', dob: '', gender: 0, monitored: 1 };
  payloadScroll = {
    clinicID: this.clinicService.id,
    name: this.searchText,
    providerID: '',
    userID: this.profileService.id,
    count: 11,
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
    private translate: TranslateService

  ) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic;
    this.getData();
    this.showBadge();
  }

  getData(monitored?: number) {
    this.isLoading = true;
    const payload = {
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      userID: this.profileService.id,
      pageNumber: 1,
      count: 25,
      alarm: 0,
      monitored: monitored,
      morbidity: 0,
    };
    this.patientService.find(payload).subscribe((data: any) => {
      this.users = data.clinicPatientList.map(item => {
        item.name = `${item.firstName} ${item.lastName}`.trim();
        return item;
      });
      this.isLoading = false;
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
}
