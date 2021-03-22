import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/shared/service/alert.service';
import { LanguageService } from 'src/app/shared/service/language.service';

@Component({
  selector: 'app-upsert-alert',
  templateUrl: './upsert-alert.component.html',
  styleUrls: ['./upsert-alert.component.scss']
})
export class UpsertAlertComponent implements OnInit {
  order = 'actionTime';
  alertData: any;
  isLoading = false;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private toastrService: NbToastrService,
    protected dialogRef: NbDialogRef<any>, private alertService: AlertService) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);

  }
  alertNote = '';
  notesData = [];
  ngOnInit(): void {
    this.getRecords();
  }
  updateNotes() {
    this.isLoading = true;
    const payload = {
      alertID: this.alertData.id,
      actionType: 1,
      actionData: JSON.stringify({ notes: this.alertNote }),
      patientID: this.alertData.patientID
    };
    this.alertService.addAlertAction(payload).subscribe(data => {
      const addedNote = data;
      try {
        addedNote.actionData = JSON.parse(addedNote.actionData);
      } catch (error) {
        addedNote.actionData = addedNote.actionData;
      }
      this.isLoading = false;
      this.notesData.unshift(addedNote);
      this.alertNote = '';
      this.toastrService.success('Note added successfully', 'Success');
    }, error => {
      this.isLoading = false;
      this.toastrService.danger('Could not add note', 'Error');
      throw error;
     });
  }
  closeModal() {
    this.dialogRef.close();
  }
  getRecords() {
    this.isLoading = true;
    this.alertService.getAlertActionsById(this.alertData?.id).subscribe(data => {
      this.notesData = (data.list || []).map(item => {
        try {
          item.actionData = JSON.parse(item.actionData);
        } catch (error) {
          item.actionData = item.actionData;
        }
        return item;
      });
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }
}
