import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../home/services/shop/shop.service';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/data/types/product';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  id$!: Observable<string | null>;
  products$ = of<Product[]>([]);
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
    this.products$ = this.id$.pipe(
      filter((id) => id !== null),
      switchMap((id) => this.shopService.getProductsByCategory(id!))
    );
  }
}
