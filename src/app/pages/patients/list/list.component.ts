import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: any;
  isLoading = false;
  searchText = '';
  clinic: any;
  registrationForm: FormGroup;
  formBuilder: any;
  searchValue = { firstName: '', lastName: '', dob: '', gender: 0, monitored: 1 };
  constructor(
    private patientService: PatientsService, private profileService: ProfileService,
    private clinicService: ClinicService, private dialogService: NbDialogService,
    private ls: LanguageService,private translate: TranslateService

    ) { 
      translate.use('en');
      translate.setTranslation('en', this.ls.state);  
    }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic;

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
    this.dialogService.open(filter, {});
  }
  createForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: [this.searchValue.firstName],
      lastName: [this.searchValue.lastName],
      gender: [this.searchValue.gender],
      dob: [this.searchValue.dob],

    });
  }
  startSearch(){
    debugger
    if((this.registrationForm.value.firstName != "" && this.registrationForm.value.firstName != null)){
      let date = "";
      if (this.registrationForm.value.dob && this.registrationForm.value.dob !== "") {
        date = this.registrationForm.value.dob.year + '-' + ('0' + (this.registrationForm.value.dob.month)).slice(-2) + '-' + ('0' + this.registrationForm.value.dob.day).slice(-2);
    };
  };
}
}
