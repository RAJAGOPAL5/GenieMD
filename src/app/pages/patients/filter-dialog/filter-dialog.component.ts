import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
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
    protected dialogRef: NbDialogRef<any>
  ) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }
}
