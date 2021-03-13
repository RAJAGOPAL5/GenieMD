import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { IndexComponent } from './index/index.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule,
   NbInputModule, NbRadioModule, NbSpinnerModule, NbStepperModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule, NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './register/register.component';
import { ServiceModule } from 'core';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, "../../assets/i18n/", ".json");
// }

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, IndexComponent, RegisterComponent],
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
    NbStepperModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'local'
        })
      ]
    }),
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: (HttpLoaderFactory),
    //     deps: [HttpClient]
    //   }
    // }),
    TranslateModule.forRoot(),
    ServiceModule
  ]
})
export class AuthModule { }
