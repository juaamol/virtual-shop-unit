import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { CategoriesGalleryComponent } from '../categories-gallery/categories-gallery.component';
import { defer, of } from 'rxjs';
import { Category } from '../../data/types/category';
import { categoriesDB } from '../../data/categories-db';
import { ShopService } from '../../home/services/shop/shop.service';

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
      declarations: [CategoriesComponent, CategoriesGalleryComponent],
      providers: [{ provide: ShopService, useClass: ShopServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
