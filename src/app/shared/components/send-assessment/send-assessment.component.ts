import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { ClinicService } from '../../service/clinic.service';
import { NotificationService } from '../../service/notification.service';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-send-assessment',
  templateUrl: './send-assessment.component.html',
  styleUrls: ['./send-assessment.component.scss']
})
export class SendAssessmentComponent implements OnInit {
  surveyDialogRef: NbDialogRef<any>;
  isLoading = false;
  users = [];
  patientID: any;
  notify: any;
  data: any;
  clinicConfig: any;

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private profileService: ProfileService,
    private clinicService: ClinicService,
    private toastrService: NbToastrService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.patientID = this.profileService.patientProfile.userName;
    this.getProtocolList();
    try {
      this.clinicConfig = JSON.parse(this.clinicService.clinic.clinicConfig);
    } catch (error) {
      this.toastrService.danger('Failed to parse clinic config');
    }
  }

  close() {
    this.dialogRef.close();
  }

  send(user) {
    this.isLoading = true;
    const command = {
      cmd: 0,
      assessmentName: user.name,
      assessmentID: user.id,
      clinicID: this.clinicService.id,
      providerID: this.profileService.profile.userName,
    };
    this.notify = {
      clinicID: this.clinicService.id,
      command: JSON.stringify(command),
      // tslint:disable-next-line:max-line-length
      message: `Message from ${this.profileService.profile.screenName}, -- To view please login to ${this.clinicConfig.name} and visit Notification Center for details.`,
      messageContent: `Please Complete ${user.name}`,
      messageType: 25,
      subject: `Message from ${this.profileService.profile.screenName}`,
      url: this.profileService.profile.imageURL,
      userID: this.profileService.id,
      users: [this.patientID]
    };
    this.notificationService.notifyOptions(this.notify).subscribe(res => {
      this.data = {
        userID: this.profileService.id,
        emailList: [this.patientID],
        body: `<body><h2 style=\'font-family:helvetica\'>Your ${this.clinicConfig.name} provider,
          ${this.profileService.profile.screenName}  has sent you a message</h2>
          <p style=\'font-family:helvetica\'>
          To view your message please login to your ${this.clinicConfig.name} portal
          or the mobile app and visit the Notification Center.</p>
          <p style=\'font-family:helvetica\'>Thank you!</p><p style=\'font-family:helvetica\'>${this.clinicConfig.name}</p></body>`,
        fromDisplayName: `NoReply@${this.clinicConfig.name}`,
        subject: `Message from  ${this.profileService.profile.screenName},`
      };
      this.profileService.sendEmail(this.data).subscribe(data => {
        this.isLoading = false;
        this.toastrService.success('Message sent successfully');
        this.dialogRef.close();
      });
    });
  }

  getProtocolList() {
    this.isLoading = true;
    const payload = {
      userId: this.profileService.id,
      npiId: '0',
      clinicId: this.clinicService.id
    };
    this.profileService.getProtocol(payload).subscribe((data: any) => {
      console.log('data', data);
      this.users = data.list;
      this.isLoading = false;
      // this.protocolArrays = data.protocols ? data.protocols : data.list;
      // this.filterProtocolList(this.searchText);
    }, error => {
      this.toastrService.danger(error.error.errorMessage ? error.error.errorMessage : 'Unable to get protocol list');
    });
  }

}
