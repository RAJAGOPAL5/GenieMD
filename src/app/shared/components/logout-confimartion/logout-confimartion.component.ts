import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../service/auth.service';
import { LanguageService } from '../../service/language.service';

@Component({
  selector: 'app-logout-confimartion',
  templateUrl: './logout-confimartion.component.html',
  styleUrls: ['./logout-confimartion.component.scss']
})
export class LogoutConfimartionComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService, private ref: NbDialogRef<LogoutConfimartionComponent>,
    private ls: LanguageService,
    private translate: TranslateService) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {

  }

  signOut() {
    this.isLoading = true;
    this.authService.logout();
  }

  closeModal() {
    this.ref.close();
  }
}
