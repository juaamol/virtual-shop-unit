import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductComponent, ImageGalleryComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule],
})
export class ProductModule {}
