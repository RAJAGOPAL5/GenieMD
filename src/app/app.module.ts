import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { NbCardModule, NbLayoutModule, NbMenuModule, NbRouteTabsetModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
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
=======
import { NbCardModule, NbDialogModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbTabsetModule, NbThemeModule } from '@nebular/theme';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ClinicPromptComponent } from './shared/components/clinic-prompt/clinic-prompt.component';
import { FormsModule } from '@angular/forms';

>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< Updated upstream
    VitalsComponent,
    CareTeamComponent,
    HistoryComponent,
    ProfileComponent,
    AlertsComponent,
    VisitsComponent
=======
    ClinicPromptComponent
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    NbCardModule,
    NbRouteTabsetModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
    Title
  ],
  bootstrap: [AppComponent]
=======
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ClinicPromptComponent]
>>>>>>> Stashed changes
})
export class AppModule { }
