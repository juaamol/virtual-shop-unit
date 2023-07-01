import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap, share } from 'rxjs';
import { Product } from 'src/app/data/types/product';
import { SearchFilters } from 'src/app/data/types/search-filters';
import { ShopService } from 'src/app/home/services/shop/shop.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  products$!: Observable<Product[]>;
  queryParams$!: Observable<Params>;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.queryParams$ = this.queryParams();
    this.products$ = this.findProducts();
  }

  search(searchFilters: Partial<SearchFilters>) {
    this.router.navigate([], {
      queryParams: this.toQueryParams(searchFilters),
      relativeTo: this.route,
    });
  }

  private findProducts() {
    return this.queryParams$.pipe(
      switchMap((searchFilters: Partial<SearchFilters>) => {
        return this.shopService.getProducts(searchFilters);
      })
    );
  }

  private queryParams() {
    return this.route.queryParams.pipe(
      map((params) => {
        const title = params['title'];
        const category = params['categoryId'];
        const price_min = params['price_min'];
        const price_max = params['price_max'];

        return { title, category, price_min, price_max };
      })
    );
  }

  private toQueryParams(searchFilters: Partial<SearchFilters>): Params {
    const { title, price_min, price_max, category } = searchFilters;
    let queryParams = {};

    if (title) {
      queryParams = { ...queryParams, title };
    }

    if (price_min || price_min === 0) {
      queryParams = { ...queryParams, price_min };
    }

    if (price_max || price_max === 0) {
      queryParams = { ...queryParams, price_max };
    }

    if (category) {
      queryParams = { ...queryParams, categoryId: category };
    }

    return queryParams;
  }
}
