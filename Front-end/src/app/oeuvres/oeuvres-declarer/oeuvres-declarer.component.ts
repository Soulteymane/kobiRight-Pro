import { Component, OnInit } from '@angular/core';
import { OeuvreService } from '../../service/oeuvre.service';
import { AyantDroit } from '../../model/AyantDroit';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Component({
  selector: 'app-oeuvres-declarer',
  templateUrl: './oeuvres-declarer.component.html',
  styleUrls: ['./oeuvres-declarer.component.scss']
})
export class OeuvresDeclarerComponent implements OnInit {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  filteredAyantDroits: AyantDroit[] = [];
  roles: string[] = ['AUTEUR', 'COMPOSITEUR', 'ARRANGEUR', 'EDITEUR'];
  users: any[] = []; // To hold the searched users
  selectedWorkIndex: number | null = null;
  selectedAyantDroitIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private oeuvreService: OeuvreService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormGroups();
    this.addWork(); // Add one work by default
  }

  private initFormGroups(): void {
    this.firstFormGroup = this.fb.group({
      typeOeuvre: ['', Validators.required],
      nom: ['', Validators.required],
      imageDeCouverture: ['', Validators.required],
    });

    this.secondFormGroup = this.fb.group({
      works: this.fb.array([])
    });

    this.thirdFormGroup = this.fb.group({
      worksAd: this.fb.array([])
    });

    this.fourthFormGroup = this.fb.group({
      signature: ['', Validators.required],
      validation: [false, Validators.requiredTrue]
    });
  }

  get works(): FormArray {
    return this.secondFormGroup.get('works') as FormArray;
  }

  get worksControls(): FormGroup[] {
    return this.works.controls as FormGroup[];
  }

  get worksAd(): FormArray {
    return this.thirdFormGroup.get('worksAd') as FormArray;
  }

  get worksControlsAd(): FormGroup[] {
    return this.worksAd.controls as FormGroup[];
  }

  addWork(): void {
    const typeOeuvre = this.firstFormGroup.get('typeOeuvre')?.value;
    if (typeOeuvre !== 'Single' || this.works.length === 0) {
      this.works.push(this.fb.group({
        titre: ['', Validators.required],
        sousTitre: [''],
        origine: [''],
        duree: [''],
        bpm: [''],
        interprete: [''],
        genre: [''],
        style: [''],
        fichier: [''],
        ayantsDroit: this.fb.array([])
      }));
    }
  }

  removeWork(index: number): void {
    this.works.removeAt(index);
  }

  addAyantDroit(workIndex: number): void {
    const ayantsDroit = this.works.at(workIndex).get('ayantsDroit') as FormArray;
      nomAyantDroit: ['', Validators.required],
      prenom: ['', Validators.required],
      pseudonyme: [''],
      codeIPI: ['', Validators.required],
  }

  removeAyantDroit(workIndex: number, ayantDroitIndex: number): void {
    const ayantsDroit = this.works.at(workIndex).get('ayantsDroit') as FormArray;
    ayantsDroit.removeAt(ayantDroitIndex);
  }

  showAddWorkButton(): boolean {
    const typeOeuvre = this.firstFormGroup.get('typeOeuvre')?.value;
    return typeOeuvre !== 'Single' || this.works.length === 0;
  }

  showMultipleWorks(): boolean {
    const typeOeuvre = this.firstFormGroup.get('typeOeuvre')?.value;
    return typeOeuvre !== 'Single';
  }

  nextStep(): void {
      this.currentStep++;
      this.currentStep++;
      this.currentStep++;
    }
  }

  previousStep(): void {
      this.currentStep--;
    }
  }

  submit(): void {
      const oeuvreData = {
        typeOeuvre: this.firstFormGroup.get('typeOeuvre')?.value,
        nom: this.firstFormGroup.get('nom')?.value,
        imageDeCouverture: this.firstFormGroup.get('imageDeCouverture')?.value,
        works: this.works.controls.map(work => ({
          titre: work.get('titre')?.value,
          sousTitre: work.get('sousTitre')?.value,
          origine: work.get('origine')?.value,
          duree: work.get('duree')?.value,
          bpm: work.get('bpm')?.value,
          interprete: work.get('interprete')?.value,
          genre: work.get('genre')?.value,
          style: work.get('style')?.value,
          fichier: work.get('fichier')?.value,
          ayantsDroit: (work.get('ayantsDroit') as FormArray).controls.map(ad => ({
            nomAyantDroit: ad.get('nomAyantDroit')?.value,
            prenom: ad.get('prenom')?.value,
            pseudonyme: ad.get('pseudonyme')?.value,
            codeIPI: ad.get('codeIPI')?.value,
            role: ad.get('role')?.value,
            telephone: ad.get('telephone')?.value,
            email: ad.get('email')?.value,
            pourcentage: ad.get('pourcentage')?.value
          }))
      };

      this.oeuvreService.createOeuvre(oeuvreData).subscribe(
          this.snackBar.open('Œuvre créée avec succès!', 'Fermer', {
            duration: 5000,
          });
          this.router.navigate(['/oeuvres']);
        },
        error => {
          this.snackBar.open('Erreur lors de la création de l\'œuvre', 'Fermer', {
            duration: 5000,
          });
        }
      );
    }
  }

  searchUsersByName(event: Event, workIndex: number, ayantDroitIndex: number): void {
    const name = (event.target as HTMLInputElement).value;
    if (name && name.length > 2) {
      this.userService.searchUsersByName(name).subscribe(users => {
        this.users = users;
        this.selectedWorkIndex = workIndex;
        this.selectedAyantDroitIndex = ayantDroitIndex;
      });
    } else {
      this.users = [];
    }
  }

  selectUser(user: any, workIndex: number, ayantDroitIndex: number): void {
    const ayantsDroit = this.works.at(workIndex).get('ayantsDroit') as FormArray;
    ayantsDroit.at(ayantDroitIndex).patchValue({
      nomAyantDroit: user.nom,
      prenom: user.prenom,
      codeIPI: user.codeIPI,
      telephone: user.telephone,
      email: user.email
    });
    this.users = []; // Clear the suggestions after selection
    this.selectedWorkIndex = null;
    this.selectedAyantDroitIndex = null;
  }
}
