import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/service/language.service';
import { vitals } from 'src/app/shared/constant/constant';
import { AlertService } from 'src/app/shared/service/alert.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ColumnMode } from '@swimlane/ngx-datatable';



@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListComponent implements OnInit {
  isLoading = false;
  limitList = [
    { id: 1, vital: 'test 1', rule: 'rule1' },
    { id: 2, vital: 'test 2', rule: 'rule2' },
    { id: 3, vital: 'test 3', rule: 'rule3' },
    { id: 4, vital: 'test 4', rule: 'rule4' }
  ];
  vitalsList = vitals;
  limitForm: FormGroup;
  alertDialog: NbDialogRef<any>;
  deleteDialog: NbDialogRef<any>;
  selectedData: any;
  ColumnMode = ColumnMode;

  @Input() patientID;
  clinicVitals: any[];
  // vitalsList: any[];
  constructor(
    private languageService: LanguageService,
    private translate: TranslateService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private clinicService: ClinicService
  ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }

  ngOnInit(): void {
    // const extendedSettings = this.clinicService.config.extendedSettings?.vitals;
    // let vitalList = [];
    // if (!!extendedSettings) {
    //   try {
    //     vitalList = JSON.parse(extendedSettings);
    //   } catch (error) {
    //     vitalList = [];
    //   }
    // }
    // this.vitalsList = vitalList;
    this.clinicVitals = this.clinicService.getVitals();
    this.vitalsList = this.clinicVitals;
    this.createForm();
    this.getList();
  }
  createForm() {
    this.limitForm = this.formBuilder.group({
      vital: '',
      rule: ''
    });
  }
  open(content) {
    this.alertDialog = this.dialogService.open(content);
  }
  close() {
    this.limitForm.reset();
    this.alertDialog.close();
  }
  save() {
    console.log('this.limitForm', this.limitForm.getRawValue());
    const formvalue = this.limitForm.getRawValue();
    const payload = {
      username: this.patientID,
      limit: {
        rule: formvalue.rule
      },
      typeID: formvalue.vital.vitalType

    };
    this.isLoading = true;
    this.alertService.addLimits(payload).subscribe(data => {
      this.isLoading = false;
      this.alertDialog.close();
      this.getList();
      this.toastrService.success('Added successfully', 'Success');
    }, error => {
      this.isLoading = false;
      this.toastrService.danger('Could not add data ', 'Error');
      throw error;
    });
  }
  getList() {
    console.log('test');
    this.isLoading = true;
    this.alertService.getLimits(this.patientID).subscribe(data => {
      console.log('getLimits', data);
      this.limitList = (data.triggerLimitList || []).map(item => {
        try {
          item.limit = JSON.parse(item.limit);
        } catch (error) {
          item.limit = item.limit;
        }
        // tslint:disable-next-line:triple-equals
        item.vital = this.vitalsList.find(k => k.vitalType == item.typeID);
        return item;
      });
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      throw error;
    });
  }
  openDialog(content, data) {
    this.selectedData = data;
    this.deleteDialog = this.dialogService.open(content);
  }
  delete() {
    const payload = {
      username: this.patientID,
      limitID: this.selectedData.limitID
    };
    this.isLoading = true;
    this.alertService.deleteLimit(payload).subscribe(data => {
      this.toastrService.success('Data deleted  successfully', 'Success');
      this.deleteDialog.close();
      this.isLoading = false;

      this.getList();
    }, error => {
      this.isLoading = false;
      this.toastrService.danger('Could not add data ', 'Error');
      throw error;
    });
  }
  cancel() {
    this.deleteDialog.close();
  }
}
