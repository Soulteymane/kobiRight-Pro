import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgrammesDeclarerComponent } from './programmes-declarer/programmes-declarer.component';
import { ProgrammesConsulterComponent } from './programmes-consulter/programmes-consulter.component';

const routes: Routes = [
  {
    path: 'programmes-declarer',
    component: ProgrammesDeclarerComponent
  },
  {
    path: 'programmes-consulter',
    component: ProgrammesConsulterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgrammesModule { }
