import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  @Input() images: { image: string; name?: string }[] = [];
  @Output() clickedImageIndex = new EventEmitter<number>();

  imageClicked(index: number) {
    this.clickedImageIndex.emit(index);
  }
}
