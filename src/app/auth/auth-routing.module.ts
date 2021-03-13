import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageResolve } from '../shared/resolvers /language.resolve';
import { NbAuthComponent, NbLoginComponent, NbRequestPasswordComponent } from '@nebular/auth';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        resolve: {
          language: LanguageResolve
        },
        data: { title: 'login' },
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
        resolve: {
          language: LanguageResolve
        },
        data: { title: 'Forgot Password' },

      },
      {
        path: 'register',
        component: RegisterComponent,
        resolve: {
          language: LanguageResolve
        },
        data: { title: 'register' },

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
