import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoaderDirective } from './lazy-loader/lazy-loader.directive';
import { IntersectingDirective } from './intersecting/intersecting.directive';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [LazyLoaderDirective, IntersectingDirective, GalleryComponent],
  imports: [CommonModule],
  exports: [LazyLoaderDirective, IntersectingDirective, GalleryComponent],
  providers: [LoggedInGuard],
})
export class SharedModule {}
