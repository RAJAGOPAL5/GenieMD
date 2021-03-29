import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbIconLibraries, NbToastrService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
const moment = require('moment');

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('rating', { static: true }) rating: any;
  isLoading = false;
  messageList = [];
  messageTime: any;
  date: any;
  dateWithHours = false;
  dialog: any;
  url: any;
  reviewDialog: any;

  constructor(
    private clinicService: ClinicService,
    private profileService: ProfileService,
    private toastrService: NbToastrService,
    private iconLibraries: NbIconLibraries,
    private dialogService: NbDialogService,
    private languageService: LanguageService,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
    translate.use('en');
    translate.setTranslation('en', this.languageService.state);
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(event?: any) {
    this.isLoading = true;
    this.notificationService.getNotifications(this.profileService.id, 100).subscribe((res: any) => {
      this.isLoading = false;
      this.messageList = res.messageList;
      this.messageList.map(item => {
        const d = new Date(item.messageTime);
        const date = moment(d);
        this.messageTime = moment(d).format('lll');
        item.messageTime = this.messageTime;
        this.date = moment(date).fromNow();
        if (this.date.includes('days ago')) {
          this.date = JSON.parse(this.date.replace('days ago', '').trim(''));
          if (this.date <= 7) {
            this.dateWithHours = true;
            const dates = new Date(item.messageTime);
            this.date = moment(dates).fromNow();
            item.messageTime = this.messageTime + ' ' + '(' + this.date + ')';
          }
        } else if (this.date.includes('hours ago')) {
          this.dateWithHours = true;
          this.date = moment(date).fromNow();
          item.messageTime = this.messageTime + ' ' + '(' + this.date + ')';
        } else if (this.date.includes('minutes ago')) {
          this.dateWithHours = true;
          this.date = moment(date).fromNow();
          item.messageTime = this.messageTime + ' ' + '(' + this.date + ')';
        }
      });
      this.messageList.map(data => {
        try {
          const notify = JSON.parse(data.command);
          // tslint:disable-next-line:triple-equals
          if (notify.cmd === 3 || notify.cmd === 6 || notify.cmd === 17) {
            data.soapNote = true;
            // tslint:disable-next-line:triple-equals
          } else if (notify.cmd == 16) {
            data.showRespond = true;
            // tslint:disable-next-line:triple-equals
          } else if (notify.cmd == 12) {
            data.showPrescription = true;
            // tslint:disable-next-line:triple-equals
          } else if (notify.cmd == 4) {
            data.showReview = true;
            // tslint:disable-next-line:triple-equals
          } else if (notify.cmd == 7) {
            data.showDependent = true;
          }
        } catch (error) {
        }
      });
      if (event) {
        event.target.complete();
      }
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      event.target.complete();
      console.log(error.error);
      this.toastrService.danger(error.error);
    });
  }

  deleteMessage(deleteContent) {
    this.dialog = this.dialogService.open(deleteContent, { closeOnBackdropClick: false });
  }

  close() {
    this.dialog.close();
  }

  delete(id) {
    this.isLoading = true;
    const payload = {
      userID: this.profileService.id,
      messageIDList: [id]
    };
    this.notificationService.deleteNotification(payload).subscribe(data => {
      this.isLoading = false;
      const index = this.messageList.findIndex(item => item.id === id);
      this.messageList.splice(index, 1);
      this.toastrService.success('Notification deleted successfully', 'Success');
      this.dialog.close();
    }, error => {
      this.isLoading = false;
      this.toastrService.danger(error.error);
      this.dialog.close();
    });
  }

  openReview(message) {
    this.url = JSON.parse(message.command);
    this.reviewDialog = this.dialogService.open(this.rating, { closeOnBackdropClick: false });
    setTimeout(() => {
      document.getElementById('textAreaID').focus();
    }, 1000);
  }

}
