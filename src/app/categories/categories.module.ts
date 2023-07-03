import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesGalleryComponent } from './categories-gallery/categories-gallery.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [CategoriesGalleryComponent, CategoriesComponent],
  imports: [CommonModule, ProductRoutingModule],
})
export class CategoriesModule {}
