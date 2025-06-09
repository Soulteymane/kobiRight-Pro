import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="splash-container">
      <div class="splash-content">
        <h1>KobiRight Pro</h1>
        <p>Gestion des droits d'auteur simplifiée</p>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
      </div>
    </div>
  `,
  styles: [`
    .splash-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1976d2 0%, #64b5f6 100%);
      color: white;
    }

    .splash-content {
      text-align: center;
      padding: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    mat-progress-bar {
      width: 200px;
    }
  `]
})
export class SplashScreenComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
