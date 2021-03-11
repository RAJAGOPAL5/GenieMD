import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  deviceForm: FormGroup;
  defaultColumns = ['Device Type', 'Serial Number', 'Manufacturer'];
  // dataSource: NbTreeGridDataSource<FSEntry>;
  deviceDialogRef: NbDialogRef<any>;
  deviceList = [];

  constructor(private fb: FormBuilder, 
    private dialogService: NbDialogService) { 
    // this.dataSource = this.dataSourceBuilder.create(this.data)
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.deviceForm = this.fb.group({
      deviceType: ['', Validators.required],
      manufacturer: ['', Validators.required],
      serialNumber: ['', Validators.required]     
    });
  }

  data =  [
    {
      data: { deviceType: 'Projects', serialNumber: 'dir', manufacturer: '1.8 MB'  },
      
    },
    {
      data: { deviceType: 'Reports', serialNumber: 'dir', manufacturer: '4kB'},
      
    }
   
  ];

  open(devicedialog: TemplateRef<any>) {
    this.deviceDialogRef = this.dialogService.open(devicedialog);
  }
  
  refclose() {
    this.deviceDialogRef.close();
  }

  save(){
    console.log('raw', this.deviceForm.getRawValue());
    this.data.push({data: this.deviceForm.getRawValue()});
  }

}
