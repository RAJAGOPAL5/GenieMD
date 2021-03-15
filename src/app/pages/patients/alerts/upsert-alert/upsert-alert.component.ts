import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/service/language.service';

@Component({
  selector: 'app-upsert-alert',
  templateUrl: './upsert-alert.component.html',
  styleUrls: ['./upsert-alert.component.scss']
})
export class UpsertAlertComponent implements OnInit {
  alertData: any;
  constructor(
    private translate: TranslateService, private languageService: LanguageService,
    private toastrService: NbToastrService) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);

  }
  alertNote = '';
  notes = ['test data', 'test1 data', 'teyet', 'fdgfsg', 'fgsdfg'];
  ngOnInit(): void {
  }
  updateNotes() {
    this.notes.unshift(this.alertNote);
    this.alertNote = '';
    this.toastrService.success('Note added successfully');
  }
  closeModal() {
    console.log('test');
  }
}
