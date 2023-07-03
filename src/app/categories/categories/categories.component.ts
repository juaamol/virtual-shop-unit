import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../data/types/category';
import { ShopService } from '../../home/services/shop/shop.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories$ = of<Category[]>([]);

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.categories$ = this.shopService.getCategories();
  }
}
