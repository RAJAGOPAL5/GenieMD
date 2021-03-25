import { ChangeDetectorRef, Component, Inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { environment } from 'src/environments/environment';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { PushNotificationService } from 'src/app/shared/service/push-notification.service';


interface ViewModal {
  username?: string;
  password?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends NbLoginComponent implements OnInit {
  version: string = environment.version;
  isLoading = false;
  model: ViewModal = { username: '', password: '' };
  logo: string;
  title: string;
  showMessages: any = {};
  showContent = false;
  constructor(
    private clinicService: ClinicService,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private languageService: LanguageService,
    private translate: TranslateService,
    @Inject(NB_AUTH_OPTIONS)
    protected service: NbAuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private pushService: PushNotificationService
  ) {
    super(service, {}, cd, router);
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
    if (this.clinicService.id) {
      if (!this.languageService.state) {
        this.translatePage(this.clinicService.id);
      } else {
        this.showContent = true;
      }
    } else {
      if (!this.languageService.state) {
        this.translatePage();
      } else {
        this.showContent = true;
      }
    }
    this.pushService.requestPermission();
  }

  login() {
    this.isLoading = true;
    const username = this.model.username;
    const password = this.model.password;

    const result$ = this.authService.logIn(username, password)
      .subscribe(result => {
        this.pushService.registerBrowser(localStorage.getItem('token'), this.clinicService.clinic.oemID, result.userID);
        this.router.navigate([this.clinicService.id, result.userID, 'dashboard', 'patients']);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Invalid username or password', 'Error');
      });
  }

  translatePage(clinicID?: string) {
    if (clinicID) {
      if (this.clinicService.clinic) {
        this.getDynamicLanguage(this.clinicService.clinic.oemID);
      } else {
        this.getDefaultLangauge();
      }
    }
  }

  getDynamicLanguage(clinicOemID) {
    let browserLang;
    if (navigator.language.includes('-')) {
      browserLang = navigator.language.split('-');
      browserLang = browserLang[0];
    } else {
      browserLang = navigator.language;
    }
    this.clinicService.getLanguageList().subscribe((resp: any) => {
      const browserCode: any = resp.list.find(item => item.code === browserLang);
      if (browserCode) {
        // tslint:disable-next-line:triple-equals
        if (this.clinicService.clinic.oemID == '100') {
          const browserPayloadDefualt = {
            oemID: 0,
            languageID: browserCode.id
          };
          this.languageService.getList(browserPayloadDefualt).subscribe((response: any) => {
            this.showContent = true;
            try {
              response = response;
            } catch (error) {
              response = {};
            }
            const object = Object.assign({}, response);
            this.languageService.state = object;
            this.translate.use('en');
            this.translate.setTranslation('en', this.languageService.state);
          });

        } else {
          // refers to patient language with patient oemID
          const browserPayload = {
            oemID: clinicOemID,
            languageID: browserCode.id
          };
          // refers to patient language with default oemID
          const browserPayloadDefualt = {
            oemID: 0,
            languageID: browserCode.id
          };
          // refers to english language with default oemID
          const englishPayload = {
            oemID: 0,
            languageID: 1
          };
          this.languageService.getList(browserPayload).subscribe((browserResponse: any) => {
            this.languageService.getList(browserPayloadDefualt).subscribe((response: any) => {
              this.showContent = true;
              try {
                response = response;
              } catch (error) {
                response = [];
              }
              const object = Object.assign({}, response);
              this.languageService.state = object;
              this.translate.use('en');
              this.translate.setTranslation('en', this.languageService.state);
            });
          });
        }
      } else {
        this.getDefaultLangauge();
      }
    });
  }
  getDefaultLangauge() {
    // refers to english language with default oemID
    const englishPayload = {
      oemID: 0,
      languageID: 1
    };
    this.languageService.getList(englishPayload).subscribe((englishResponse: any) => {
      this.showContent = true;
      const object = Object.assign({}, ...englishResponse);
      this.languageService.state = object;
      this.translate.use('en');
      this.translate.setTranslation('en', this.languageService.state);
    });
  }

}
