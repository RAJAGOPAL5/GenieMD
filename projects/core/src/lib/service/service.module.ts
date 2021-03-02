import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/state/auth.service';
import { AuthStore } from './auth/state/auth.store';
import { AuthQuery } from './auth/state/auth.query';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthStore,
    AuthQuery
  ]
})
export class ServiceModule { }
