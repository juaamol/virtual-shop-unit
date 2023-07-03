import {
  Component,
  EventEmitter,
  SimpleChanges,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
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
})
export class FiltersComponent implements OnInit, OnChanges, OnDestroy {
  private filtersSubscription!: Subscription;
  @Input() title?: string;
  @Input() minPrice?: number;
  @Input() maxPrice?: number;
  @Input() category: string = '';
  @Output() filters = new EventEmitter<Partial<SearchFilters>>();
  @Output() filtersOnce = new EventEmitter<Partial<SearchFilters>>();
  formGroup!: FormGroup;
  categories$!: Observable<Category[]>;

  constructor(
    private formBuilder: FormBuilder,
    private shopService: ShopService
  ) {
    this.formGroup = this.buildForm();
  }

  ngOnInit() {
    this.categories$ = this.shopService.getCategories();
    this.filtersSubscription = this.searchFilters().subscribe((filters) => {
      this.filters.emit(filters);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['title'] ||
      changes['minPrice'] ||
      changes['maxPrice'] ||
      changes['category']
    ) {
      this.patchFormValues();
    }
  }

  ngOnDestroy(): void {
    this.filtersSubscription.unsubscribe();
  }

  buildForm() {
    return this.formBuilder.group({
      title: [''],
      price_min: ['', Validators.min(0)],
      price_max: ['', Validators.min(0)],
      category: [''],
    });
  }

  onSubmit() {
    const filters = this.formatSearchFilters(this.formGroup.value);
    this.filtersOnce.emit(filters);
  }

  private searchFilters() {
    return this.formGroup.valueChanges.pipe(
      debounceTime(environment.typingDelayMs),
      map((filters) => this.formatSearchFilters(filters))
    );
  }

  private patchFormValues(): void {
    this.formGroup.patchValue({
      title: this.title,
      price_min: this.minPrice,
      price_max: this.maxPrice,
      category: this.category || '',
    });
  }

  private formatSearchFilters(filters: any) {
    const { title, price_min, price_max, category } = filters;

    return {
      title,
      price_min: price_min ? parseFloat(price_min) : undefined,
      price_max: price_max ? parseFloat(price_max) : undefined,
      category,
    };
  }
}
