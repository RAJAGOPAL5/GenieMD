import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/service/language.service';
@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  isLoading = false;
  form: FormGroup = this.fb.group({
    firstName: [''],
    lastName: [''],
    gender: ['male'],
    dob: [''],
  });
  constructor(
    private fb: FormBuilder,
    private ls: LanguageService,
    private translate: TranslateService,
    protected dialogRef: NbDialogRef<any>
  ) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }

  startSearch(): void { }
}
