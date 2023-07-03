import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ShopService } from '../services/shop/shop.service';
import { defer, of } from 'rxjs';
import { productsDB } from 'src/app/data/products';
import { By } from '@angular/platform-browser';
import { Product } from 'src/app/data/types/product';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { flush } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Category } from '../../data/types/category';
import { categoriesDB } from '../../data/categories-db';

class ShopServiceMock {
  getProductsByTitle() {
    return defer(() => of<Product[]>(productsDB));
  }

  getCategories() {
    return defer(() => of<Category[]>(categoriesDB));
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ShopService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: ShopService, useClass: ShopServiceMock }],
      imports: [ReactiveFormsModule, RouterModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    service = TestBed.inject(ShopService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items with a query', fakeAsync(() => {
    const userInput = 'query';
    component.ngOnInit();
    component.queryControl.setValue(userInput);
    fixture.detectChanges();
    spyOn(service, 'getProductsByTitle').and.callThrough();
    const query = By.css('input');
    const debugInput = fixture.debugElement.query(query);
    const inputElement: HTMLInputElement = debugInput.nativeElement;

    inputElement.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();

    tick(1000);
    flush();

    expect(inputElement).toBeTruthy();
    expect(service.getProductsByTitle).toHaveBeenCalledWith(userInput);
  }));
});
