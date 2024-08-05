import { ProgrammesComponent } from './programmes/programmes.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OeuvresComponent } from './oeuvres/oeuvres.component';
import { StatisticsComponent } from './statistics/statistics.component';
import {MainDashboardComponent} from "./main-dashboard/main-dashboard.component";
// import { MainDashboardComponent } from '../../../../../../Desktop/TickiDashoboard/src/app/main-dashboard/main-dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},

  {path: 'oeuvres',
    loadChildren: () => import('./oeuvres/oeuvres.module').then(m => m.OeuvresModule)
  },

  {path: 'statistics', component: StatisticsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'admin', component: MainDashboardComponent},
  {path: 'acceuil', component: MainComponent},
  {path: 'settings', component: SettingsComponent},

  {path: 'programmes', loadChildren: () => import('./programmes/programmes.module').then(m => m.ProgrammesModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
