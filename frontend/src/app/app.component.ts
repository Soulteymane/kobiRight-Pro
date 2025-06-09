import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="sidenav.toggle()" matTooltip="Menu">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="app-title">KobiRight Pro</span>
        <span class="toolbar-spacer"></span>

        <!-- Notifications -->
        <button mat-icon-button [matBadge]="notificationCount" matBadgeColor="warn" matTooltip="Notifications">
          <mat-icon>notifications</mat-icon>
        </button>

        <!-- User Menu -->
        <button mat-icon-button [matMenuTriggerFor]="userMenu" *ngIf="isAuthenticated()" matTooltip="Menu utilisateur">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <div class="user-info" *ngIf="currentUser">
            <span class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
            <span class="user-role">{{ currentUser.role }}</span>
          </div>
          <mat-divider></mat-divider>
          <button mat-menu-item routerLink="/profile">
            <mat-icon>person</mat-icon>
            <span>Mon profil</span>
          </button>
          <button mat-menu-item routerLink="/settings">
            <mat-icon>settings</mat-icon>
            <span>Paramètres</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Déconnexion</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <mat-sidenav-container>
        <mat-sidenav #sidenav mode="side" [opened]="true">
          <div class="sidenav-header">
            <img src="assets/logo.png" alt="Logo" class="logo">
            <h2>KobiRight Pro</h2>
          </div>
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Tableau de bord</span>
            </a>
            <a mat-list-item routerLink="/works" routerLinkActive="active">
              <mat-icon matListItemIcon>library_books</mat-icon>
              <span matListItemTitle>Œuvres</span>
            </a>
            <a mat-list-item routerLink="/rights" routerLinkActive="active">
              <mat-icon matListItemIcon>gavel</mat-icon>
              <span matListItemTitle>Droits</span>
            </a>
            <a mat-list-item routerLink="/contracts" routerLinkActive="active">
              <mat-icon matListItemIcon>description</mat-icon>
              <span matListItemTitle>Contrats</span>
            </a>
            <a mat-list-item routerLink="/reports" routerLinkActive="active">
              <mat-icon matListItemIcon>assessment</mat-icon>
              <span matListItemTitle>Rapports</span>
            </a>
            <mat-divider></mat-divider>
            <a mat-list-item routerLink="/users" routerLinkActive="active" *ngIf="isAdmin()">
              <mat-icon matListItemIcon>people</mat-icon>
              <span matListItemTitle>Utilisateurs</span>
            </a>
            <a mat-list-item routerLink="/settings" routerLinkActive="active" *ngIf="isAdmin()">
              <mat-icon matListItemIcon>settings</mat-icon>
              <span matListItemTitle>Administration</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content-container">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .app-title {
      margin-left: 8px;
      font-size: 1.2rem;
    }

    .toolbar-spacer {
      flex: 1 1 auto;
    }

    mat-sidenav-container {
      flex: 1;
    }

    mat-sidenav {
      width: 280px;
      background-color: #fafafa;
    }

    .sidenav-header {
      padding: 16px;
      text-align: center;
      background-color: #f5f5f5;
    }

    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 8px;
    }

    .sidenav-header h2 {
      margin: 0;
      font-size: 1.2rem;
      color: #333;
    }

    .content-container {
      padding: 24px;
      height: calc(100vh - 64px);
      overflow-y: auto;
      background-color: #f5f5f5;
    }

    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .user-info {
      padding: 16px;
      text-align: center;
    }

    .user-name {
      display: block;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .user-role {
      display: block;
      font-size: 0.8rem;
      color: #666;
    }

    mat-divider {
      margin: 8px 0;
    }

    @media (max-width: 600px) {
      mat-sidenav {
        width: 100%;
      }

      .content-container {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;
  notificationCount = 0;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.role === 'ARRANGEUR';
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Déconnexion réussie', 'Fermer', {
      duration: 3000
    });
  }
}
