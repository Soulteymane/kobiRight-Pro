import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkService, Work } from '../../../core/services/work.service';

@Component({
  selector: 'app-work-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <div class="work-form-container">
      <mat-stepper [linear]="true" #stepper>
        <!-- Étape 1: Informations générales -->
        <mat-step [stepControl]="generalInfoForm">
          <ng-template matStepLabel>Informations générales</ng-template>
          <form [formGroup]="generalInfoForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Titre</mat-label>
              <input matInput formControlName="title" required>
              <mat-error *ngIf="generalInfoForm.get('title')?.hasError('required')">
                Le titre est requis
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Type d'œuvre</mat-label>
              <mat-select formControlName="type" required>
                <mat-option value="MUSICAL">Musicale</mat-option>
                <mat-option value="LITERARY">Littéraire</mat-option>
                <mat-option value="AUDIOVISUAL">Audiovisuelle</mat-option>
              </mat-select>
              <mat-error *ngIf="generalInfoForm.get('type')?.hasError('required')">
                Le type est requis
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Date de création</mat-label>
              <input matInput [matDatepicker]="creationDate" formControlName="creationDate" required>
              <mat-datepicker-toggle matSuffix [for]="creationDate"></mat-datepicker-toggle>
              <mat-datepicker #creationDate></mat-datepicker>
              <mat-error *ngIf="generalInfoForm.get('creationDate')?.hasError('required')">
                La date de création est requise
              </mat-error>
            </mat-form-field>
          </form>
          <div class="step-actions">
            <button mat-button matStepperNext [disabled]="generalInfoForm.invalid">Suivant</button>
          </div>
        </mat-step>

        <!-- Étape 2: Détails de l'œuvre -->
        <mat-step [stepControl]="workDetailsForm">
          <ng-template matStepLabel>Détails de l'œuvre</ng-template>
          <form [formGroup]="workDetailsForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="4" required></textarea>
              <mat-error *ngIf="workDetailsForm.get('description')?.hasError('required')">
                La description est requise
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Durée (en minutes)</mat-label>
              <input matInput type="number" formControlName="duration" required>
              <mat-error *ngIf="workDetailsForm.get('duration')?.hasError('required')">
                La durée est requise
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Mots-clés</mat-label>
              <mat-chip-grid #chipGrid>
                <mat-chip-row *ngFor="let keyword of keywords" (removed)="removeKeyword(keyword)">
                  {{keyword}}
                  <button matChipRemove>
                    <mat-icon>cancel</mat-icon>
                  </button>
                </mat-chip-row>
                <input placeholder="Nouveau mot-clé..."
                       [matChipInputFor]="chipGrid"
                       (matChipInputTokenEnd)="addKeyword($event)">
              </mat-chip-grid>
            </mat-form-field>
          </form>
          <div class="step-actions">
            <button mat-button matStepperPrevious>Précédent</button>
            <button mat-button matStepperNext [disabled]="workDetailsForm.invalid">Suivant</button>
          </div>
        </mat-step>

        <!-- Étape 3: Droits d'auteur -->
        <mat-step [stepControl]="rightsForm">
          <ng-template matStepLabel>Droits d'auteur</ng-template>
          <form [formGroup]="rightsForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Type de droit</mat-label>
              <mat-select formControlName="rightType" required>
                <mat-option value="COPYRIGHT">Copyright</mat-option>
                <mat-option value="PERFORMANCE">Droit de représentation</mat-option>
                <mat-option value="REPRODUCTION">Droit de reproduction</mat-option>
              </mat-select>
              <mat-error *ngIf="rightsForm.get('rightType')?.hasError('required')">
                Le type de droit est requis
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Date d'expiration</mat-label>
              <input matInput [matDatepicker]="expirationDate" formControlName="expirationDate" required>
              <mat-datepicker-toggle matSuffix [for]="expirationDate"></mat-datepicker-toggle>
              <mat-datepicker #expirationDate></mat-datepicker>
              <mat-error *ngIf="rightsForm.get('expirationDate')?.hasError('required')">
                La date d'expiration est requise
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Territoire</mat-label>
              <input matInput formControlName="territory" required>
              <mat-error *ngIf="rightsForm.get('territory')?.hasError('required')">
                Le territoire est requis
              </mat-error>
            </mat-form-field>
          </form>
          <div class="step-actions">
            <button mat-button matStepperPrevious>Précédent</button>
            <button mat-button (click)="onSubmit()" [disabled]="rightsForm.invalid">Soumettre</button>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .work-form-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }

    .step-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
  `]
})
export class WorkFormComponent implements OnInit {
  generalInfoForm: FormGroup;
  workDetailsForm: FormGroup;
  rightsForm: FormGroup;
  keywords: string[] = [];
  isEditMode = false;
  workId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private workService: WorkService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.generalInfoForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      creationDate: ['', Validators.required]
    });

    this.workDetailsForm = this.fb.group({
      description: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(0)]]
    });

    this.rightsForm = this.fb.group({
      rightType: ['', Validators.required],
      expirationDate: ['', Validators.required],
      territory: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.workId = Number(id);
      this.loadWork(this.workId);
    }
  }

  loadWork(id: number): void {
    this.workService.getWorkById(id).subscribe({
      next: (work) => {
        this.generalInfoForm.patchValue({
          title: work.title,
          type: work.type,
          creationDate: new Date(work.creationDate)
        });

        this.workDetailsForm.patchValue({
          description: work.description,
          duration: work.duration
        });

        this.rightsForm.patchValue({
          rightType: work.rightType,
          expirationDate: new Date(work.expirationDate),
          territory: work.territory
        });

        this.keywords = [...work.keywords];
      },
      error: (error: Error) => {
        this.snackBar.open('Erreur lors du chargement de l\'œuvre', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/works']);
      }
    });
  }

  addKeyword(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.generalInfoForm.valid && this.workDetailsForm.valid && this.rightsForm.valid) {
      const workData: Work = {
        ...this.generalInfoForm.value,
        ...this.workDetailsForm.value,
        ...this.rightsForm.value,
        keywords: this.keywords
      };

      if (this.isEditMode && this.workId) {
        this.workService.updateWork(this.workId, workData).subscribe({
          next: () => {
            this.snackBar.open('Œuvre mise à jour avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/works', this.workId]);
          },
          error: (error: Error) => {
            this.snackBar.open('Erreur lors de la mise à jour de l\'œuvre', 'Fermer', {
              duration: 3000
            });
          }
        });
      } else {
        this.workService.createWork(workData).subscribe({
          next: () => {
            this.snackBar.open('Œuvre créée avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/works']);
          },
          error: (error: Error) => {
            this.snackBar.open('Erreur lors de la création de l\'œuvre', 'Fermer', {
              duration: 3000
            });
          }
        });
      }
    }
  }
}
