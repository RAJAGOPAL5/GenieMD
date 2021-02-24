import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent, NbLoginComponent, NbRequestPasswordComponent } from '@nebular/auth';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: NbLoginComponent,
        data:{ title:'login'},
      },
      {
        path: 'forgot',
        component: NbRequestPasswordComponent,
        data:{ title:'Forgot Password'},

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
