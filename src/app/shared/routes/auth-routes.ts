import { Routes } from '@angular/router';
export const authRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../pages/auth/auth.module').then(m => m.AuthModule),
    }
];

