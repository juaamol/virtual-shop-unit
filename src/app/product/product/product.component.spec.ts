import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Params, ActivatedRoute, ParamMap } from '@angular/router';
import { defer, of } from 'rxjs';
import { productsDB } from 'src/app/data/products';
import { ShopService } from '../../home/services/shop/shop.service';
import { Product } from '../../data/types/product';
import { SharedModule } from '../../shared/shared.module';

class ShopServiceMock {
  getProduct() {
    return defer(() => of<Product>(productsDB[0]));
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

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let shopService: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ShopService, useClass: ShopServiceMock },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
      imports: [SharedModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    shopService = TestBed.inject(ShopService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search in the shop with route params', fakeAsync(() => {
    spyOn(shopService, 'getProduct').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    tick(1000);

    expect(shopService.getProduct).toHaveBeenCalledWith('1');
  }));
});
