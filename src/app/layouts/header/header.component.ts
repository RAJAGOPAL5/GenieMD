import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  modalRef!: NgbModalRef;


  constructor(private dashboardService: DashboardService, private route: ActivatedRoute) { }
  userID: any;
  profileName = ''
  ngOnInit(): void {
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
