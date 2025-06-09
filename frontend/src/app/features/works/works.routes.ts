import { Routes } from '@angular/router';

export const WORKS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./works-list/works-list.component').then(m => m.WorksListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./work-declaration/work-declaration.component').then(m => m.WorkDeclarationComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./work-detail/work-detail.component').then(m => m.WorkDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./work-declaration/work-declaration.component').then(m => m.WorkDeclarationComponent)
  }
];
