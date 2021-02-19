import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data:{ title:'login'},
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
        data:{ title:'forgot'},

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
