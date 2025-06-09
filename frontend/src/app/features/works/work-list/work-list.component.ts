import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../../core/services/work.service';
import { Work } from '../../../core/models/work.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-work-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Mes œuvres</h1>
        <button mat-raised-button color="primary" routerLink="/works/new">
          <mat-icon>add</mat-icon>
          Nouvelle œuvre
        </button>
      </div>

      <mat-card *ngIf="works.length === 0" class="empty-state">
        <mat-card-content>
          <p>Vous n'avez pas encore déclaré d'œuvre.</p>
          <button mat-raised-button color="primary" routerLink="/works/new">
            Déclarer une œuvre
          </button>
        </mat-card-content>
      </mat-card>

      <div class="works-grid" *ngIf="works.length > 0">
        <mat-card *ngFor="let work of works" class="work-card">
          <mat-card-header>
            <mat-card-title>{{ work.title }}</mat-card-title>
            <mat-card-subtitle>{{ work.type }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p><strong>Date de création:</strong> {{ work.creationDate | date }}</p>
            <p><strong>Durée:</strong> {{ work.duration }} minutes</p>
            <p><strong>Territoire:</strong> {{ work.territory }}</p>
            <div class="keywords">
              <mat-chip *ngFor="let keyword of work.keywords" color="primary" selected>
                {{ keyword }}
              </mat-chip>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/works', work.id]">Détails</button>
            <button mat-button [routerLink]="['/works', work.id, 'edit']">Modifier</button>
            <button mat-button color="warn" (click)="deleteWork(work.id)" [disabled]="!work.id">Supprimer</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .works-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .work-card {
      height: 100%;
    }
    .keywords {
      margin-top: 10px;
    }
    .empty-state {
      text-align: center;
      padding: 40px;
    }
    .empty-state p {
      margin-bottom: 20px;
      color: #666;
    }
  `]
})
export class WorkListComponent implements OnInit {
  works: Work[] = [];

  constructor(
    private workService: WorkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks(): void {
    this.workService.getAllWorks().subscribe({
      next: (works) => {
        this.works = works;
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement des œuvres', 'Fermer', {
          duration: 3000
        });
        console.error('Error loading works:', error);
      }
    });
  }

  deleteWork(id: number | undefined): void {
    if (!id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette œuvre ?')) {
      this.workService.deleteWork(id).subscribe({
        next: () => {
          this.works = this.works.filter(work => work.id !== id);
          this.snackBar.open('Œuvre supprimée avec succès', 'Fermer', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la suppression de l\'œuvre', 'Fermer', {
            duration: 3000
          });
          console.error('Error deleting work:', error);
        }
      });
    }
  }
}
