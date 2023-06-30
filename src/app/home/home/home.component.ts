import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, iif, of } from 'rxjs';
import { debounceTime, switchMap, share } from 'rxjs/operators';
import { Product } from 'src/app/data/types/product';
import { ShopService } from '../services/shop/shop.service';

const TYPING_DELAY_MS = 300;
const MIN_QUERY_LENGTH = 3;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private search$ = new BehaviorSubject('');
  products$!: Observable<Product[]>;
  inputVal = '99';

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.searchProducts();
  }

  searchProducts() {
    this.products$ = this.search$.pipe(
      debounceTime(TYPING_DELAY_MS),
      switchMap((query: string) => {
        return iif(
          () => query.length >= MIN_QUERY_LENGTH,
          this.shopService.getProductsByTitle(query),
          of<Product[]>([])
        );
      }),
      share()
    );
  }

  search(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.search$.next(query);
    this.inputVal = query;
  }
}
