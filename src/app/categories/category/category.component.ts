import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ShopService,
  DEFAULT_PAGINATION,
} from '../../home/services/shop/shop.service';
import { of, Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  filter,
  map,
  switchMap,
  scan,
  withLatestFrom,
  tap,
} from 'rxjs/operators';
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
    this.products$ = this.lastElementVisible$.pipe(
      map(() => DEFAULT_PAGINATION),
      scan((pagination) => {
        return {
          offset: pagination.offset + DEFAULT_PAGINATION.limit,
          limit: DEFAULT_PAGINATION.limit,
        };
      }, DEFAULT_PAGINATION),
      withLatestFrom(this.id$),
      filter(([_, id]) => id !== null),
      switchMap(([page, id]) =>
        this.shopService.getProductsByCategory(id!, page)
      ),
      scan((acc: Product[], response) => acc.concat(response), []),
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
