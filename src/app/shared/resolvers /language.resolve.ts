

import { of as observableOf, Observable, forkJoin, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, RouterOutlet, Router } from '@angular/router';
import { LanguageService } from '../service/language.service';
import { ClinicService } from 'projects/core/src/lib/clinic/state/clinic.service';

@Injectable({
    providedIn: 'root'
})
export class LanguageResolve implements Resolve<any> {

    constructor(private ls: LanguageService, private clinicService: ClinicService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        if (this.clinicService.clinic.oemID == '100') {
            const englishPayload = {
                oemID: 0,
                languageID: this.clinicService.clinic.languageID
            }
            if (this.clinicService.clinic.languageID == '0') {
                englishPayload.languageID = '1';
            }
            const englishLanguage$ = this.ls.getList(englishPayload);
            const combine$ = combineLatest(englishLanguage$,
                (englishLanguage: any) => {
                    const object = Object.assign({}, ...englishLanguage);
                    console.log('datas', englishLanguage);
                    console.log('object', object);
                    this.ls.state = object;
                    return <any>{
                        englishLanguage
                    };
                })
            return combine$;
        } else {
        const payload = {
            oemID: this.clinicService.clinic.oemID,
            languageID: this.clinicService.clinic.languageID
        }
        const englishPayload = {
            oemID: 0,
            languageID: this.clinicService.clinic.languageID,
        }
        if (this.clinicService.clinic.languageID == '0') {
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
                console.log('datas', englishLanguage);
                console.log('object', object);
                this.ls.state = object;
                return <any>{
                    englishLanguage
                };
            })
        return combine$;
        }
    };
}
