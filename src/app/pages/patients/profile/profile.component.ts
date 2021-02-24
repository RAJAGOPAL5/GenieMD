import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbIconLibraries } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

interface ViewModal {
  profile?: any;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  model: ViewModal = {};
  tabs: any[];
  patientID: any;
  patient: any;
  patientName: any;
  morbidityValue = [];
  morbiditys: { name: string; id: number; }[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private clinicService: ClinicService,
    private patientService: PatientsService,
    private iconLibraries: NbIconLibraries,
    private profileService: ProfileService
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
      this.prepareTabs();
      this.getData();
    });
  }

  getData() {
    this.morbiditys = [{ name: 'Lung Disease', id: 0 }, { name: 'Heart Disease', id: 1 }];
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientID
    };
    this.patientService.findById(payload).subscribe((data: any) => {
      this.morbidityValue = [];
      this.patient = data;
      this.patientName = `${this.patient.firstName} ${this.patient.lastName}`;
      this.patient.morbidity === 0 ? this.morbidityValue.push('Lung Disease') : this.morbidityValue.push('Heart Disease');

     /* BELOW IS FOR FEATURE USE FOR MOBIDITY MULTI SELECT  */

      // this.morbidityValue = [];
      // this.patient.morbidity.map(item1 => {
      //   this.morbiditys.map((item2) => {
      //     if (item1 === item2.id) {
      //       this.morbidityValue.push(item2.name);
      //     }
      //   });
      // });

      /* MOBIDITY MULTI SELECT END */


    }, error => {
      console.log('error');
    });
  }

  prepareTabs() {
    this.tabs = [
      {
        title: 'Vitals',
        route: `vitals`,
      },
      {
        title: 'Alerts',
        route: `alerts`,
      },
      {
        title: 'Visits',
        route: `visits`,
      },
      {
        title: 'Care Team',
        route: `care-team/`,
      },
      {
        title: 'History',
        route: `history/`,
      },

    ];
  }
}
