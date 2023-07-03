import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../home/services/shop/shop.service';
import { of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, last } from 'rxjs/operators';
import { SharedModule } from '../../shared/shared.module';
import { Category } from '../../data/types/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  id$!: Observable<string | null>;
  products$ = of<{ id: number; image: string; name: string }[]>([]);
  category$!: Observable<Category>;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idFromUrl();
    this.getProducts();
    this.getCategory();
  }

  private idFromUrl() {
    this.id$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')));
  }

  private getProducts() {
    this.products$ = this.id$.pipe(
      filter((id) => id !== null),
      switchMap((id) => this.shopService.getProductsByCategory(id!)),
      map((products) =>
        products.map((product) => ({
          id: product.id,
          image: product.images[0],
          name: product.title,
        }))
      )
    );
  }

  private getCategory() {
    this.category$ = this.id$.pipe(
      filter((id) => id !== null),
      switchMap((id) => this.shopService.getCategory(id!))
    );
  }

  goToProduct(id: number) {
    this.router.navigate(['', 'product', id]);
  }
}
