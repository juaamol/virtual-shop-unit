import { Component, OnInit, ElementRef } from '@angular/core';
import { BehaviorSubject, fromEvent, iif, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { productsDB } from 'src/app/data/products';
import { Product } from 'src/app/data/types/product';

const TYPING_DELAY_MS = 300;
const MIN_QUERY_LENGTH = 3;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productsStore$ = new BehaviorSubject([]);
  products$ = of<Product[]>([]);

  constructor(private inputRef: ElementRef) {}

  ngOnInit() {
    this.searchProducts();
  }

  searchProducts() {
    this.products$ = fromEvent<Event>(
      this.inputRef.nativeElement,
      'input'
    ).pipe(
      debounceTime(TYPING_DELAY_MS),
      map((event: Event) => (event.target as HTMLInputElement).value),
      map((query) => query.toLowerCase()),
      switchMap((query: string) => {
        return iif(
          () => query.length >= MIN_QUERY_LENGTH,
          this.getProductsByTitle$(query),
          of<Product[]>([])
        );
      })
    );
  }

  getProductsByTitle$(title: string) {
    return of<Product[]>(
      productsDB.filter((product) =>
        product.title.toLowerCase().includes(title)
      )
    );
  }
}
