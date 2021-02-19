import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { LogoutConfimartionComponent } from 'src/app/shared/components/logout-confimartion/logout-confimartion.component';
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
      // link: '/auth/login'
    },
  ];
  logo: string;
  constructor(
    private sidebarService: NbSidebarService,
    private clinicService: ClinicService,
    private menuService: NbMenuService,
    private dialogService: NbDialogService,

  ) { }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.registerEvents();
  }

  registerEvents() {
    this.menuService.onItemClick().subscribe((event) => {
      this.dialogService.open(LogoutConfimartionComponent);
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

}
