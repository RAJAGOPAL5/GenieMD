import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinic-prompt',
  templateUrl: './clinic-prompt.component.html',
  styleUrls: ['./clinic-prompt.component.scss']
})
export class ClinicPromptComponent implements OnInit {
  clinicID: '';
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  click() {
    localStorage.setItem('ClinicId', this.clinicID);
    this.router.navigate(['auth/login']);
  }
}
