import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/shared/service/patients.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: any;
  isLoading = false;
  searchText = '';
  constructor(private patientService: PatientsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    const payload = {
      clinicID: localStorage.getItem('clinicId'),
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
