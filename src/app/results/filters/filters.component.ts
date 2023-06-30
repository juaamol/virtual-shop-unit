import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchFilters } from 'src/app/data/types/search-filters';
import { environment } from '../../../environment';
import { ShopService } from '../../home/services/shop/shop.service';
import { Category } from 'src/app/data/types/category';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  private filtersSubscription!: Subscription;
  @Output() filters = new EventEmitter<Partial<SearchFilters>>();
  formGroup!: FormGroup;
  categories$!: Observable<Category[]>;

  constructor(
    private formBuilder: FormBuilder,
    private shopService: ShopService
  ) {}

  ngOnInit() {
    this.formGroup = this.buildForm();
    this.categories$ = this.shopService.getCategories();
    this.filtersSubscription = this.searchFilters().subscribe((filters) => {
      this.filters.emit(filters);
    });
  }

  ngOnDestroy(): void {
    this.filtersSubscription.unsubscribe();
  }

  buildForm() {
    return this.formBuilder.group({
      title: [''],
      minPrice: ['', Validators.min(0)],
      maxPrice: ['', Validators.min(0)],
      category: [''],
    });
  }

  searchFilters() {
    return this.formGroup.valueChanges.pipe(
      debounceTime(environment.typingDelayMs),
      map((filters) => this.formatSearchFilters(filters))
    );
  }

  formatSearchFilters(filters: any) {
    const { title, minPrice, maxPrice, category } = filters;

    return {
      title,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      category,
    };
  }
}
