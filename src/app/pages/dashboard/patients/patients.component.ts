import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
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
          return '<a class="text-primary cursor-pointer">View Notes</a>';
        }

      },
      // careManager: {
      //   title: 'Assigned Care Manager',
      //   filter: false
      // },
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

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
}
