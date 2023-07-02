import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoaderDirective } from './lazy-loader/lazy-loader.directive';

@NgModule({
  declarations: [LazyLoaderDirective],
  imports: [CommonModule],
  exports: [LazyLoaderDirective],
})
export class SharedModule {}
