import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkService } from '../../../core/services/work.service';
import { Work, Title, RightsHolder } from '../../../core/models/work.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  template: `
    <div class="container" *ngIf="workForm">
      <div class="header">
        <h1>{{ isEditMode ? 'Modifier l\'œuvre' : 'Nouvelle œuvre' }}</h1>
      </div>

      <form [formGroup]="workForm" (ngSubmit)="onSubmit()">
        <mat-card>
          <mat-card-content>
            <div class="form-section">
              <h2>Informations générales</h2>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Titre</mat-label>
                <input matInput formControlName="title" required>
                <mat-error *ngIf="workForm.get('title')?.hasError('required')">
                  Le titre est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Type d'œuvre</mat-label>
                <mat-select formControlName="type" required>
                  <mat-option value="MUSIC">Musique</mat-option>
                  <mat-option value="LYRICS">Paroles</mat-option>
                  <mat-option value="ARRANGEMENT">Arrangement</mat-option>
                </mat-select>
                <mat-error *ngIf="workForm.get('type')?.hasError('required')">
                  Le type est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Description</mat-label>
                <textarea matInput formControlName="description" rows="4"></textarea>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Date de création</mat-label>
                <input matInput [matDatepicker]="creationDatePicker" formControlName="creationDate" required>
                <mat-datepicker-toggle matSuffix [for]="creationDatePicker"></mat-datepicker-toggle>
                <mat-datepicker #creationDatePicker></mat-datepicker>
                <mat-error *ngIf="workForm.get('creationDate')?.hasError('required')">
                  La date de création est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Durée (minutes)</mat-label>
                <input matInput type="number" formControlName="duration" required>
                <mat-error *ngIf="workForm.get('duration')?.hasError('required')">
                  La durée est requise
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Territoire</mat-label>
                <input matInput formControlName="territory" required>
                <mat-error *ngIf="workForm.get('territory')?.hasError('required')">
                  Le territoire est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Mots-clés</mat-label>
                <mat-chip-grid #chipGrid>
                  <mat-chip-row *ngFor="let keyword of keywordsArray.controls; let i = index"
                    (removed)="removeKeyword(i)">
                    {{ keyword.value }}
                    <button matChipRemove>
                      <mat-icon>cancel</mat-icon>
                    </button>
                  </mat-chip-row>
                </mat-chip-grid>
                <input placeholder="Nouveau mot-clé..."
                  [matChipInputFor]="chipGrid"
                  (matChipInputTokenEnd)="addKeyword($event)">
              </mat-form-field>
            </div>

            <div class="form-section">
              <h2>Titres</h2>
              <div formArrayName="titles">
                <div *ngFor="let title of titlesArray.controls; let i = index" [formGroupName]="i" class="title-form">
                  <mat-form-field appearance="outline">
                    <mat-label>Titre</mat-label>
                    <input matInput formControlName="title" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Sous-titre</mat-label>
                    <input matInput formControlName="subtitle">
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Durée (minutes)</mat-label>
                    <input matInput type="number" formControlName="duration" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>BPM</mat-label>
                    <input matInput type="number" formControlName="bpm">
                  </mat-form-field>

                  <button mat-icon-button color="warn" type="button" (click)="removeTitle(i)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
              <button mat-button type="button" (click)="addTitle()">
                <mat-icon>add</mat-icon>
                Ajouter un titre
              </button>
            </div>

            <div class="form-section">
              <h2>Détenteurs de droits</h2>
              <div formArrayName="rightsHolders">
                <div *ngFor="let holder of rightsHoldersArray.controls; let i = index" [formGroupName]="i" class="holder-form">
                  <mat-form-field appearance="outline">
                    <mat-label>Prénom</mat-label>
                    <input matInput formControlName="firstName" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Nom</mat-label>
                    <input matInput formControlName="lastName" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Code IPI</mat-label>
                    <input matInput formControlName="codeIPI" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Rôle</mat-label>
                    <mat-select formControlName="role" required>
                      <mat-option value="AUTEUR">Auteur</mat-option>
                      <mat-option value="COMPOSER">Compositeur</mat-option>
                      <mat-option value="ARRANGEUR">Arrangeur</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Téléphone</mat-label>
                    <input matInput formControlName="phone" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Email</mat-label>
                    <input matInput type="email" formControlName="email" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Pourcentage</mat-label>
                    <input matInput type="number" formControlName="ownershipPercentage" required>
                  </mat-form-field>

                  <button mat-icon-button color="warn" type="button" (click)="removeRightsHolder(i)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
              <button mat-button type="button" (click)="addRightsHolder()">
                <mat-icon>add</mat-icon>
                Ajouter un détenteur de droits
              </button>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-button type="button" routerLink="/works">Annuler</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="workForm.invalid">
              {{ isEditMode ? 'Mettre à jour' : 'Créer' }}
            </button>
          </mat-card-actions>
        </mat-card>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      margin-bottom: 20px;
    }
    .form-section {
      margin: 20px 0;
    }
    .form-section h2 {
      margin-bottom: 15px;
      color: #333;
    }
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .title-form, .holder-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 15px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 16px;
    }
  `]
})
export class WorkEditComponent implements OnInit {
  workForm!: FormGroup;
  isEditMode = false;
  workId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private workService: WorkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.workId = Number(id);
      this.loadWork(this.workId);
    }
  }

  initForm(): void {
    this.workForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      creationDate: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0)]],
      territory: ['', Validators.required],
      keywords: this.fb.array([]),
      titles: this.fb.array([]),
      rightsHolders: this.fb.array([])
    });
  }

  get keywordsArray() {
    return this.workForm.get('keywords') as FormArray;
  }

  get titlesArray() {
    return this.workForm.get('titles') as FormArray;
  }

  get rightsHoldersArray() {
    return this.workForm.get('rightsHolders') as FormArray;
  }

  addKeyword(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywordsArray.push(this.fb.control(value));
      event.chipInput!.clear();
    }
  }

  removeKeyword(index: number): void {
    this.keywordsArray.removeAt(index);
  }

  addTitle(): void {
    const titleForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      duration: ['', [Validators.required, Validators.min(0)]],
      bpm: ['']
    });
    this.titlesArray.push(titleForm);
  }

  removeTitle(index: number): void {
    this.titlesArray.removeAt(index);
  }

  addRightsHolder(): void {
    const holderForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      codeIPI: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ownershipPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.rightsHoldersArray.push(holderForm);
  }

  removeRightsHolder(index: number): void {
    this.rightsHoldersArray.removeAt(index);
  }

  loadWork(id: number): void {
    this.workService.getWorkById(id).subscribe({
      next: (work) => {
        this.workForm.patchValue({
          title: work.title,
          type: work.type,
          description: work.description,
          creationDate: work.creationDate,
          duration: work.duration,
          territory: work.territory
        });

        // Charger les mots-clés
        work.keywords.forEach(keyword => {
          this.keywordsArray.push(this.fb.control(keyword));
        });

        // Charger les titres
        if (work.titles) {
          work.titles.forEach(title => {
            const titleForm = this.fb.group({
              title: [title.title, Validators.required],
              subtitle: [title.subtitle],
              duration: [title.duration, [Validators.required, Validators.min(0)]],
              bpm: [title.bpm]
            });
            this.titlesArray.push(titleForm);
          });
        }

        // Charger les détenteurs de droits
        if (work.rightsHolders) {
          work.rightsHolders.forEach(holder => {
            const holderForm = this.fb.group({
              firstName: [holder.firstName, Validators.required],
              lastName: [holder.lastName, Validators.required],
              codeIPI: [holder.codeIPI, Validators.required],
              role: [holder.role, Validators.required],
              phone: [holder.phone, Validators.required],
              email: [holder.email, [Validators.required, Validators.email]],
              ownershipPercentage: [holder.ownershipPercentage, [Validators.required, Validators.min(0), Validators.max(100)]]
            });
            this.rightsHoldersArray.push(holderForm);
          });
        }
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

  onSubmit(): void {
    if (this.workForm.valid) {
      const workData: Work = {
        ...this.workForm.value,
        keywords: this.keywordsArray.value
      };

      if (this.isEditMode && this.workId) {
        this.workService.updateWork(this.workId, workData).subscribe({
          next: () => {
            this.snackBar.open('Œuvre mise à jour avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/works', this.workId]);
          },
          error: (error) => {
            this.snackBar.open('Erreur lors de la mise à jour de l\'œuvre', 'Fermer', {
              duration: 3000
            });
            console.error('Error updating work:', error);
          }
        });
      } else {
        this.workService.createWork(workData).subscribe({
          next: (work) => {
            this.snackBar.open('Œuvre créée avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/works', work.id]);
          },
          error: (error) => {
            this.snackBar.open('Erreur lors de la création de l\'œuvre', 'Fermer', {
              duration: 3000
            });
            console.error('Error creating work:', error);
          }
        });
      }
    }
  }
}
