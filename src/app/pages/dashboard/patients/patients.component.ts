import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { FilterDialogComponent } from 'src/app/shared/components/filter-dialog/filter-dialog.component';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { DataService } from 'src/app/shared/service/data.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  settings = {
    actions: false,
    search: false,
    edit: {
      editButtonContent: '<i class="nb-compose"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    columns: {
      name: {
        title: 'Name',
        filter: false
      },
      dob: {
        title: 'DOB',
        filter: false
      },
      email: {
        title: 'Monitors',
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          return '<a class="text-primary cursor-pointer">View Vitals</a>';
        }

      },
      careManager: {
        title: 'Assigned Care Manager',
        filter: false
      },
      patientID: {
        title: 'Contact',
        filter: false,
        type: 'html',
        valuePrepareFunction: (value) => {
          // tslint:disable-next-line:max-line-length
          return '<i class="fas fa-phone text-primary"></i> <i class="far fa-comment-dots text-primary"></i> <i class="fas fa-video text-primary"></i>';
        }
      }
    }
  };
  isLoading = false;
  data = [];
  userId: any;
  searchText = '';
  filterPayload = { firstName: '', lastName: '', dob: '', gender: '' };
  users: any = [];
  payloadFilter = { pageNumber: 1 };
  isFilter = false;


  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private dataService: DataService
  ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
    this.dataService.patientData.subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (data == true) {
        this.getList();
      }
    });
  }

  ngOnInit(): void {
    this.getList();
    console.log('route', this.route.parent.snapshot.params.userID);
    this.userId = this.route.parent.snapshot.params.userID;

  }
  open(id) {
    console.log('idd', id);
  }
  onCustomAction(event) {
    console.log('event', event);
  }

  getList() {
    this.isLoading = true;
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      name: this.searchText,
      providerID: '',
      pageNumber: 1,
      count: 100
    };
    this.patientService.find(payload).subscribe((data: any) => {
      console.log('list', data);
      this.isLoading = false;
      this.data = data.clinicPatientList.map(item => {
        item.name = `${item.firstName} ${item.lastName}`.trim();
        item.careManager = 'James';
        return item;
      });
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error, 'Error');
    });

  }
  getRow(event) {
    this.router.navigate([this.clinicService.id, this.userId, 'patients', event.data.patientID, 'vitals']);
  }

  filterPatient() {
    const modal = this.dialogService.open(FilterDialogComponent, {});
    modal.componentRef.instance.data = this.filterPayload;
    modal.onClose.subscribe(data => {
      if (!!data && data.type === 'filter') {
        this.searchText = '';
        this.data = data.data;
        this.filterPayload = data.payload;
        this.payloadFilter = data.payloadService;
        this.payloadFilter.pageNumber++;
      } else if (!!data && data.type === 'clear') {
        this.filterPayload = { firstName: '', lastName: '', dob: '', gender: '' };
      }
      this.showBadge();
      return;
    });
  }

  showBadge() {
    this.isFilter = Object.keys(this.filterPayload).some(k => {
      return !!this.filterPayload[k];
    });
  }
}
