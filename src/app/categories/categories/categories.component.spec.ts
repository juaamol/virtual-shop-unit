import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { defer, of } from 'rxjs';
import { Category } from '../../data/types/category';
import { categoriesDB } from '../../data/categories-db';
import { ShopService } from '../../home/services/shop/shop.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class ShopServiceMock {
  getCategories() {
    return defer(() => of<Category[]>(categoriesDB));
  }
}

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [{ provide: ShopService, useClass: ShopServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
