import { ChangeDetectorRef, Component, Inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { environment } from 'src/environments/environment.prod';
import { NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';


interface ViewModal {
  username?: string;
  password?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends NbLoginComponent implements OnInit  {
  version: string = environment.version;
  isLoading = false;
  model: ViewModal = {username: '', password: ''};
  logo: string;
  title: string;
  showMessages: any = {};
  showContent = false;
  constructor(private clinicService: ClinicService, 
    private authService: AuthService,
    private toastrService: NbToastrService,
    private ls: LanguageService,
    private translate: TranslateService,
    @Inject(NB_AUTH_OPTIONS)
    protected service: NbAuthService, 
    protected cd: ChangeDetectorRef, 
    protected router: Router,
    ) {
    super(service, {}, cd, router);
    translate.use('en');
    translate.setTranslation('en', this.ls.state);  
  }

  ngOnInit(): void {
    this.logo = this.clinicService.config.logo;
    this.title = this.clinicService.config.name;
    if(this.clinicService.id) {
      if(!this.ls.state) {
        this.translatePage(this.clinicService.id);
      } else {
        this.showContent = true;
      }
    } else {
      if (!this.ls.state) {
        this.translatePage();
      } else {
        this.showContent = true;
      }
    }
  }

  login() {
    this.isLoading = true;
    const username = this.model.username;
    const password = this.model.password;
    const result$ = this.authService.logIn(username, password)
    .subscribe(result => {
      this.router.navigate([this.clinicService.id ,result.userID,'patients']);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error.errorMessage? error.error.errorMessage: 'Invalid username or password');
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
    console.log(navigator.language);
    if (navigator.language.includes('-')) {
      var browserLang: any = navigator.language.split('-');
      browserLang = browserLang[0];
      console.log(browserLang[0]);
    } else {
      var browserLang: any = navigator.language;
    }
    this.clinicService.getLanguageList().subscribe((resp: any) => {
      const browserCode: any = resp.list.find(item => item.code === browserLang);
      if (browserCode) {
        if (this.clinicService.clinic.oemID == '100') {
          const browserPayloadDefualt = {
            oemID: 0,
            languageID: browserCode.id
          };
          this.ls.getList(browserPayloadDefualt).subscribe((response: any) => {
            this.showContent = true;
            try {
              response = response;
            } catch (error) {
              response = {};
            }
            const object = Object.assign({},response);
            this.ls.state = object;
            this.translate.use('en');
            this.translate.setTranslation('en', this.ls.state);
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
          this.ls.getList(browserPayload).subscribe((browserResponse: any) => {
            this.ls.getList(browserPayloadDefualt).subscribe((response: any) => {
              this.showContent = true;
              try {
                response = response;
              } catch (error) {
                response = [];
              }
              const object = Object.assign({},response);
              this.ls.state = object;
              this.translate.use('en');
              this.translate.setTranslation('en', this.ls.state);
            });
          });
        }
      } else {
        this.getDefaultLangauge();
      }
    })
  }
  getDefaultLangauge() {
    // refers to english language with default oemID
    const englishPayload = {
      oemID: 0,
      languageID: 1
    };
    this.ls.getList(englishPayload).subscribe((englishResponse: any) => {
      this.showContent = true;
      const object = Object.assign({}, ...englishResponse);
      this.ls.state = object;
      this.translate.use('en');
      this.translate.setTranslation('en', this.ls.state);
    });
  }

}
