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
    this.notesData.unshift(this.alertNote);
    this.alertNote = '';
    this.toastrService.success('Note added successfully');
  }
  closeModal() {
    this.dialogRef.close();
  }
  getRecords() {
    this.isLoading = true;
    this.alertService.getAlertActionsById(this.alertData.id).subscribe(data => {
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
