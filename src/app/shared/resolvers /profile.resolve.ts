
import { of as observableOf, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ProfileService } from '../service/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolve implements Resolve<Profile> {
userID: any;
  constructor(private auth: AuthService, private profileService: ProfileService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> {
    this.userID = route.paramMap.get('userID');
    return this.profileService.getUser(this.userID);
}
}