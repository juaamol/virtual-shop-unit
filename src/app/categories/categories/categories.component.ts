import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Category } from '../../data/types/category';
import { ShopService } from '../../home/services/shop/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories$ = of<Category[]>([]);

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit() {
    this.categories$ = this.shopService.getCategories();
  }

  goToCategory(id: number) {
    this.router.navigate(['', 'categories', id]);
  }
}
