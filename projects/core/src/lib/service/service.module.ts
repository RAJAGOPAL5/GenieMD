import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/state/auth.service';
import { AuthStore } from './auth/state/auth.store';
import { AuthQuery } from './auth/state/auth.query';
import { ChatService } from './chat/state/chat.service';
import { ChatStore } from './chat/state/chat.store';
import { ChatQuery } from './chat/state/chat.query';
import { ClinicService } from './clinic/state/clinic.service';
import { ClinicQuery } from './clinic/state/clinic.query';
import { ClinicStore } from './clinic/state/clinic.store';
import { DependentService } from './dependent/state/dependent.service';
import { DependentStore } from './dependent/state/dependent.store';
import { DependentQuery } from './dependent/state/dependent.query';
import { NotificationService } from './notification/state/notification.service';
import { NotificationStore } from './notification/state/notification.store';
import { NotificationQuery } from './notification/state/notification.query';
import { PatientService } from './patient/state/patient.service';
import { PatientStore } from './patient/state/patient.store';
import { PatientQuery } from './patient/state/patient.query';
import { ProfileQuery } from './profile/state/profile.query';
import { ProfileService } from './profile/state/profile.service';
import { ProfileStore } from './profile/state/profile.store';
import { VitalsService } from './vitals/state/vitals.service';
import { VitalsQuery } from './vitals/state/vitals.query';
import { VitalsStore } from './vitals/state/vitals.store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthStore,
    AuthQuery,
    ChatService,
    ChatStore,
    ChatQuery,
    ClinicService,
    ClinicQuery,
    ClinicStore,
    DependentService,
    DependentStore,
    DependentQuery,
    NotificationService,
    NotificationStore,
    NotificationQuery,
    PatientService,
    PatientStore,
    PatientQuery,
    ProfileService,
    ProfileStore,
    ProfileQuery,
    VitalsService,
    VitalsQuery,
    VitalsStore

  ]
})
export class ServiceModule { }
