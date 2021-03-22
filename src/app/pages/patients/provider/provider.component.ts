import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { ScheduleService } from 'src/app/shared/service/schedule.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  clinicID: string;
  clinic: any;
  cliniConfig: any;
  userID: string;
  npiId: string;
  patientID: string;
  isLoading = false;
  randomProviderList = '';
  listOfProvider: any;
  dataList: any;
  totalProviderCollection = [];
  providersList = [];
  providerSpeciality: any;
  searchText = '';
  currentPage = 1;
  patient: any;

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private patientService: PatientsService,
    private activatedRoute: ActivatedRoute,
    private toastrService: NbToastrService,
    private router: Router,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit(): void {
    this.clinicID = this.clinicService.id;
    this.clinic = this.clinicService.clinic;
    this.cliniConfig = this.clinicService.config;
    this.userID = this.profileService.id;
    this.npiId = '0';
    this.activatedRoute.parent.parent.paramMap.subscribe(params => {
      this.patientID = params.get('patientId');
      console.log('patient id', this.patientID);
    });
    this.getProvidersList();
  }

  getProviderDetails(npiId: any) {
    this.profileService.providerNPiID = npiId;
    this.router.navigate([this.clinicID, this.userID, 'patients', this.patientID, 'schedule', 'provider-detail']);
  }

  getList() {
    this.isLoading = true;
    const payload = {
      categoryID: '',
      city: '',
      distance: 10000,
      itemsCount: 1000,
      latitude: 0.000000,
      longitude: 0.000000,
      name: '',
      networkId: this.clinicService.id,
      pageNumber: 1,
      practiceStates: '',
      practiceType: 2,
      sortBy: 'serviceType',
      specialties: this.providerSpeciality,
      random: this.randomProviderList,
      state: '',
      taxonomyCode: '',
      zipcode: '',
      protocolID: 1493
    };
    if (this.clinic.oemID === 150) {
      payload.practiceStates = '';
    }
    this.clinicService.getProvidersList(payload).subscribe((data: any) => {
      this.isLoading = false;
      if (data.errorMessage) {
        this.toastrService.danger(data.errorMessage ? data.errorMessage : 'Cannot get Provider list', 'Error');
        return;
      }
      this.listOfProvider = {
        id: '',
        practiceName: '',
        imageUrl: '',
        specialties: '',
        npi: '',
        status: '',
        practiceType: ''
      };
      this.dataList = data.networkHcpList;
      this.totalProviderCollection = [];
      this.dataList.forEach(element => {
        // tslint:disable-next-line:no-bitwise
        if ((element.serviceType & 1) === 0) {
          this.listOfProvider.status = 'Offline';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 2) === 2) {
          this.listOfProvider.status = 'Available Now';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 4) === 4) {
          this.listOfProvider.status = 'Accepts Scheduled Visits';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 16) === 16) {
          this.listOfProvider.status = 'Report Symptoms, Get CallBack';
          // tslint:disable-next-line:no-bitwise
        } else if ((element.serviceType & 8) === 8) {
          this.listOfProvider.status = 'Report Symptoms, Get Treatment';
        } else {
          this.listOfProvider.status = 'Offline';
        }
        this.listOfProvider.practiceName = element.name + ' ' + element.degrees;
        this.listOfProvider.imageUrl = element.imageUrl;
        this.listOfProvider.specialties = element.specialties;
        this.listOfProvider.id = element.id;
        this.listOfProvider.npi = element.npi;
        this.listOfProvider.practiceType = element.practiceType;
        this.totalProviderCollection.push(this.listOfProvider);
        this.listOfProvider = {
          id: '',
          practiceName: '',
          imageUrl: '',
          specialties: '',
          npi: '',
          status: '',
          practiceType: '',
        };
      });
      this.providersList = this.totalProviderCollection;
    }, error => {
      this.toastrService.danger('Cannot get provider list', 'Error');
    });
  }
  order(networkHcpList: any, order: any): any {
    throw new Error('Method not implemented.');
  }

  searchProvider() {
    this.providersList = this.totalProviderCollection.filter((data) => {
      return `${data.practiceName}`.toLowerCase().includes(this.searchText);
    });
    if (this.searchText === '') {
      this.getList();
      this.currentPage = 1;
    }
  }

  getProvidersList() {
    this.getList();
  }

}
