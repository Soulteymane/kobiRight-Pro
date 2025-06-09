import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkService } from '../../../core/services/work.service';
import { Work } from '../../../core/models/work.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
  ],
  template: `
    <div class="container" *ngIf="work">
      <div class="header">
        <h1>{{ work.title }}</h1>
        <div class="actions">
          <button mat-raised-button color="primary" [routerLink]="['/works', work.id, 'edit']">
            <mat-icon>edit</mat-icon>
            Modifier
          </button>
          <button mat-raised-button color="warn" (click)="deleteWork()" [disabled]="!work.id">
            <mat-icon>delete</mat-icon>
            Supprimer
          </button>
        </div>
      </div>

      <mat-card class="detail-card">
        <mat-card-content>
          <div class="section">
            <h2>Informations générales</h2>
            <mat-list>
              <mat-list-item>
                <span matListItemTitle>Type d'œuvre</span>
                <span matListItemLine>{{ work.type }}</span>
              </mat-list-item>
              <mat-list-item>
                <span matListItemTitle>Date de création</span>
                <span matListItemLine>{{ work.creationDate | date }}</span>
              </mat-list-item>
              <mat-list-item>
                <span matListItemTitle>Durée</span>
                <span matListItemLine>{{ work.duration }} minutes</span>
              </mat-list-item>
              <mat-list-item>
                <span matListItemTitle>Territoire</span>
                <span matListItemLine>{{ work.territory }}</span>
              </mat-list-item>
            </mat-list>
          </div>

          <mat-divider></mat-divider>

          <div class="section">
            <h2>Description</h2>
            <p>{{ work.description || 'Aucune description disponible' }}</p>
          </div>

          <mat-divider></mat-divider>

          <div class="section">
            <h2>Mots-clés</h2>
            <div class="keywords">
              <mat-chip *ngFor="let keyword of work.keywords" color="primary" selected>
                {{ keyword }}
              </mat-chip>
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="section" *ngIf="work.titles && work.titles.length > 0">
            <h2>Titres</h2>
            <mat-list>
              <mat-list-item *ngFor="let title of work.titles">
                <span matListItemTitle>{{ title.title }}</span>
                <span matListItemLine *ngIf="title.subtitle">{{ title.subtitle }}</span>
                <span matListItemLine>Durée: {{ title.duration }} minutes</span>
                <span matListItemLine *ngIf="title.bpm">BPM: {{ title.bpm }}</span>
              </mat-list-item>
            </mat-list>
          </div>

          <mat-divider></mat-divider>

          <div class="section" *ngIf="work.rightsHolders && work.rightsHolders.length > 0">
            <h2>Détenteurs de droits</h2>
            <mat-list>
              <mat-list-item *ngFor="let holder of work.rightsHolders">
                <span matListItemTitle>{{ holder.firstName }} {{ holder.lastName }}</span>
                <span matListItemLine>Rôle: {{ holder.role }}</span>
                <span matListItemLine>Code IPI: {{ holder.codeIPI }}</span>
                <span matListItemLine>Pourcentage: {{ holder.ownershipPercentage }}%</span>
              </mat-list-item>
            </mat-list>
          </div>
        </mat-card-content>
      </mat-card>
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
    .actions {
      display: flex;
      gap: 10px;
    }
    .detail-card {
      margin-bottom: 20px;
    }
    .section {
      margin: 20px 0;
    }
    .section h2 {
      margin-bottom: 15px;
      color: #333;
    }
    .keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    mat-divider {
      margin: 20px 0;
    }
  `]
})
export class WorkDetailComponent implements OnInit {
  work: Work | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadWork(Number(id));
    }
  }

  loadWork(id: number): void {
    this.workService.getWorkById(id).subscribe({
      next: (work) => {
        this.work = work;
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement de l\'œuvre', 'Fermer', {
          duration: 3000
        });
        console.error('Error loading work:', error);
        this.router.navigate(['/works']);
      }
    });
  }

  deleteWork(): void {
    if (!this.work?.id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette œuvre ?')) {
      this.workService.deleteWork(this.work.id).subscribe({
        next: () => {
          this.snackBar.open('Œuvre supprimée avec succès', 'Fermer', {
            duration: 3000
          });
          this.router.navigate(['/works']);
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
