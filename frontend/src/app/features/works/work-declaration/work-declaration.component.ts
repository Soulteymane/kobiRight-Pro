import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkService } from '../../../core/services/work.service';

@Component({
  selector: 'app-work-declaration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <div class="declaration-container">
      <mat-stepper [linear]="true" #stepper>
        <!-- Étape 1: Type d'œuvre -->
        <mat-step [stepControl]="workTypeForm">
          <ng-template matStepLabel>Type d'œuvre</ng-template>
          <form [formGroup]="workTypeForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Type d'œuvre</mat-label>
              <mat-select formControlName="type" required>
                <mat-option value="MUSIC">Musique</mat-option>
                <mat-option value="LYRICS">Paroles</mat-option>
                <mat-option value="ARRANGEMENT">Arrangement</mat-option>
              </mat-select>
              <mat-error *ngIf="workTypeForm.get('type')?.hasError('required')">
                Le type d'œuvre est requis
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nom général de l'œuvre</mat-label>
              <input matInput formControlName="generalName" required>
              <mat-error *ngIf="workTypeForm.get('generalName')?.hasError('required')">
                Le nom général est requis
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button matStepperNext [disabled]="workTypeForm.invalid">Suivant</button>
            </div>
          </form>
        </mat-step>

        <!-- Étape 2: Titres -->
        <mat-step [stepControl]="titlesForm">
          <ng-template matStepLabel>Titres</ng-template>
          <form [formGroup]="titlesForm">
            <div formArrayName="titles">
              <div *ngFor="let title of titlesArray.controls; let i = index" [formGroupName]="i" class="title-group">
                <h3>Titre {{i + 1}}</h3>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Titre</mat-label>
                  <input matInput formControlName="title" required>
                  <mat-error *ngIf="title.get('title')?.hasError('required')">
                    Le titre est requis
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Sous-titre</mat-label>
                  <input matInput formControlName="subtitle">
                </mat-form-field>

                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Durée (minutes)</mat-label>
                    <input matInput type="number" formControlName="duration" required>
                    <mat-error *ngIf="title.get('duration')?.hasError('required')">
                      La durée est requise
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>BPM</mat-label>
                    <input matInput type="number" formControlName="bpm">
                  </mat-form-field>
                </div>

                <button mat-icon-button color="warn" type="button" (click)="removeTitle(i)" *ngIf="titlesArray.length > 1">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <button mat-button type="button" (click)="addTitle()">
              <mat-icon>add</mat-icon>
              Ajouter un titre
            </button>

            <div class="form-actions">
              <button mat-button matStepperPrevious>Précédent</button>
              <button mat-button matStepperNext [disabled]="titlesForm.invalid">Suivant</button>
            </div>
          </form>
        </mat-step>

        <!-- Étape 3: Droits -->
        <mat-step [stepControl]="rightsForm">
          <ng-template matStepLabel>Droits</ng-template>
          <form [formGroup]="rightsForm">
            <div formArrayName="rightsHolders">
              <div *ngFor="let holder of rightsHoldersArray.controls; let i = index" [formGroupName]="i" class="holder-group">
                <h3>Détenteur de droits {{i + 1}}</h3>
                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Prénom</mat-label>
                    <input matInput formControlName="firstName" required>
                    <mat-error *ngIf="holder.get('firstName')?.hasError('required')">
                      Le prénom est requis
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Nom</mat-label>
                    <input matInput formControlName="lastName" required>
                    <mat-error *ngIf="holder.get('lastName')?.hasError('required')">
                      Le nom est requis
                    </mat-error>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Code IPI</mat-label>
                  <input matInput formControlName="codeIPI" required>
                  <mat-error *ngIf="holder.get('codeIPI')?.hasError('required')">
                    Le code IPI est requis
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Rôle</mat-label>
                  <mat-select formControlName="role" required>
                    <mat-option value="AUTEUR">Auteur</mat-option>
                    <mat-option value="COMPOSER">Compositeur</mat-option>
                    <mat-option value="ARRANGEUR">Arrangeur</mat-option>
                  </mat-select>
                  <mat-error *ngIf="holder.get('role')?.hasError('required')">
                    Le rôle est requis
                  </mat-error>
                </mat-form-field>

                <div class="form-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Téléphone</mat-label>
                    <input matInput formControlName="phone" required>
                    <mat-error *ngIf="holder.get('phone')?.hasError('required')">
                      Le téléphone est requis
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Email</mat-label>
                    <input matInput formControlName="email" type="email" required>
                    <mat-error *ngIf="holder.get('email')?.hasError('required')">
                      L'email est requis
                    </mat-error>
                    <mat-error *ngIf="holder.get('email')?.hasError('email')">
                      Format d'email invalide
                    </mat-error>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Pourcentage de propriété</mat-label>
                  <input matInput type="number" formControlName="ownershipPercentage" required>
                  <mat-error *ngIf="holder.get('ownershipPercentage')?.hasError('required')">
                    Le pourcentage est requis
                  </mat-error>
                </mat-form-field>

                <button mat-icon-button color="warn" type="button" (click)="removeRightsHolder(i)" *ngIf="rightsHoldersArray.length > 1">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <button mat-button type="button" (click)="addRightsHolder()">
              <mat-icon>add</mat-icon>
              Ajouter un détenteur de droits
            </button>

            <div class="form-actions">
              <button mat-button matStepperPrevious>Précédent</button>
              <button mat-button matStepperNext [disabled]="rightsForm.invalid">Suivant</button>
            </div>
          </form>
        </mat-step>

        <!-- Étape 4: Confirmation -->
        <mat-step>
          <ng-template matStepLabel>Confirmation</ng-template>
          <div class="confirmation-content">
            <h2>Récapitulatif de la déclaration</h2>

            <div class="summary-section">
              <h3>Type d'œuvre</h3>
              <p><strong>Type:</strong> {{workTypeForm.get('type')?.value}}</p>
              <p><strong>Nom général:</strong> {{workTypeForm.get('generalName')?.value}}</p>
            </div>

            <div class="summary-section">
              <h3>Titres</h3>
              <div *ngFor="let title of titlesArray.controls; let i = index">
                <h4>Titre {{i + 1}}</h4>
                <p><strong>Titre:</strong> {{title.get('title')?.value}}</p>
                <p><strong>Sous-titre:</strong> {{title.get('subtitle')?.value}}</p>
                <p><strong>Durée:</strong> {{title.get('duration')?.value}} minutes</p>
                <p><strong>BPM:</strong> {{title.get('bpm')?.value}}</p>
              </div>
            </div>

            <div class="summary-section">
              <h3>Détenteurs de droits</h3>
              <div *ngFor="let holder of rightsHoldersArray.controls; let i = index">
                <h4>Détenteur {{i + 1}}</h4>
                <p><strong>Nom:</strong> {{holder.get('firstName')?.value}} {{holder.get('lastName')?.value}}</p>
                <p><strong>Code IPI:</strong> {{holder.get('codeIPI')?.value}}</p>
                <p><strong>Rôle:</strong> {{holder.get('role')?.value}}</p>
                <p><strong>Pourcentage:</strong> {{holder.get('ownershipPercentage')?.value}}%</p>
              </div>
            </div>

            <div class="form-actions">
              <button mat-button matStepperPrevious>Précédent</button>
              <button mat-raised-button color="primary" (click)="submitDeclaration()">
                Confirmer la déclaration
              </button>
            </div>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .declaration-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }

    .form-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .form-row mat-form-field {
      flex: 1;
    }

    .form-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 2rem;
    }

    .title-group, .holder-group {
      position: relative;
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }

    .title-group button, .holder-group button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }

    .confirmation-content {
      padding: 1rem;
    }

    .summary-section {
      margin-bottom: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 4px;
    }

    .summary-section h3 {
      margin-bottom: 1rem;
      color: #1976d2;
    }

    .summary-section h4 {
      margin: 1rem 0;
      color: #666;
    }

    @media (max-width: 600px) {
      .form-row {
        flex-direction: column;
        gap: 0;
      }

      .declaration-container {
        margin: 1rem auto;
      }
    }
  `]
})
export class WorkDeclarationComponent implements OnInit {
  workTypeForm: FormGroup;
  titlesForm: FormGroup;
  rightsForm: FormGroup;
  isEditMode = false;
  workId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private workService: WorkService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.workTypeForm = this.fb.group({
      type: ['', Validators.required],
      generalName: ['', Validators.required]
    });

    this.titlesForm = this.fb.group({
      titles: this.fb.array([])
    });

    this.rightsForm = this.fb.group({
      rightsHolders: this.fb.array([])
    });

    // Ajouter un titre et un détenteur de droits par défaut
    this.addTitle();
    this.addRightsHolder();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.workId = Number(id);
      this.loadWork(this.workId);
    }
  }

  get titlesArray() {
    return this.titlesForm.get('titles') as FormArray;
  }

  get rightsHoldersArray() {
    return this.rightsForm.get('rightsHolders') as FormArray;
  }

  addTitle() {
    const titleGroup = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      duration: ['', [Validators.required, Validators.min(0)]],
      bpm: ['']
    });
    this.titlesArray.push(titleGroup);
  }

  removeTitle(index: number) {
    this.titlesArray.removeAt(index);
  }

  addRightsHolder() {
    const holderGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      codeIPI: ['', Validators.required],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ownershipPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.rightsHoldersArray.push(holderGroup);
  }

  removeRightsHolder(index: number) {
    this.rightsHoldersArray.removeAt(index);
  }

  loadWork(id: number) {
    this.workService.getWorkById(id).subscribe({
      next: (work) => {
        // Remplir les formulaires avec les données de l'œuvre
        this.workTypeForm.patchValue({
          type: work.type,
          generalName: work.title
        });
        // TODO: Charger les titres et les détenteurs de droits
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement de l\'œuvre', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/works']);
      }
    });
  }

  submitDeclaration() {
    if (this.workTypeForm.valid && this.titlesForm.valid && this.rightsForm.valid) {
      const workData = {
        ...this.workTypeForm.value,
        titles: this.titlesForm.value.titles,
        rightsHolders: this.rightsForm.value.rightsHolders
      };

      if (this.isEditMode && this.workId) {
        this.workService.updateWork(this.workId, workData).subscribe({
          next: () => {
            this.snackBar.open('Œuvre mise à jour avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/works']);
          },
          error: (error) => {
            this.snackBar.open('Erreur lors de la mise à jour de l\'œuvre', 'Fermer', {
              duration: 3000
            });
          }
        });
      } else {
        this.workService.createWork(workData).subscribe({
          next: () => {
            this.snackBar.open('Œuvre déclarée avec succès', 'Fermer', {
              duration: 3000
            });
            this.router.navigate(['/works']);
          },
          error: (error) => {
            this.snackBar.open('Erreur lors de la déclaration de l\'œuvre', 'Fermer', {
              duration: 3000
            });
          }
        });
      }
    }
  }
}
