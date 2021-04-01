import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageResolve } from '../shared/resolvers/language.resolve';
import { IndexComponent } from './index/index.component';
import { PatientsModule } from './patients/patients.module';

const routes: Routes = [
  {
    path: 'patients',
    component: IndexComponent,
    resolve: {
      language: LanguageResolve
    },
    data: { title: 'Patients'},
    loadChildren: () => import('./patients/patients.module').then(m => PatientsModule)
  },
  {
    path: 'dashboard',
    component: IndexComponent,
    data: { title: 'Dashboard'},

    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'chat',
    component: IndexComponent,
    data: { title: 'Chat'},
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: 'todo',
    component: IndexComponent,
    data: { title: 'Todo'},
    loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
  },
  {
    path: 'meet',
    component: IndexComponent,
    data: { title: 'Meet'},
    loadChildren: () => import('./meet/meet.module').then(m => m.MeetModule)
  },
  {
    path: 'notifications',
    component: IndexComponent,
    data: { title: 'Notifications'},
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
