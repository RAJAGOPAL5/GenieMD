import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { ClinicService } from 'src/app/shared/services/clinic.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef!: NgbModalRef;
  cliniConfig:any;
  clinicConfigLog:any;


  constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private cs : ClinicService) { }
  userID: any;
  profileName = ''
  ngOnInit(): void {

    this.cliniConfig = this.cs.clinic;
    console.log('dsfdgdfgdfg',this.cliniConfig)
    this.clinicConfigLog  = JSON.parse(this.cliniConfig.clinicConfig)
    console.log('dsfdgdfgdfg clinicConfigLog',this.clinicConfigLog)
    this.route.params.subscribe(item => {
      this.userID = item.userID;
    });
    this.getprofile();
  }
  getprofile(){
    this.dashboardService.getProfile(this.userID).subscribe((data: any) => {
      console.log(data)
      this.profileName = data.userName
    })
  }
}
