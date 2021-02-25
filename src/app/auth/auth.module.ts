import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule } from '@angular/forms';
import { NbAuthModule, NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions } from '@nebular/auth';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, IndexComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NbInputModule,
    NbEvaIconsModule,
    NbCardModule,
    FormsModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'local'
        })
      ]
    })
  ]
})
export class AuthModule { }
