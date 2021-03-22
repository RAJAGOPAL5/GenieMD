import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ScheduleService } from 'src/app/shared/service/schedule.service';


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
  columns = [];


  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService
  ) {

  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userID;
    this.getRecords();
    this.columns = [
      { prop: 'type', name: 'Type' },
      { prop: 'startTime', name: 'startDate' },
      { prop: 'duration', name: 'Duration' },
      { prop: 'imageUrl', name: 'ImageUrl' },
      { prop: 'patientId', name: 'PatientId' }];
  }


  getRecords() {
    this.isLoading = true;
    this.scheduleService.getAppointmentList(this.userId).subscribe((data: any) => {
      this.data = data.encounterList.map(item => {
        item.duration = item.meeting.duration;
        item.imageUrl = item.meeting.imageUrl;
        item.startDate = item.meeting.startTime;
        item.patientId = item.patientID;
        item.type = item.type;
        return item;
      });
      this.isLoading = false;
    }, error => {
      console.log('error', error);
      this.isLoading = false;
    });
  }

}

