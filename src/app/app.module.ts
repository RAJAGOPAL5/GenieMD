import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule,
   NbMenuModule, NbRouteTabsetModule, NbSidebarModule, NbSpinnerModule, NbThemeModule, NbToastrModule,
    NbTooltipModule, NbUserModule, NbDatepickerModule, NbButtonGroupModule, NbCheckboxModule, NbActionsModule, NbListModule } from '@nebular/theme';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MyHttpInterceptor } from './shared/interceptors/interceptor';
import { VitalsComponent } from './pages/patients/vitals/vitals.component';
import { CareTeamComponent } from './pages/patients/care-team/care-team.component';
import { HistoryComponent } from './pages/patients/history/history.component';
import { ProfileComponent } from './pages/patients/profile/profile.component';
import { AlertsComponent } from './pages/patients/alerts/alerts.component';
import { VisitsComponent } from './pages/patients/visits/visits.component';
import { ClinicPromptComponent } from './shared/components/clinic-prompt/clinic-prompt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutConfimartionComponent } from './shared/components/logout-confimartion/logout-confimartion.component';
import { ChartsModule } from 'ng2-charts';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    VitalsComponent,
    CareTeamComponent,
    HistoryComponent,
    ProfileComponent,
    AlertsComponent,
    VisitsComponent,
    ClinicPromptComponent,
    LogoutConfimartionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbCardModule,
    NbInputModule,
    NbDialogModule.forRoot(),
    NbLayoutModule,
    SharedModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbRouteTabsetModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbSpinnerModule,
    ChartsModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbUserModule,
    TranslateModule.forRoot(),
    NbButtonGroupModule,
    NbCheckboxModule,
    NbActionsModule, 
    NbListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    Title,
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }},
    NgbActiveModal,
  ],
  bootstrap: [AppComponent],
  entryComponents: [LogoutConfimartionComponent]
})
export class AppModule { }
