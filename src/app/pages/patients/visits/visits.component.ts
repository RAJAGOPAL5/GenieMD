import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {

  timeSlots = []
  providerSpeciality: any;
  clinic: any;
  clinicID: any;
  selectSpeciality: any;
  randomProviderList: any;
  listOfProvider: any;
  totalProviderCollection = [];
  dataList: any;
  providersList = [];
  providerDetails: any;
  npiId: any;
  providerName: any;
  providerData: any;
  isLoading = false;


  constructor(private clinicService: ClinicService,
   private toastrService: NbToastrService,
   private profileService: ProfileService) { }

  ngOnInit(): void {
    this.clinic = this.clinicService.clinic;
    this.clinicID = '1000089'
    this.clinicService.getPhysicianCategoryList(this.clinicID).subscribe((data: any) => {
      this.providerSpeciality = data.physicianCategoryList;
      console.log('getPhysicianCategoryList', this.providerSpeciality);
    }, error => {
      this.toastrService.danger(error.error.errorMessage? error.error.errorMessage: 'Cannot get Physician list');
    });
    this.getList();
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
      networkId: '1000089',
      pageNumber: 1,
      practiceStates: 'CA',
      practiceType: 2,
      sortBy: 'serviceType',
      specialties: this.selectSpeciality,
      random: this.randomProviderList,
      state: 'CA',
      taxonomyCode: '',
      zipcode: '',
      protocolID: 1493
    };
    if (this.clinic.oemID === 150) {
      payload.practiceStates = '';
    }
    this.clinicService.getProvidersList(payload).subscribe((data: any) => {
      this.isLoading = false;
      console.log('data', data);
      if (data.errorMessage) {
        this.toastrService.danger(data.errorMessage);
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
        if ((element.serviceType & 1) === 0) {
          this.listOfProvider.status = 'Offline';
        } else if ((element.serviceType & 2) === 2) {
          this.listOfProvider.status = 'Available Now';
        } else if ((element.serviceType & 4) === 4) {
          this.listOfProvider.status = 'Accepts Scheduled Visits';
        } else if ((element.serviceType & 16) === 16) {
          this.listOfProvider.status = 'Report Symptoms, Get CallBack';
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
      console.log(this.providersList, 'list provider');
      // if (this.quickSchedule) {
      //   this.getProviderDetails(this.npiId);
      // }
    }, error => {
      this.toastrService.danger('Cannot get provider list');
    });
  }

  getProvidersList(data) {
    this.selectSpeciality = data;
    this.getList();
  }

  getProviderDetails(npiId) {
    this.profileService.providerNPiID = npiId;
    this.providerDetails = this.dataList.find(a => a.npi == npiId);
    this.npiId = npiId;
    console.log('npi', this.npiId)
    if (this.npiId) {
      const payLoad = {
        userID: this.profileService.id,
        clinicID: '1000089',
        providerID: this.npiId,
        types: [
          { type: 6, providerOnly: true, status: [0, 1, 4] },
          { type: 0, providerOnly: false, status: [0, 1] },
          { type: 3, providerOnly: false, status: [0, 1] },
          { type: 4, providerOnly: true, status: [7], },
          { type: 7, providerOnly: true, status: [2] },
          { type: 1, providerOnly: true, status: [0, 1, 4] }
        ]
      };
      this.getUserName(npiId);
      // this.providerAvailableDetails(payLoad);
    } else {
      // this.getUserName(npiId);
    }
  }

  getUserName(npiId) {
    this.profileService.getProviderName(this.npiId).subscribe((data: any) => {
      console.log('getuser', data);
      this.providerData = data;
      this.providerName = this.providerData.username;
      const payLoad = {
        userID: this.profileService.id,
        clinicID: '1000089',
        providerID: this.providerName,
        types: [
          { type: 6, providerOnly: true, status: [0, 1, 4] },
          { type: 0, providerOnly: false, status: [0, 1] },
          { type: 3, providerOnly: false, status: [0, 1] },
          { type: 4, providerOnly: true, status: [7], },
          { type: 7, providerOnly: true, status: [2] },
          { type: 1, providerOnly: true, status: [0, 1, 4] }
        ]
      };
      // this.providerAvailableDetails(payLoad);

    });
  }

}
