import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AlertService } from 'src/app/shared/service/alert.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
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
  alerts = [];
  columns = [];
  ColumnMode = ColumnMode;
  patientId: any;
  constructor(
    private dialogService: NbDialogService, private toastrService: NbToastrService, private alertService: AlertService,
    private clinicService: ClinicService, private route: ActivatedRoute, private languageService: LanguageService,
    private translate: TranslateService) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }


  ngOnInit(): void {
    this.route.parent.params.subscribe(res => {
      this.patientId = res.patientId;
    });
    this.getData();
  }
  getData() {
    this.isLoading = true;
    const payload = {
      clinicID: this.clinicService.id,
      patientId: this.patientId
    };
    this.alertService.get(payload).subscribe(data => {
      this.isLoading = false;

      this.alerts = data.list;
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }
  resolveConfirmation(template, data) {
    this.selectedAlert = data;
    this.resolveDialogRef = this.dialogService.open(template);
  }
  close(isClose: boolean) {

    if (isClose) {
      console.log('this.selectedAlert', this.selectedAlert);
      this.selectedAlert.alertStatus = 3;
      // this.selectedAlert.alertResolved =  new Date().getTime();
      // this.selectedAlert.alertAttended =  new Date().getTime();

      this.isLoading = true;
      this.alertService.updateAlert(this.selectedAlert).subscribe(data => {
        this.isLoading = false;
        this.toastrService.success('Alert updated successfully', 'Success');
        this.getData();
      }, error => {
        this.isLoading = false;
        this.toastrService.danger('Failed to update alert', 'Failed');
      });
      // this.alerts.map(item => {
      //   // tslint:disable-next-line:triple-equals
      //   if (item.id == this.selectedAlert) {
      //     item.alertResolved = new Date().getTime();
      //   } else {
      //     item.alertResolved = item.alertResolved;
      //   }
      // });
    }
    this.selectedAlert = null;
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
  getType(type) {
    let alertType;
    switch (type) {
      case 1: alertType = 'Vital out of range'; break;
      case 2: alertType = 'Vital not measured'; break;
      case 3: alertType = 'Patient fell'; break;
      case 4: alertType = 'Patient SOS'; break;
      default: alertType = '-';
    }
    return alertType;
  }
  viewData(data) {
    const dialog = this.dialogService.open(UpsertAlertComponent);
    dialog.componentRef.instance.alertData = data;
  }
}
