import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, IndexComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NbInputModule,
    NbEvaIconsModule
  ]
})
export class AuthModule { }
