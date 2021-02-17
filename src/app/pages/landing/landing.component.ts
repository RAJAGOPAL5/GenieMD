import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  clinicId: string = '';
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.clinicId);
    this.router.navigate(['/', this.clinicId])
  }

}
