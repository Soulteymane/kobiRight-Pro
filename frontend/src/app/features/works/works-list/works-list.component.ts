import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkService } from '../../../core/services/work.service';
import { Work } from '../../../core/models/work.model';

@Component({
  selector: 'app-works-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  template: `
    <div class="works-container">
      <div class="works-header">
        <h1>Mes œuvres</h1>
        <button mat-raised-button color="primary" (click)="createWork()">
          <mat-icon>add</mat-icon>
          Nouvelle œuvre
        </button>
      </div>

      <mat-form-field>
        <mat-label>Rechercher</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Ex. Titre" #input>
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- Titre Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Titre </th>
            <td mat-cell *matCellDef="let row"> {{row.title}} </td>
          </ng-container>

          <!-- Type Column -->
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Type </th>
            <td mat-cell *matCellDef="let row"> {{row.type}} </td>
          </ng-container>

          <!-- Date de création Column -->
          <ng-container matColumnDef="creationDate">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Date de création </th>
            <td mat-cell *matCellDef="let row"> {{row.creationDate | date}} </td>
          </ng-container>

          <!-- Type de droit Column -->
          <ng-container matColumnDef="rightType">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> Type de droit </th>
            <td mat-cell *matCellDef="let row"> {{row.rightType}} </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let row">
              <button mat-icon-button color="primary" (click)="viewWork(row)">
                <mat-icon>visibility</mat-icon>
              </button>
              <button mat-icon-button color="accent" (click)="editWork(row)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteWork(row)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

          <!-- Row shown when there is no matching data. -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="5">Aucune donnée ne correspond au filtre "{{input.value}}"</td>
          </tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Sélectionner la page des œuvres"></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .works-container {
      padding: 20px;
    }

    .works-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .mat-form-field {
      font-size: 14px;
      width: 100%;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }

    .mat-mdc-row .mat-mdc-cell {
      border-bottom: 1px solid transparent;
      border-top: 1px solid transparent;
      cursor: pointer;
    }

    .mat-mdc-row:hover .mat-mdc-cell {
      border-color: currentColor;
    }
  `]
})
export class WorksListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'type', 'creationDate', 'rightType', 'actions'];
  dataSource: Work[] = [];

  @ViewChild(MatTable) table!: MatTable<Work>;

  constructor(
    private workService: WorkService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadWorks();
  }

  loadWorks(): void {
    this.workService.getAllWorks().subscribe({
      next: (works: Work[]) => {
        this.dataSource = works;
      },
      error: (error: Error) => {
        this.snackBar.open('Erreur lors du chargement des œuvres', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    // Implémenter la logique de filtrage ici
  }

  createWork(): void {
    this.router.navigate(['/works/new']);
  }

  viewWork(work: Work): void {
    this.router.navigate(['/works', work.id]);
  }

  editWork(work: Work): void {
    this.router.navigate(['/works', work.id, 'edit']);
  }

  deleteWork(work: Work): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette œuvre ?')) {
      this.workService.deleteWork(work.id!).subscribe({
        next: () => {
          this.snackBar.open('Œuvre supprimée avec succès', 'Fermer', {
            duration: 3000
          });
          this.loadWorks();
        },
        error: (error: Error) => {
          this.snackBar.open('Erreur lors de la suppression de l\'œuvre', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }
}
