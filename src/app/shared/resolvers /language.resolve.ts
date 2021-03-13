

import { of as observableOf, Observable, forkJoin, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, RouterOutlet, Router } from '@angular/router';
import { LanguageService } from '../service/language.service';
import { ClinicService } from '../service/clinic.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageResolve implements Resolve<any> {

    constructor(private ls: LanguageService, private clinicService: ClinicService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
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
            const englishLanguage$ = this.ls.getList(englishPayload);
            const combine$ = combineLatest(englishLanguage$,
                (englishLanguage: any) => {
                    const object = Object.assign({}, ...englishLanguage);
                    this.ls.state = object;
                    // tslint:disable-next-line:no-angle-bracket-type-assertion
                    return <any> {
                        englishLanguage
                    };
                });
            return combine$;
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
            const userLanguage$ = this.ls.getList(payload);
            const englishLanguage$ = this.ls.getList(englishPayload);
            const combine$ = combineLatest(userLanguage$, englishLanguage$,
                (userLanguage: any, englishLanguage: any) => {
                    try {
                        englishLanguage = englishLanguage;
                    } catch (error) {
                        englishLanguage = [];
                    }
                    const object = Object.assign({}, ...englishLanguage);
                    this.ls.state = object;
                    // tslint:disable-next-line:no-angle-bracket-type-assertion
                    return <any> {
                        englishLanguage
                    };
                });
            return combine$;
        }
    }
}
