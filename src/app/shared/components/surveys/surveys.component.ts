import { Component, EventEmitter, OnInit, TemplateRef, Output, Input } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, id } from '@swimlane/ngx-datatable';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';



@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  surveyDialogRef: NbDialogRef<any>;
  deleteDialogRef: NbDialogRef<any>;
  surveyForm: FormGroup;
  ColumnMode = ColumnMode;
  surveyName = [];
  surveys = [];
  surveyNameIndex: any;
  @Output() surveyData: EventEmitter<any> = new EventEmitter();
  isLoading = false;
  payload: any;
  npiId: any;
  @Input() dataSurvey: any;
  surveyList: any;
  surveysIndex: any;




  constructor(
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private profileService: ProfileService,
    private clinicService: ClinicService,

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProtocolList();

    // this.surveyName = [{ id: 1, surveyName: 'covid-19', Schedule: '' },
    // { id: 2, surveyName: 'fever', Schedule: '' },
    // { id: 3, surveyName: 'cold', Schedule: '' },
    // { id: 4, surveyName: 'cough', Schedule: '' }];
    // this.surveys = this.surveyName;
  }

  createForm() {
    this.surveyForm = this.fb.group({
      surveyName: ['', Validators.required],
      Schedule: ['', Validators.required]
    });
  }

  open(surveydialog: TemplateRef<any>) {
    this.surveyDialogRef = this.dialogService.open(surveydialog, { closeOnBackdropClick: false });
  }

  openDialog(deleteDialog: TemplateRef<any>, indexList) {
    this.deleteDialogRef = this.dialogService.open(deleteDialog, { closeOnBackdropClick: false });
    this.surveysIndex = indexList;
  }

  refclose() {
    this.surveyDialogRef.close();
    this.surveyForm.reset();
  }

  close() {
    this.deleteDialogRef.close();
  }

  save() {
    const payload = {
      id: this.surveyName.length + 1,
      name: this.surveyForm.value.surveyName,
      description: this.surveyForm.value.Schedule
    };
    // this.surveys.push(payload);
    this.surveys = [...this.surveys, ...[payload]];
    this.surveyDialogRef.close();
    this.surveyForm.reset();
    this.surveyData.emit(this.surveys);
  }

  delete() {
    // tslint:disable-next-line:triple-equals
    const index = this.surveys.findIndex(k => this.surveysIndex.id == k.id);
    const item = this.surveys.splice(index, 1);
    this.toastrService.success('Survey Name deleted successfully', 'Success');
    this.deleteDialogRef.close();

  }
  getProtocolList() {
    this.isLoading = true;
    this.payload = {
      userId: this.profileService.id,
      npiId: '0',
      clinicId: this.clinicService.id
    };
    this.profileService.getProtocol(this.payload).subscribe((data: any) => {
      console.log('data', data);
      this.surveyName = data.list;
      this.isLoading = false;
    }, error => {
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Unable to get protocol list');
    });
  }

  getDevicePatch() {
    try {
      this.surveyList = this.dataSurvey;
      console.log('this.surveyList', this.surveyList);
    } catch (error) {
      this.surveyList = this.surveyList || [];
    }
  }

}
