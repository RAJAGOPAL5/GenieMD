import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { throwIfEmpty } from 'rxjs/operators';
import { LogoutConfimartionComponent } from 'src/app/shared/components/logout-confimartion/logout-confimartion.component';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
import { getUserPreferedTheme } from 'src/app/shared/utility';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  version: string = environment.version;
  menus: NbMenuItem[] = [];
  logo: string;
  title: string;
  profile: any;
  theme: string = getUserPreferedTheme();
  flag: any = true;
  timmerLoad: any;
  count = 0;
  newNotifications: any;
  notificationAlert = false;
  constructor(
    private sidebarService: NbSidebarService,
    private clinicService: ClinicService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private dialogService: NbDialogService,
    private profileService: ProfileService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private zone: NgZone,
    private router: Router,
    private notificationService: NotificationService
  ) {
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.clinic.name;
    this.profile = this.profileService.profile;
    this.registerEvents();
    this.prepareMenus();
    this.everyMinuteNotification();
  }

  listernUserPreferedColorChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const theme = e.matches ? 'dark' : 'default';
      this.zone.runTask(() => {
        this.theme = theme;
        this.themeService.changeTheme(this.theme);
      });
    });
  }

  notifications() {
    this.router.navigate([this.clinicService.id, this.profileService.id, 'notifications', 'list']);
  }

  prepareMenus() {
    this.menus.push(
      {
        title: 'Patients',
        icon: 'people-outline',
        link: `/${this.clinicService.id}/${this.profileService.id}/dashboard/patients`,
        pathMatch: 'prefix'
      },
      {
        title: 'Providers',
        icon: 'person-done-outline',
      },
      {
        title: 'Chat',
        icon: 'message-circle-outline',
        link: `/${this.clinicService.id}/${this.profileService.id}/chat`,
      },
      {
        title: 'Todo',
        icon: 'book-outline',
        link: `/${this.clinicService.id}/${this.profileService.id}/todo`,

      },
      {
        title: 'Help',
        icon: 'question-mark-circle-outline',
      },
      {
        title: 'Logout',
        icon: 'unlock-outline',
        pathMatch: 'prefix'
        // link: '/auth/login'
      },
    );
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
    if (this.flag) {
      this.sidebarService.collapse();
      this.flag = !this.flag;
    } else {
      this.sidebarService.compact();
      this.flag = !this.flag;
    }
  }

  toggleTheme(theme: string) {
    if (theme === 'default') {
      this.theme = 'dark';
    } else if (theme === 'dark') {
      this.theme = 'default';
    }
    localStorage.setItem('theme', this.theme);
    this.themeService.changeTheme(this.theme);
  }

  ngOnDestroy() {
    clearInterval(this.timmerLoad);
  }

  everyMinuteNotification() {
    this.timmerLoad = setInterval(() => {
      const payload = {
        userID: this.profileService.id,
      };
      this.notificationService.everyOneMinuteNotification(payload).subscribe((result: any) => {
        this.newNotifications = result;
        // tslint:disable-next-line:triple-equals
        if (result.newNotification == true && this.count == 0) {
          this.notificationAlert = true;
          const audioPlay = new Audio('assets/push_notification.mp3');
          audioPlay.play();
          this.count += 1;
          // tslint:disable-next-line:triple-equals
        } else if (result.newNotification == false) {
          this.count = 0;
        }
      });
    }, 60 * 1000);
  }

}
