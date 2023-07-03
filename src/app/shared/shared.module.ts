import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoaderDirective } from './lazy-loader/lazy-loader.directive';
import { IntersectingDirective } from './intersecting/intersecting.directive';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { GalleryComponent } from './components/gallery/gallery.component';
import { StrToImgPipe } from './pipes/str-to-img/str-to-img.pipe';

@NgModule({
  declarations: [
    LazyLoaderDirective,
    IntersectingDirective,
    GalleryComponent,
    StrToImgPipe,
  ],
  imports: [CommonModule],
  exports: [
    LazyLoaderDirective,
    IntersectingDirective,
    GalleryComponent,
    StrToImgPipe,
  ],
  providers: [LoggedInGuard, StrToImgPipe],
})
export class SharedModule {}
