import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
}

interface FSEntry {
  // deviceType: string;
  // manufacturer: string;
  // serialNumber: string;
}
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  deviceForm: FormGroup;
  defaultColumns = ['Device', 'Manufacturer', 'Serial Number' ];
  dataSource: NbTreeGridDataSource<FSEntry>;
  deviceDialogRef: NbDialogRef<any>;
  deviceList = [];

  constructor(private fb: FormBuilder, 
    private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,
    private dialogService: NbDialogService) { 
    this.dataSource = this.dataSourceBuilder.create(this.data)
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
      data: { deviceType: 'Projects', manufacturer: '1.8 MB', serialNumber: 'dir' },
      
    },
    {
      data: { deviceType: 'Reports', manufacturer: 'dir', serialNumber: '400 KB'},
      
    }
   
  ];

  open(devicedialog: TemplateRef<any>) {
    this.deviceDialogRef = this.dialogService.open(devicedialog);
  }
  
  refclose() {
    this.deviceDialogRef.close();
  }

  saveForm(){
    console.log('raw', this.deviceForm.getRawValue());
    this.data.push({data: this.deviceForm.getRawValue()});
  }

}
