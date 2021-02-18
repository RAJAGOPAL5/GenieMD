import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  menus: NbMenuItem[] = [
    {
      title: 'Patients',
      icon: 'people-outline',
      link: '/patients'
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: '/auth/login'
    },
  ];
  logo: string;
  constructor(
    private sidebarService: NbSidebarService,
    private clinicService: ClinicService,
  ) { }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

}
