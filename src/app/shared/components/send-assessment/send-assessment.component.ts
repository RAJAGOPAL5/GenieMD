import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-send-assessment',
  templateUrl: './send-assessment.component.html',
  styleUrls: ['./send-assessment.component.scss']
})
export class SendAssessmentComponent implements OnInit {
  surveyDialogRef: NbDialogRef<any>;
  users: { name: string, title: string }[] = [
    { name: 'Carla Espinosa', title: 'Nurse' },
    { name: 'rd', title: 'student' },
    { name: 'test', title: 'student' },
    { name: 'Perry Cox', title: 'Doctor of Medicine' },
    { name: 'captain Sullivan', title: 'Carpenter and photographer' },
    { name: 'thor', title: 'Carpenter and photographer' },
    // { name: 'spidy', title: 'Carpenter and photographer' },
    // { name: 'Ben Sullivan', title: 'Carpenter and photographer' },
  ];
  selected = false;

  constructor(
    protected dialogRef: NbDialogRef<any>,
  ) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close({ type: 'cancel' });
  }

  getUser(data) {
    console.log('getuser::', data);
    this.selected = true;

  }

}
