

import { of as observableOf, Observable, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LanguageService } from '../service/language.service';
import { ClinicService } from '../service/clinic.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageResolve implements Resolve<any> {

    constructor(private languageService: LanguageService, private clinicService: ClinicService) { }

    resolve(route: ActivatedRouteSnapshot): any {
        const clinic = route.parent.data.clinicConfig;
        // tslint:disable-next-line:triple-equals
        if (clinic.oemID == '100') {
            const englishPayload = {
                oemID: 0,
                languageID: clinic.languageID
            };
            // tslint:disable-next-line:triple-equals
            if (clinic.languageID == '0') {
                englishPayload.languageID = '1';
            }
            const englishLanguage$ = this.languageService.getList(englishPayload).subscribe((data: any) => {
                const object = Object.assign({}, ...data);
                this.languageService.state = object;
                return {
                    data
                } as any;
            });
        } else {
            const payload = {
                oemID: clinic.oemID,
                languageID: clinic.languageID
            };
            const englishPayload = {
                oemID: 0,
                languageID: clinic.languageID,
            };
            // tslint:disable-next-line:triple-equals
            if (clinic.languageID == '0') {
                englishPayload.languageID = '1';
                payload.languageID = '1';
            }
            const userLanguage$ = this.languageService.getList(payload);
            const englishLanguage$ = this.languageService.getList(englishPayload);
            const combine$ = combineLatest([userLanguage$, englishLanguage$]).subscribe((data: any[]) => {
                try {
                    data[1] = data[1];
                } catch (error) {
                    data[1] = [];
                }
                const object = Object.assign({}, ...data[1]);
                this.languageService.state = object;
                // tslint:disable-next-line:no-angle-bracket-type-assertion
                return data[1];
            });

        }
    }
}
