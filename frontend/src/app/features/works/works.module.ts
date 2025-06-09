import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WORKS_ROUTES } from './works.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WORKS_ROUTES)
  ]
})
export class WorksModule { }
