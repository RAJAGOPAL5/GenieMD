import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

    constructor() { }
    // function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // how to update the request Parameters

        // logging the updated Parameters to browser's console

        // const params = request.params.has('resources');
        let path = '';
        if (environment.production) {
            path = '../ivisit.ComV5.00/resources';
        } else {
            path = '/ivisit.ComV5.00/resources';
        }

        // For Local Server starts (Comment this block when pushing to server)
        // if (request.url.indexOf('omsview') > -1) {
        //   path = '/oms/api';
        // } else if (request.url.indexOf('paymentview') > -1) {
        //   path = '/web/api';
        // }
        // For Local Server ends

        path += `/${request.url}`;
        const spinner = request.params.get('ignoreInterceptor');
        if (spinner && spinner == 'true'){
            path = `${request.url}`
        }
        // For Dev server starts (UnComment this block when pushing to server)
        // if (request.url.indexOf('dev.axquisite.online') > -1) {
        //     path = `${request.url}`
        // }
        // For Dev server ends

        request = request.clone({
            url: path,
        });

        return next.handle(request).pipe(
            tap(
                event => {
                    // logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                    }
                },
                error => {
                    // logging the http response to browser's console in case of a failuer
                    if (error instanceof HttpResponse) {
                    }
                }
            )
        );
    }
}
