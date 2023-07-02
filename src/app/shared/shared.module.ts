import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoaderDirective } from './lazy-loader/lazy-loader.directive';
import { IntersectingDirective } from './intersecting/intersecting.directive';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';

@NgModule({
  declarations: [LazyLoaderDirective, IntersectingDirective],
  imports: [CommonModule],
  exports: [LazyLoaderDirective, IntersectingDirective],
  providers: [LoggedInGuard],
})
export class SharedModule {}
