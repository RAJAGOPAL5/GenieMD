import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';

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

  constructor(private patientService: PatientsService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic;

    this.getData();
  }

  getData() {
    this.isLoading = true;
    const payload = {
      clinicID: this.clinic.clinicID,
      name: this.searchText,
      providerID: "",
      userID: localStorage.getItem('userID'),
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
}
