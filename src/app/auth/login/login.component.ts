import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private clinicService: ClinicService
  ) { }

  ngOnInit(): void {
    console.log(this.clinicService.config);
  }

}
