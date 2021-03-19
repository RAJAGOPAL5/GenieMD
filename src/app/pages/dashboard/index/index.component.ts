import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AddComponent } from 'src/app/shared/components/add/add.component';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { DataService } from 'src/app/shared/service/data.service';
import { ProfileService } from 'src/app/shared/service/profile.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  tabs: any[];
  constructor(
    private dialogService: NbDialogService,
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
    this.prepareTabs();
  }
  prepareTabs() {
    this.tabs = [
      {
        title: 'Patients',
        route: `patients`,
      },
      {
        title: 'Adherence',
        route: `adherence`,
      },
      {
        title: 'Measurements',
        route: `measurements`,
      }
    ];
  }

  addPatient(patientID?: number) {
    const modal = this.dialogService.open(AddComponent, { closeOnBackdropClick: false });
    modal.componentRef.instance.patientID = patientID;
    modal.onClose.subscribe(data => {
      if (!!data) {
        this.dataService.updatePatientList(true);
      }
    });
  }

}
