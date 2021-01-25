import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  router: any;
  showSideBar = true;
  showHeader = true;
  showIcon = true;
  route: any;
  userID: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
  }
  changeOfRoutes() {
    this.showIcon = true;
    this.showHeader = true;
    this.showSideBar = true;
    if (this.router.url.includes('providers')) {
      this.userID = localStorage.getItem('ezcClinicAssistanceUserID');
      this.showSideBar = false;
      this.showIcon = false;
    } else if (this.router.url.includes('call')) {
      this.showSideBar = false;
      this.showHeader = false;
    } else {
      this.showSideBar = true;
      this.userID = this.route.snapshot.params.userID;
    }
  }

}
