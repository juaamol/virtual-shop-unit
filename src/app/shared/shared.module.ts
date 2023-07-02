import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoaderDirective } from './lazy-loader/lazy-loader.directive';
import { IntersectingDirective } from './intersecting/intersecting.directive';

@NgModule({
  declarations: [LazyLoaderDirective, IntersectingDirective],
  imports: [CommonModule],
  exports: [LazyLoaderDirective, IntersectingDirective],
})
export class SharedModule {}
