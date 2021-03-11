import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import {deviceTypes } from 'src/app/shared/constant/constant';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  deviceForm: FormGroup;
  deviceDialogRef: NbDialogRef<any>;
  isLoading = false;
  data = [];
  deviceTypes:any;

  @Output() deviceData: EventEmitter<any> = new EventEmitter();
  deleteDialogRef: NbDialogRef<any>;

  constructor(private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.deviceTypes= deviceTypes;
  }

  createForm() {
    this.deviceForm = this.fb.group({
      deviceType: ['', Validators.required],
      manufacturer: ['', Validators.required],
      serialNumber: ['']
    });
  }


  open(devicedialog: TemplateRef<any>) {
    this.deviceDialogRef = this.dialogService.open(devicedialog);
  }

  refclose() {
    this.deviceDialogRef.close();
    this.deviceForm.reset();
  }

  openDialog(deleteDialog: TemplateRef<any>) {
    this.deleteDialogRef = this.dialogService.open(deleteDialog);
  }

  save() {
    this.data.push(this.deviceForm.getRawValue());
    this.toastrService.success('Device added successfully');
    this.deviceDialogRef.close();
    this.deviceForm.reset();
    this.deviceData.emit(this.data);
  }

  delete(id) {
    const index = this.data.findIndex(x => x.id == id);
    const item = this.data.splice(index, 1);
    this.toastrService.success('Device deleted successfully');
    this.deleteDialogRef.close();
  }

  close() {
    this.deleteDialogRef.close();
  }

}
