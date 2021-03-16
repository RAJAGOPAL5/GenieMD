import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/service/language.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  isLoading = false;
  form: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    gender: [''],
    dob: [''],
  });
  data: any;
  selectedGender = 'A';
  constructor(
    private fb: FormBuilder,
    protected dialogRef: NbDialogRef<any>,
    private profileService: ProfileService,
    private clinicService: ClinicService,
    private toastr: NbToastrService,
    private languageService: LanguageService,
    private translate: TranslateService,
  ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
   }

  ngOnInit(): void {
    if (this.data) {
      this.patchForm();
    }
  }
  patchForm() {
    this.form.patchValue({
      firstName: this.data.firstName ? this.data.firstName : '' ,
      lastName: this.data.lastName ? this.data.lastName : '',
      dob: this.data.dob ? this.data.dob : ''
    });
    this.selectedGender = this.data.gender ? this.data.gender : 'A';
  }
  close() {
    this.dialogRef.close({type: 'cancel'});
  }
  getGender(event, type) {
    if (event) {
      this.form.patchValue({
        gender: type
      });
    }
  }
  enableSearch() {
    const obj = this.form.getRawValue();
    const enableButton = Object.keys(obj).some(k => {
      return !!obj[k];
    });
    return !enableButton;
  }
  startSearch(): void {
    let date = '';
    if (this.form.value.dob && this.form.value.dob !== '') {
       date = this.form.value.dob.getFullYear() + '-' + (this.form.value.dob.getMonth() + 1) + '-' + this.form.value.dob.getDate();
    }
    const payload = {
      clinicID: this.clinicService.id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      // tslint:disable-next-line:triple-equals
      gender: this.form.value.gender == 'A' ? '' : this.form.value.gender,
      dob: date,
      userID: this.profileService.id,
      pageNumber: 1,
      count: 25
    };
    this.isLoading = true;
    this.clinicService.searchPatients(payload).subscribe((res: any) => {
      res.clinicPatientList.map(item => {
        item.name = `${item.firstName} ${item.lastName}`.trim();
        return item;
      });
      this.isLoading = false;
      this.dialogRef.close({data: res.clinicPatientList, type: 'filter', payload: this.form.getRawValue(), payloadService: payload});
    }, error => {
      this.isLoading = false;
      this.toastr.danger(error.error ? error.error : 'Failed to search patient');
    });
  }
  resetFilter() {
    this.form.reset();
  }
}
