import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: any;
  isLoading = false;
  searchText = '';
  clinic: any;

  constructor(
    private patientService: PatientsService, private profileService: ProfileService, private clinicService: ClinicService,
    private dialogService: NbDialogService) { }

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
  addPatient(){
    this.dialogService.open(AddComponent);
  }
}
