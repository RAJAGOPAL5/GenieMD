import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClinicService } from '../services/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicConfigResolver implements Resolve<boolean> {
  constructor(
    private clinicService: ClinicService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(route.paramMap);
    const id = route.paramMap.get('clinicID') || '';
    return this.clinicService.find(id);
  }
}
