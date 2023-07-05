import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { defer, of } from 'rxjs';
import { Category } from '../../data/types/category';
import { ShopService } from '../../home/services/shop/shop.service';
import { categoriesDB } from '../../test-data/categories-db';

class ShopServiceMock {
  getCategories() {
    return defer(() => of<Category[]>(categoriesDB));
  }
}

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      providers: [{ provide: ShopService, useClass: ShopServiceMock }],
      imports: [ReactiveFormsModule, RouterModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the values in the form', fakeAsync(() => {
    const userInput = {
      title: 'hello',
      price_min: '0',
      price_max: '100',
      category: '1',
    };
    component.formGroup.patchValue(userInput);
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(component.filtersOnce, 'emit').and.callThrough();
    const query = By.css('form');
    const button = fixture.debugElement.query(query);
    button.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    tick(1000);

    expect(button).toBeTruthy();
    expect(component.filtersOnce.emit).toHaveBeenCalledWith({
      title: 'hello',
      price_min: 0,
      price_max: 100,
      category: '1',
    });
  }));
});
