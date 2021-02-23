import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClinicPromptComponent } from '../components/clinic-prompt/clinic-prompt.component';
import { ClinicService } from '../service/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class ClinicConfigResolver implements Resolve<boolean> {
  id: any;
  constructor(
    private clinicService: ClinicService,
    private dialogService: NbDialogService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('clinicID') || '1000089';
    return this.clinicService.find(id)
    .pipe(
      catchError((error) => {
        return of(false);
      })
    );
  }
}
