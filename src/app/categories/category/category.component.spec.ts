import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ShopService } from 'src/app/home/services/shop/shop.service';
import { defer, of } from 'rxjs';
import { Product } from '../../data/types/product';
import { productsDB } from '../../test-data/products';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

class ShopServiceMock {
  getProductsByCategory() {
    return defer(() => of<Product[]>(productsDB));
  }
}

export class MockActivatedRoute {
  paramMap = defer(() =>
    of<ParamMap>({
      get: () => '1',
      getAll: () => ['1'],
      has: () => true,
      keys: ['id'],
    })
  );
}

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryComponent],
      providers: [
        { provide: ShopService, useClass: ShopServiceMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
