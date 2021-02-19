import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { LogoutConfimartionComponent } from 'src/app/shared/components/logout-confimartion/logout-confimartion.component';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  version: string = environment.version;
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
    console.log('kk',this.version)
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
