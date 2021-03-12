import { Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import {deviceTypes } from 'src/app/shared/constant/constant';
import { ProfileService } from '../../service/profile.service';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit{

  deviceForm: FormGroup;
  deviceDialogRef: NbDialogRef<any>;
  isLoading = false;
  data = [];
  deviceTypes:any;
  deleteDialogRef: NbDialogRef<any>;
  deviceList: any;

  @Output() deviceData: EventEmitter<any> = new EventEmitter();
  storeDevice: any;
  @Input() 

  get dataDevice() {
    return this.storeDevice;
  }

  set dataDevice(res){
    this.storeDevice = res;
    console.log('res', res);
    this.getDevicePatch();
  }
  
  constructor(private fb: FormBuilder,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.createForm();
    // this.getDevices();
    this.deviceTypes= deviceTypes;
  }

  createForm() {
    this.deviceForm = this.fb.group({
      deviceType: ['', Validators.required],
      deviceName: ['', Validators.required],
      manufacturer: ['', Validators.required],
      serialNumber: ['']
    });
  }

  getDevices(){
    this.profileService.getDevices().subscribe((res: any) => {
      console.log('get devices', res);
    }, error => {
      this.toastrService.danger('Cannot get devices');
    });
  }

  getDevicePatch(){
    try{
      this.deviceList = JSON.parse(this.dataDevice);
      console.log('device list', this.deviceList)
    }
    catch (error) {
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

  openDialog(deleteDialog: TemplateRef<any>) {
    this.deleteDialogRef = this.dialogService.open(deleteDialog, { closeOnBackdropClick: false });
  }

  save() {
    this.data.push(this.deviceForm.getRawValue());
    this.toastrService.success('Device added successfully');
    this.deviceDialogRef.close();
    this.deviceForm.reset();
    this.deviceData.emit(this.data);
  }

  delete(id) {
    const index = this.deviceList.findIndex(x => x.id == id);
    const item = this.deviceList.splice(index, 1);
    this.toastrService.success('Device deleted successfully');
    this.deleteDialogRef.close();
  }

  close() {
    this.deleteDialogRef.close();
  }

}
