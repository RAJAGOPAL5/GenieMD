import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { ColumnMode } from '@swimlane/ngx-datatable';
import * as moment from 'moment';
import { ProfileService } from 'src/app/shared/service/profile.service';
import {AuditService} from 'src/app/shared/service/audit.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyForm: FormGroup;
  historyDialogRef: any;
  data = [];
  historyData: any;
  profile: any;
  isLoading = false;
  ColumnMode = ColumnMode;
  patientId: any;
  userID: string;
  description: '';

  constructor(
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private profileService: ProfileService,
    private auditService: AuditService,
    private clinicService: ClinicService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.profile = this.profileService.profile;
    this.patientId = this.route.snapshot.parent.params.patientId;
    this.userID = this.profileService.id;
    this.createForm();
    this.getHistory();
    // this.addHistory()
  }

  createForm() {
    this.historyForm = this.fb.group({
      note: ['', Validators.required],
    });
  }

  open(historyDialog: TemplateRef<any>) {
    this.historyDialogRef = this.dialogService.open(historyDialog, { closeOnBackdropClick: false });
  }

  refclose() {
    this.historyDialogRef.close();
  }

  save() {
    const payload = {
      name: this.profile.screenName,
      note: this.historyForm.value.note,
      date: moment().format('MM-DD-YYYY'),
    };
    this.data.push(payload);
    this.toastrService.success('Data added successfully', 'Success');
    this.historyDialogRef.close();
    this.historyForm.reset();
  }
  getHistory() {
    this.isLoading = true;
    const data = {
      userId: this.userID,
      patientId: this.patientId
    };
    this.auditService.getAudits(data).subscribe((res: any) => {
      this.historyData = res.list;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }

  addHistory() {
    this.isLoading = true;
    const auditPayload = {
      userID: this.userID,
      auditType: 2,
      subjectID: this.route.snapshot.parent.params.patientId,
      action: '0',
      actionParam: 'Encounter',
      description: this.description,
      oemId: this.clinicService.clinic.oemID,
      clinicID: this.clinicService.id,
      name: this.profile.screenName
    };
    this.auditService.addAudits(auditPayload).subscribe((res: any) => {
      this.historyDialogRef.close();
      this.getHistory();
      this.description = '';
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }

}
