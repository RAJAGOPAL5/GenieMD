import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule),
     },
];

