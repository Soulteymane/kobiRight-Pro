import { AddOeuvreComponent } from './add-oeuvre/add-oeuvre.component';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OeuvresComponent } from './oeuvres/oeuvres.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { BodyComponent } from './body/body.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsComponent } from './statistics/statistics.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ProgrammesComponent } from './programmes/programmes.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {OeuvresDeclarerComponent} from "./oeuvres/oeuvres-declarer/oeuvres-declarer.component";
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {MainDashboardComponent} from "./main-dashboard/main-dashboard.component";



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    // OeuvresComponent,
    UsersComponent,
    SettingsComponent,
    BodyComponent,
    StatisticsComponent,
    MainComponent,
    MainDashboardComponent,
    LoginComponent,
    // ProgrammesComponent,
    SublevelMenuComponent,
    AddOeuvreComponent,

    // ProgrammesDeclarerComponent,
    // ProgrammesConsulterComponent,
    // OeuvresSignerComponent,
    // OeuvresCatalogueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
