import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbCardModule, NbDialogModule, NbLayoutModule,
  NbMenuModule, NbSidebarModule, NbSpinnerModule, NbThemeModule, NbToastrModule,
  NbTooltipModule, NbDatepickerModule, NbIconModule, NbWindowModule,
} from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyHttpInterceptor } from './shared/interceptors/interceptor';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutConfimartionComponent } from './shared/components/logout-confimartion/logout-confimartion.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { CoreModule } from 'core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { getUserPreferedTheme } from './shared/utility';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';


const theme = getUserPreferedTheme();
@NgModule({
  declarations: [
    AppComponent,
    LogoutConfimartionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbDialogModule.forRoot(),
    NbLayoutModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: theme }),
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbSpinnerModule,
    NbTooltipModule,
    NbIconModule,
    NbEvaIconsModule,
    DragDropModule,
    TranslateModule.forRoot(),
    NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' }),
    NbWindowModule.forRoot(),
    CoreModule.forRoot({
      baseURL: environment.base_url,
      production: environment.production
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    Title,
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } },
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LogoutConfimartionComponent]
})
export class AppModule { }
