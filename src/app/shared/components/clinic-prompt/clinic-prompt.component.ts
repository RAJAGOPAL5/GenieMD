import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-clinic-prompt',
  templateUrl: './clinic-prompt.component.html',
  styleUrls: ['./clinic-prompt.component.scss']
})
export class ClinicPromptComponent implements OnInit {
  clinicID: '';
  constructor(private router: Router,
              private ref: NbDialogRef<ClinicPromptComponent>) { }

  ngOnInit(): void {

  }

  click() {
    localStorage.setItem('clinicId', this.clinicID);
    this.router.navigate(['auth/login']);
    this.ref.close();
  }
}
