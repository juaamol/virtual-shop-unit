import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';



@NgModule({
  declarations: [
    ProductComponent,
    ImageGalleryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
