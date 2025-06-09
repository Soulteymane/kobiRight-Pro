import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () => import('./features/auth/splash-screen/splash-screen.component').then(m => m.SplashScreenComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'works',
    loadChildren: () => import('./features/works/works.module').then(m => m.WorksModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'works'
  }
];
