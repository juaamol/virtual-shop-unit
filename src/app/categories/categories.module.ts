import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesGalleryComponent } from './categories-gallery/categories-gallery.component';
import { CategoriesComponent } from './categories/categories.component';



@NgModule({
  declarations: [
    CategoriesGalleryComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriesModule { }
