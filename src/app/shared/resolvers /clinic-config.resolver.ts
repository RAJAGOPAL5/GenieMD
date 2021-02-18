import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClinicService } from '../service/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicConfigResolver implements Resolve<boolean> {
  id: any;
  constructor(
    private clinicService: ClinicService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(route.paramMap);
    // const id = route.paramMap.get('clinicID') || '';
    if (localStorage.getItem('clinicId')) {
      this.id = localStorage.getItem('clinicId');
    } else {
      this.id = '';
    }
    return this.clinicService.find(this.id);
  }
}
