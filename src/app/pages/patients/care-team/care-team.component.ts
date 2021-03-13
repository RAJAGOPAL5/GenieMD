import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ClinicService } from 'src/app/shared/service/clinic.service';
import { DependentService } from 'src/app/shared/service/dependent.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { PatientsService } from 'src/app/shared/service/patients.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.scss']
})
export class CareTeamComponent implements OnInit {
  isLoading = false;
  careTeam: any;
  patientId: any;
  carTeam: any;
  patientInfo: any;
  careGiver: '';
  dialogRef: any;
  showDone = false;
  users: any[];
  deleteDialogRef: any;
  careGiverUsername: any;
  team: any = {};
  constructor(
    private dependent: DependentService, private authService: AuthService,
    private route: ActivatedRoute, private dialogService: NbDialogService,
    private ns: NotificationService, private patientService: PatientsService,
    private profileService: ProfileService, private clinicService: ClinicService,
    private ls: LanguageService, private translate: TranslateService) {
    translate.use('en');
    translate.setTranslation('en', this.ls.state);
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.parent.params.patientId;
    this.getCareTeam();
    this.getProfile();
  }
  getCareTeam() {
    const payload = {
      userID: this.profileService.id,
      patientID: this.patientId
    };
    this.isLoading = true;
    this.dependent.find(payload).subscribe((res: any) => {
      this.careTeam = res.list.map(item => {
        item.name = `${item.firstName} ${item.lastName}`.trim();
        return item;
      });
      this.team.items = res.list.map(item => {
        item.name = `${item.firstName} ${item.lastName}`.trim();
        return { name: item.name, image: item.imageUrl };
      });
    }, error => {
      this.isLoading = false;
    });
  }
  getProfile() {
    const payload = {
      userID: this.profileService.id,
      clinicID: this.clinicService.id,
      patientID: this.patientId
    };
    this.patientService.findById(payload).subscribe((data: any) => {
      this.patientInfo = data;
      this.team.primary = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        image: data.imageUrl
      };
    });
  }
  open(dialog: TemplateRef<any>) {
    this.careGiver = '';
    this.dialogRef = this.dialogService.open(dialog);
    this.showDone = false;
  }
  refclose() {
    this.dialogRef.close();
  }
  notify() {
    const cmd = {
      cmd: 10,
      careReceiverName: `${this.patientInfo.firstName} ${this.patientInfo.lastName}`,
      careReceiverUsername: this.patientInfo.patientID,
      requesterUsername: this.patientInfo.patientID
    };
    const data = {
      userID: this.profileService.id,
      command: JSON.stringify(cmd),
      messageType: 10,
      subject: `Message from ${this.patientInfo.firstName} ${this.patientInfo.lastName}`,
      clinicID: this.clinicService.id,
      message: `Message from ${this.patientInfo.firstName} ${this.patientInfo.lastName}
      -- Please login to iVisit and visit Notification Center for details.`,
      messageContent: `${this.patientInfo.firstName} ${this.patientInfo.lastName},
      is requesting to add you as a Caregiver to ${this.patientInfo.firstName} ${this.patientInfo.lastName}. Tap to accept`,
      // tslint:disable-next-line:max-line-length
      url: 'https://geniemd-generalfiles.s3.amazonaws.com/c7257a550c8a45f3a6361d1f691b94e9.png?AWSAccessKeyId=AKIAIZH5KUW5NWRU5FDQ&Expires=1926574136&Signature=epieTnvW2e2Nk3VdB07VtZgwl70%3D',
      users: [this.careGiver],
    };
    this.ns.notifyOptions(data).subscribe((response: any) => {
      this.carTeam = response;
    });
    this.dialogRef.close();
  }
  deleteCareGiver(careGiver, deleteDialog: TemplateRef<any>) {
    this.careGiverUsername = careGiver.username;
    this.deleteDialogRef = this.dialogService.open(deleteDialog, {
    });
    // this.showDone = true;
  }
  close() {
    this.deleteDialogRef.close();
  }
  deleteRecord() {
    const payload = {
      careGiverUsername: this.careGiverUsername,
      dependentUsername: this.patientInfo.patientID,
      userID: this.profileService.id,
    };
    this.patientService.deleteCareGiver(payload).subscribe((res: any) => {
      this.getCareTeam();
      this.deleteDialogRef.close();
    }, error => {

    });
  }
}
