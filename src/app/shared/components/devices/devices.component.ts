import { Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { deviceTypes } from 'src/app/shared/constant/constant';
import { ProfileService } from '../../service/profile.service';
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
  deviceTypes: any;
  deleteDialogRef: NbDialogRef<any>;
  deviceList: any;

  @Output() deviceData: EventEmitter<any> = new EventEmitter();
  storeDevice: any;
  deviceIndex: any;
  @Input()

  get dataDevice() {
    return this.storeDevice;
  }

  set dataDevice(res) {
    this.storeDevice = res;
    this.getDevicePatch();
  }

  constructor(
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.createForm();
    // this.getDevices();
    this.deviceTypes = deviceTypes;
  }

  createForm() {
    this.deviceForm = this.fb.group({
      deviceType: ['', Validators.required],
      deviceName: ['', Validators.required],
      manufacturer: ['', Validators.required],
      serialNumber: ['']
    });
  }

  getDevices() {
    this.profileService.getDevices().subscribe((res: any) => {
    }, error => {
      this.toastrService.danger('Cannot get devices', 'Error');
    });
  }

  onchange(event) {
    this.deviceForm.patchValue({
      deviceName: event.name,
      manufacturer: event.manufacturer,
      serialNumber: event.model,
    });
  }

  getDevicePatch() {
    try {
      this.deviceList = JSON.parse(this.dataDevice);
    } catch (error) {
      this.deviceList = this.deviceList || [];
    }
  }


  open(devicedialog: TemplateRef<any>) {
    this.deviceDialogRef = this.dialogService.open(devicedialog, { closeOnBackdropClick: false });
  }

  refclose() {
    this.deviceDialogRef.close();
    this.deviceForm.reset();
  }

  openDialog(deleteDialog: TemplateRef<any>, indexList) {
    this.deleteDialogRef = this.dialogService.open(deleteDialog, { closeOnBackdropClick: false });
    this.deviceIndex = indexList;
  }

  save() {
    const payload = {
      deviceName: this.deviceForm.value.deviceName,
      manufacturer: this.deviceForm.value.manufacturer,
      serialNumber: this.deviceForm.value.serialNumber,
      deviceType: this.deviceForm.value.deviceType.type
    };
    this.data.push(payload);
    this.toastrService.success('Device added successfully', 'Success');
    this.deviceDialogRef.close();
    this.deviceForm.reset();
    this.deviceData.emit(this.data);
  }

  delete() {
    const item = this.deviceList.splice(this.deviceIndex, 1);
    this.deviceData.emit(this.deviceList);
    this.toastrService.success('Device deleted successfully', 'Success');
    this.deleteDialogRef.close();
  }

  close() {
    this.deleteDialogRef.close();
  }

}
