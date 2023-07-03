import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ShopService,
  DEFAULT_PAGINATION,
} from '../../home/services/shop/shop.service';
import { of, Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, scan } from 'rxjs/operators';
import { SharedModule } from '../../shared/shared.module';
import { Category } from '../../data/types/category';
import { Pagination } from 'src/app/data/types/pagination';
import { Product } from 'src/app/data/types/product';

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
  lastElementVisible$ = new BehaviorSubject(true);

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idFromUrl();
    this.intersectionGetProducts();
    this.getCategory();
  }

  goToProduct(id: number) {
    this.router.navigate(['', 'product', id]);
  }

  intersecting() {
    this.lastElementVisible$.next(true);
  }

  private idFromUrl() {
    this.id$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')));
  }

  private getCategory() {
    this.category$ = this.id$.pipe(
      filter((id) => id !== null),
      switchMap((id) => this.shopService.getCategory(id!))
    );
  }

  private intersectionGetProducts() {
    this.products$ = combineLatest([this.id$, this.lastElementVisible$]).pipe(
      filter(([id]) => id !== null),
      map(([id]) => ({ pagination: DEFAULT_PAGINATION, id: id! })),
      scan(
        (
          acc: { pagination: Pagination; id: string },
          currentPage: { pagination: Pagination; id: string }
        ) => {
          return {
            pagination: {
              offset: acc.pagination.offset + DEFAULT_PAGINATION.limit,
              limit: DEFAULT_PAGINATION.limit,
            },
            id: currentPage.id,
          };
        },
        { pagination: DEFAULT_PAGINATION, id: '' }
      ),
      switchMap((page) =>
        this.shopService.getProductsByCategory(page.id, page.pagination)
      ),
      scan(
        (acc: Product[], response: Product[]) => acc.concat(response),
        new Array<Product>()
      ),
      map((products) =>
        products.map((product) => ({
          id: product.id,
          image: product.images[0],
          name: product.title,
        }))
      )
    );
  }
}
