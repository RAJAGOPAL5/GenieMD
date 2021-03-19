import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyForm: FormGroup;
  historyDialogRef: any;
  data = [];
  profile: any;

  constructor(
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.profile = this.profileService.profile;
    this.createForm();
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
      date: moment().format('MM-DD-YYYY')
    };
    this.data.push(payload);
    this.toastrService.success('Data added successfully', 'Success');
    this.historyDialogRef.close();
    this.historyForm.reset();
  }
}
