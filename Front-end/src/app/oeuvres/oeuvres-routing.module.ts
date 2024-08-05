import { OeuvresCatalogueComponent } from './oeuvres-catalogue/oeuvres-catalogue.component';
import { OeuvresSignerComponent } from './oeuvres-signer/oeuvres-signer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OeuvresDeclarerComponent } from './oeuvres-declarer/oeuvres-declarer.component';

const routes: Routes = [
  {
    path: 'oeuvres-declarer',
    component: OeuvresDeclarerComponent
  },
  {
    path: 'oeuvres-signer',
    component: OeuvresSignerComponent
  },
  {
    path: 'oeuvres-catalogue',
    component: OeuvresCatalogueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OeuvresRoutingModule { }
