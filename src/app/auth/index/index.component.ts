import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/shared/service/clinic.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  imageURL: string;

  constructor(
    private clinicService: ClinicService,
  ) { }

  ngOnInit(): void {
    this.imageURL = this.clinicService.config.backgroundIcon;
  }

}
