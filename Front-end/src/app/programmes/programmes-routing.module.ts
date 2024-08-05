import { ProgrammesConsulterComponent } from './programmes-consulter/programmes-consulter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammesComponent } from './programmes.component';
import { ProgrammesDeclarerComponent } from './programmes-declarer/programmes-declarer.component';



@NgModule({
  declarations: [
    ProgrammesComponent,
    ProgrammesDeclarerComponent,
    ProgrammesConsulterComponent
  ],
  imports: [
    CommonModule,
    ProgrammesRoutingModule
  ]
})
export class ProgrammesRoutingModule { }
