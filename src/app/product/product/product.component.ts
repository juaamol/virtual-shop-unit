import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShopService } from '../../home/services/shop/shop.service';
import { Product } from 'src/app/data/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  id$!: Observable<string | null>;
  product$!: Observable<Product>;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idFromUrl();
    this.getProduct();
  }

  idFromUrl() {
    this.id$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')));
  }

  getProduct() {
    this.product$ = this.id$.pipe(
      filter((id) => id !== null),
      switchMap((id) => this.shopService.getProduct(id!))
    );
  }
}
