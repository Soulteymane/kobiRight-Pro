import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './features/splash/splash.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { WorksListComponent } from './features/works/works-list/works-list.component';
import { WorkDetailComponent } from './features/works/work-detail/work-detail.component';
import { WorkFormComponent } from './features/works/work-form/work-form.component';
import { RightsListComponent } from './features/rights/rights-list/rights-list.component';
import { RightDetailComponent } from './features/rights/right-detail/right-detail.component';
import { UsersListComponent } from './features/users/users-list/users-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'works',
    component: WorksListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'works/new',
    component: WorkFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'works/:id',
    component: WorkDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'works/:id/edit',
    component: WorkFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rights',
    component: RightsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rights/:id',
    component: RightDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/works' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
