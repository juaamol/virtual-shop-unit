import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, iif, of } from 'rxjs';
import { debounceTime, switchMap, share, filter, map } from 'rxjs/operators';
import { Product } from 'src/app/data/types/product';
import { ShopService } from '../services/shop/shop.service';
import { Router } from '@angular/router';
import { environment } from 'src/environment';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/data/types/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  categories$ = of<Category[]>([]);
  products$!: Observable<Product[]>;
  queryControl = new FormControl('');
  @ViewChild('search') searchInput!: ElementRef<HTMLInputElement>;

  constructor(private shopService: ShopService, private router: Router) {}

  ngOnInit() {
    this.products$ = this.findProducts();
    this.categories$ = this.shopService.getCategories();
  }

  findProducts() {
    return this.queryControl.valueChanges.pipe(
      map((value: string | null) => (value === null ? '' : value)),
      debounceTime(environment.typingDelayMs),
      switchMap((query: string) => {
        return iif(
          () => query.length >= environment.minQueryLength,
          this.shopService.getProductsByTitle(query),
          of<Product[]>([])
        );
      }),
      share()
    );
  }

  goToResults() {
    const query = this.queryControl.value;

    this.router.navigate(['/', 'search'], {
      queryParams: { title: query },
      queryParamsHandling: 'merge',
    });
  }

  goToCategory(id: number) {
    this.router.navigate(['categories', id]);
  }

  selectResult(title: string) {
    this.queryControl.setValue(title);
    this.searchInput.nativeElement.focus();
  }

  trackByFn(_: number, product: Product): any {
    return product.id;
  }
}