import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { UpsertAlertComponent } from './upsert-alert/upsert-alert.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  isLoading = false;
  resolveDialogRef: NbDialogRef<any>;
  selectedAlert: any;
  alerts = [
    {
      id: 1,
      alertType: 1,
      alertStatus: 1,
      alertTime: 1615629367000,
      alertAttended: 0,
      alertResolved: 0,
      alertData: '{"note":"she is ok!"}',
      patientID: 'awtest',
      clinicID: '1000089'
    },
    {
      id: 2,
      alertType: 1,
      alertStatus: 1,
      alertTime: 1615629367000,
      alertAttended: 0,
      alertResolved: 0,
      alertData: '{"note":"she is ok!"}',
      patientID: 'awtest',
      clinicID: '1000089'
    },
    {
      id: 3,
      alertType: 1,
      alertStatus: 1,
      alertTime: 1615629367000,
      alertAttended: 0,
      alertResolved: 0,
      alertData: '{"note":"she is ok!"}',
      patientID: 'awtest',
      clinicID: '1000089'
    },
    {
      id: 4,
      alertType: 1,
      alertStatus: 1,
      alertTime: 1615629367000,
      alertAttended: 0,
      alertResolved: 0,
      alertData: '{"note":"she is ok!"}',
      patientID: 'awtest',
      clinicID: '1000089'
    },
    {
      id: 5,
      alertType: 1,
      alertStatus: 1,
      alertTime: 1615629367000,
      alertAttended: 0,
      alertResolved: 0,
      alertData: '{"note":"she is ok!"}',
      patientID: 'awtest',
      clinicID: '1000089'
    }
  ];
  constructor(private dialogService: NbDialogService, private toastrService: NbToastrService

  ) { }

  ngOnInit(): void {
  }
  getData() {
    console.log('alerts', this.alerts);
  }
  resolveConfirmation(template, id) {
    this.selectedAlert = id;
    this.resolveDialogRef = this.dialogService.open(template);
  }
  close(isClose: boolean) {
    if (isClose) {
      this.alerts.map(item => {
        // tslint:disable-next-line:triple-equals
        if (item.id == this.selectedAlert) {
          item.alertResolved = new Date().getTime();
        } else {
          item.alertResolved = item.alertResolved;
        }
      });
    }
    this.selectedAlert = null;
    this.toastrService.success('Alert resolved successfully');

    this.resolveDialogRef.close();
  }
  getStatus(status) {
    let alertStatus;
    switch (status) {
      case 1: alertStatus = 'Not Attended'; break;
      case 2: alertStatus = 'Being Attended'; break;
      case 3: alertStatus = 'Attended'; break;
      default: alertStatus = '-';
    }
    return alertStatus;
  }
  viewData(data) {
    console.log('datadata', data);
    const dialog = this.dialogService.open(UpsertAlertComponent);
    dialog.componentRef.instance.alertData = data;
  }
}
