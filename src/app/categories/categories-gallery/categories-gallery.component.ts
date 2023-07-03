import { Component, Input } from '@angular/core';
import { Category } from 'src/app/data/types/category';

@Component({
  selector: 'app-categories-gallery',
  templateUrl: './categories-gallery.component.html',
  styleUrls: ['./categories-gallery.component.scss'],
})
export class CategoriesGalleryComponent {
  @Input() categories: Category[] = [];
}
