import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesGalleryComponent } from './categories-gallery/categories-gallery.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CategoriesGalleryComponent, CategoriesComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class CategoriesModule {}
