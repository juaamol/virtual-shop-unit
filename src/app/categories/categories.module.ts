import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ProductRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    CategoryComponent,
  ],
  exports: [],
})
export class CategoriesModule {}
