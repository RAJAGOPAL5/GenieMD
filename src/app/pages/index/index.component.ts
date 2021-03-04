import { Component, NgZone, OnInit } from '@angular/core';
import { NbDialogService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { throwIfEmpty } from 'rxjs/operators';
import { LogoutConfimartionComponent } from 'src/app/shared/components/logout-confimartion/logout-confimartion.component';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { getUserPreferedTheme } from 'src/app/shared/utility';
import { environment } from 'src/environments/environment';

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
  theme: string = getUserPreferedTheme();
  constructor(
    private sidebarService: NbSidebarService,
    private clinicService: ClinicService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private dialogService: NbDialogService,
    private profileService: ProfileService,
    private ls: LanguageService,
    private translate: TranslateService,
    private zone: NgZone
  ) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.clinic.name;
    this.profile = this.profileService.profile;
    this.registerEvents();
    this.prepareMenus();
  }

  listernUserPreferedColorChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const theme = e.matches ? "dark" : "default";
      this.zone.runTask(() => {
        this.theme = theme;
        this.themeService.changeTheme(this.theme);
      })
    });
  }

  prepareMenus() {
    this.menus.push(
      {
        title: 'Patients',
        icon: 'people-outline',
        link: `/${this.clinicService.id}/${this.profileService.id}/patients`,
        pathMatch: 'prefix'
      },
      {
        title: 'Logout',
        icon: 'unlock-outline',
        pathMatch: 'prefix'
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
    this.listernUserPreferedColorChange();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  toggleTheme(theme: string) {
    if(theme === 'default') {
      this.theme = 'dark';
    } else if(theme === 'dark') {
      this.theme = 'default';
    }
    localStorage.setItem('theme', this.theme);
    this.themeService.changeTheme(this.theme);
  }

}
