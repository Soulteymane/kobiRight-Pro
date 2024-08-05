import { OeuvresRoutingModule } from './oeuvres-routing.module';
import { OeuvresCatalogueComponent } from './oeuvres-catalogue/oeuvres-catalogue.component';
import { OeuvresSignerComponent } from './oeuvres-signer/oeuvres-signer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OeuvresComponent } from './oeuvres.component';
import { OeuvresDeclarerComponent } from './oeuvres-declarer/oeuvres-declarer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatList, MatListItem} from "@angular/material/list";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";



@NgModule({
  declarations: [
    OeuvresComponent,
    OeuvresSignerComponent,
    OeuvresCatalogueComponent,
    OeuvresDeclarerComponent
  ],
  imports: [
    CommonModule,
    OeuvresRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule, // Ajouté pour éviter les erreurs liées aux icônes
    NgbModule,
    MatCheckbox,
    MatList,
    MatListItem,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionModule,
    MatExpansionPanelDescription
  ]
})
export class OeuvresModule { }
