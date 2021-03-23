import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ScheduleService } from 'src/app/shared/service/schedule.service';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';





@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  userId: any;
  isLoading = false;
  data = [];
  ColumnMode = ColumnMode;
  cancelDialogRef: NbDialogRef<any>;
  cancelDialog: NbDialogRef<any>;
  deviceIndex: any;
  deleteObj: any;


  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private dialogService: NbDialogService,
    private translate: TranslateService,
    private toastrService: NbToastrService

    ) {

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userID;
    this.getRecords();
  }


  getRecords() {
    this.isLoading = true;
    this.scheduleService.getAppointmentList(this.userId).subscribe((data: any) => {
      this.data = data.encounterList.map(item => {
        item.duration = item.meeting.duration;
        item.startDate = item.meeting.startTime;
        item.PatientID = item.patientID;
        item.type = item.meeting.subject;
        return item;
      });
      this.isLoading = false;
    }, error => {
      console.log('error', error);
      this.isLoading = false;
    });
  }
  openDialog(cancelDialog: TemplateRef<any>, item) {
    this.deleteObj = {
      userID: this.userId,
      flag: 0,
      isOrganizer: false,
      meetingID: item.meetingID
    };
    this.cancelDialog = this.dialogService.open(cancelDialog, { closeOnBackdropClick: false });
  }
  deleteAppointment() {
    this.scheduleService.deleteAppointment(this.deleteObj).subscribe((data: any) => {
      this.toastrService.success(this.translate.instant('Appointment Cancelled Successfully'));
      this.getRecords();
      this.cancelDialog.close();
    }, error => {
      this.toastrService.danger(error.error.errorMessage);

    });
  }
  close() {
    this.cancelDialog.close();
  }

}

