import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./category/category.component').then((x) => x.CategoryComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
