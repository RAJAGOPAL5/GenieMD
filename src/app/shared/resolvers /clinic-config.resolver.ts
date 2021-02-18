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
    const id = localStorage.getItem('clinicId') || '';
    return this.clinicService.find(id);
  }
}
