import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { CoreHttpInterceptor } from './interceptors/interceptor';

describe('CoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                RouterModule.forRoot([])
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CoreHttpInterceptor,
                    multi: true,
                  },
            ]
        });
    });
});
