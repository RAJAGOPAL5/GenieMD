import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DependentService } from 'src/app/shared/service/dependent.service';
import { ProfileService } from 'src/app/shared/service/profile.service';
@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.scss']
})
export class CareTeamComponent implements OnInit {
  careTeam: any;
  patientId: any

  constructor(
    private dependent: DependentService, private authService: AuthService,
    private route: ActivatedRoute, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.parent.params['patientId'];
    const payload = {
      userID: this.profileService.id,
      patientID: this.patientId
    };
    this.dependent.find(payload).subscribe((res: any) => {
      this.careTeam = res;
    });

  }
}