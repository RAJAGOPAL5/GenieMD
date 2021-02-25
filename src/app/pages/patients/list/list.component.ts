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
    monitored: 0
  };
  users: any;
  isLoading = false;
  searchText = '';
  clinic: any;
  registrationForm: FormGroup;
  dialogRef: any;
  searchValue = { firstName: '', lastName: '', dob: '', gender: 0, monitored: 1 };
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
    this.createForm();
    this.getData();
  }

  getData() {
    this.isLoading = true;
    const payload = {
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      userID: this.profileService.id,
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
  addPatient(patientID?: number) {
    const modal = this.dialogService.open(AddComponent);
    modal.componentRef.instance.patientID = patientID;
    modal.onClose.subscribe(data => {
      if (!!data) {
        this.getData();
      }
    });
  }

  open(filter: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(FilterDialogComponent, {});
  }
  createForm() {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      gender: ['male'],
      dob: [''],

    });
  }
  startSearch() {
    console.log('data', this.registrationForm)
    if (this.registrationForm.valid) {
      if ((this.registrationForm.value.firstName != "" && this.registrationForm.value.firstName != null) ||
        (this.registrationForm.value.lastName != "" && this.registrationForm.value.lastName != null) ||
        (this.registrationForm.value.dob != "" && this.registrationForm.value.dob != null) ||
        (this.registrationForm.value.gender != "" && this.registrationForm.value.dob != null)) {
        const date = '';
        const payload = {
          clinicID: this.clinicService.id,
          firstName: this.registrationForm.value.firstName || '',
          lastName: this.registrationForm.value.lastName || '',
          dob: date || '',
          gender: this.registrationForm.value.gender || '',
          userID: this.profileService.id,
          pageNumber: 1,
          count: 25
        };
        this.clinicService.searchPatients(payload).subscribe((res: any) => {
          // console.log('data', res)
          this.users = res.clinicPatientList;
          this.dialogRef.close();
          // this.spinner.hide();

        }, error => {
          // this.toastrService.error(error.error ? error.error : 'Failed to search patient');
          // this.spinner.hide();

        }
        );
      }
    }
  }
}
