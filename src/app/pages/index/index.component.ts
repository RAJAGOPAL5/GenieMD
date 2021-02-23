import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { LogoutConfimartionComponent } from 'src/app/shared/components/logout-confimartion/logout-confimartion.component';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  version: string = environment.version;
  menus: NbMenuItem[] = [];
  logo: string;
  title: string;
  profile: any;
  constructor(
    private sidebarService: NbSidebarService,
    private clinicService: ClinicService,
    private menuService: NbMenuService,
    private dialogService: NbDialogService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.clinic.name;
    this.profile = this.profileService.profile;
    this.registerEvents();
    this.prepareMenus();
  }

  prepareMenus() {
    this.menus.push(
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
    )
  }

  registerEvents() {
    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === 'Logout') {
        this.dialogService.open(LogoutConfimartionComponent);
      }
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

}
