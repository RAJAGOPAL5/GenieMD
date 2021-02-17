import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicService } from 'src/app/shared/services/clinic.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  clinicId: string = '';
  constructor(
    private router: Router,
    private clinicService: ClinicService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.clinicId);
    this.router.navigate(['/', this.clinicId])
    this.getData();
  }

  async getData() {
    try {
      const clinic = this.clinicService.find(this.clinicId);
      clinic.subscribe((result) => {
        console.log(this.clinicService.config);
      });
    } catch (error) {
      console.log(error);
    } 
  }

}
