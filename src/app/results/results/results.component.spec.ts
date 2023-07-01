import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { ResultsComponent } from './results.component';
import { defer, of } from 'rxjs';
import { productsDB } from '../../data/products';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from '../../data/types/product';
import { ShopService } from '../../home/services/shop/shop.service';

class ShopServiceMock {
  getProducts() {
    return defer(() => of<Product[]>(productsDB));
  }
}

export class MockActivatedRoute {
  queryParams = defer(() =>
    of<Params>({
      title: 'a',
      categoryId: 'b',
      price_min: '0',
      price_max: '1',
    })
  );
}

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let shopService: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      providers: [
        { provide: ShopService, useClass: ShopServiceMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    shopService = TestBed.inject(ShopService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search in the shop with route params', fakeAsync(() => {
    spyOn(shopService, 'getProducts').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    tick(1000);

    expect(shopService.getProducts).toHaveBeenCalledWith({
      title: 'a',
      category: 'b',
      price_min: 0,
      price_max: 1,
    });
  }));
});
